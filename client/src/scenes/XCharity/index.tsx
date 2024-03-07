import EditButton from "@/components/Button/EditButton";
import CountrySelector from "@/components/FormsUI/CountrySelectorMany";
import TagSelector from "@/components/FormsUI/TagSelector";
import PageBox from "@/components/PageBox";
import Tag from "@/components/Project/Tag";
import Tagline from "@/components/charity/Tagline";
import { useSnackbar } from "@/contexts/snackbarContext";
import {
  CharityCountriesActive,
  CharityPageFields,
  CharityPagePayload,
  CharityPageUpdatePayload,
  CharityTag,
  isCharityCountriesActive,
  isCharityTag,
} from "@/models/charity";
import { countries } from "@/models/country";
import { selectToken } from "@/redux/authSlice";
import {
  setCharity,
  updateCharityField,
  updateSidebarCharityPage,
} from "@/redux/charitySlice";
import { RootState } from "@/redux/store";
import {
  Box,
  CircularProgress,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LeftHandSide from "./LeftHandSide";
import { TagValuesObj } from "@/models/tagValues";
import dayjs from "dayjs";

interface CharityUpdateTextFields {
  [key: string]: any; // This allows for any key of type string and any value type
}
const CharityPage = () => {
  const { openAlertSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { ukCharityNumber } = useParams<{ ukCharityNumber: string }>();
  const charity = useSelector((state: RootState) => state.charity.charity);
  // used for checking whether to display editing access to page user
  const isCharityHead: boolean = charity?.requesterCharityHead || false;

  const token = useSelector(selectToken);
  const [charityFields, setCharityFields] = useState<CharityPageFields>({
    tagline: { current: "", edit: false },
    about: { current: "", edit: false },
  });
  // for editing the details on the sidebar
  const [editingSidebar, setEditingSidebar] = useState<boolean>(false);
  const [sideBarChange, setSideBarChange] = useState<CharityPageUpdatePayload>({
    tags: [],
    countriesActive: [],
    weblink: "",
    reachOutEmail: "",
    foundedDate: dayjs(),
  });
  useEffect(() => {
    console.log("🚀 ~ CharityPage ~ sideBarChange:", sideBarChange);
  }, [sideBarChange]);

  // Load current tags into changeTags when the component mounts or charity updates
  useEffect(() => {
    if (charity) {
      // update tags payload
      if (charity.tags) {
        const listOfActiveTags = charity.tags.map(
          (tagObj: CharityTag | string) => {
            if (isCharityTag(tagObj)) {
              return tagObj.value;
            } else {
              return tagObj; // It's a string, so return it directly
            }
          }
        );

        setSideBarChange((prevState) => ({
          ...prevState,
          tags: listOfActiveTags,
        }));
      }
      // update countries active payload
      if (charity.countriesActive) {
        const listOfCountriesActive = charity.countriesActive.map(
          (countriesActive: CharityCountriesActive | string) => {
            if (isCharityCountriesActive(countriesActive)) {
              return countriesActive.value;
            } else {
              return countriesActive; // It's a string, so return it directly
            }
          }
        );

        setSideBarChange((prevState) => ({
          ...prevState,
          countriesActive: listOfCountriesActive,
        }));
      }
    }
  }, [charity]);

  useEffect(() => {
    console.log("🚀 ~ CharityPage ~ charityFields:", charityFields);
  }, [charityFields]);
  console.log(charity?.countriesActive);

  // This function runs when the user clicks the edit button on each field in order to edit
  // it handles flipping the field into editing mode
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const fieldName = event.currentTarget.name as keyof CharityPageFields;

    if (charity) {
      // get current value from charity field so that it can be edited
      const current = charity[fieldName];
      // flipping edit mode for this field
      if (fieldName in charityFields) {
        setCharityFields((prevState) => {
          const isEditing = prevState[fieldName].edit;
          // if currently editing then this is saving the new data so we want to update the backend
          if (isEditing) {
            // if we're saving the new text then we do api call first

            const res = sendNewTextValue({
              [fieldName]: charityFields[fieldName].current,
            });
            // TODO:WARNING: console.log() just to overcome problem XD
            console.log(res);

            dispatch(
              updateCharityField({
                field: fieldName,
                value: charityFields[fieldName].current,
              })
            );
          }
          return {
            ...prevState,
            [fieldName]: {
              // If it's not in editing mode, use the 'current' value from 'project'
              // Otherwise, keep the 'current' value as it is in 'prevState'
              current: isEditing ? prevState[fieldName].current : current,
              edit: !isEditing,
            },
          };
        });
      }
    }
  };

  const handleSidebarEditMode = (
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (charity) {
      // flip whether editing the sidebar
      const res = sendNewTextValue(sideBarChange);
      console.log(res);
      dispatch(updateSidebarCharityPage(sideBarChange));
      setEditingSidebar((prev) => !prev);
    }
  };

  useEffect(() => {
    console.log("🚀 ~ CharityPage ~ ukCharityNumber:", ukCharityNumber);
    const loadCharity = async () => {
      console.log("🚀 ~ loadCharity ~ token:", token);

      try {
        const response = await axios.get<CharityPagePayload>(
          `${import.meta.env.VITE_API_URL}/charity/${ukCharityNumber}`,
          {
            headers: {
              Authorization: token,
            },
            params: {
              projects: true,
            },
          }
        );
        console.log("🚀 ~ loadCharity ~ response:", response);
        dispatch(setCharity(response.data));
      } catch (error: any) {
        console.error("Failed to load Charity:", error.message);
      }
    };
    if (ukCharityNumber) {
      loadCharity();
    }
  }, [dispatch, ukCharityNumber]);

  const updateField: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const fieldName = event.currentTarget.name as keyof CharityPageFields;

    if (fieldName in charityFields) {
      const newValue = event.currentTarget.value;
      setCharityFields((prevState) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          current: newValue,
        },
      }));
    }
  };

  // the api call to update the values in backend
  const sendNewTextValue = async (updateObj: CharityUpdateTextFields) => {
    console.log("🚀 ~ sendNewValue ~ updateObj:", updateObj);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/charity/${ukCharityNumber}`,
        updateObj,
        { headers: { authorization: token } }
      )
      .then((answer: AxiosResponse) => {
        console.log(answer.data.project);
        openAlertSnackbar(
          `${Object.keys(updateObj)} successfully changed!`,
          "success"
        );
        return answer.data.project;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        openAlertSnackbar(error.message, "error");
      });
  };
  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    console.log("🚀 ~ handleTagChange ~ value:", value);

    // needs to be explicitly cast to list of strings
    const tags: string[] = typeof value === "string" ? value.split(",") : value;
    // update with new tags
    setSideBarChange((prevState) => ({
      ...prevState,
      tags: tags,
    }));
  };

  const handleCountryChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    console.log("🚀 ~ handleCountryChange ~ value:", value);

    // needs to be explicitly cast to list of strings
    const countries: string[] =
      typeof value === "string" ? value.split(",") : value;
    // update with new tags
    setSideBarChange((prevState) => ({
      ...prevState,
      countriesActive: countries,
    }));
  };
  // if not found the project yet then return loading screen
  if (!charity) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <PageBox backgroundColor="primary.700">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography variant="h2" color="white.light">
              {charity.charityName.toUpperCase()}
            </Typography>
          </Grid>

          <Tagline
            buttons={
              isCharityHead
                ? [
                    <EditButton
                      name="tagline"
                      done={charityFields.tagline.edit}
                      onClick={handleButtonClick}
                    />,
                  ]
                : []
            }
            editing={charityFields.tagline.edit}
            charityFields={charityFields}
            updateField={updateField}
          />
        </Grid>
      </PageBox>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        paddingTop="25px"
      >
        <Grid item container direction="row" spacing={2} sx={{ width: "70%" }}>
          <Grid
            item
            md={4}
            container
            spacing={2}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {isCharityHead && (
              <Grid item alignSelf="flex-end">
                <EditButton
                  name="SidebarEditButton"
                  done={editingSidebar}
                  onClick={handleSidebarEditMode}
                />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6" sx={{ color: "grey.main" }}>
                Focus
              </Typography>
            </Grid>
            {/* Charity tags */}
            {isCharityHead && editingSidebar && (
              <Grid item>
                <TagSelector
                  value={sideBarChange.tags}
                  handleChange={handleTagChange}
                />
              </Grid>
            )}
            {!editingSidebar && (
              <Grid item container direction="row" spacing={2}>
                {charity.tags && (
                  <>
                    {charity.tags.map((value: CharityTag | string) => {
                      // Determine the key to use for lookup in TagValuesObj
                      const tagKey = isCharityTag(value) ? value.value : value;
                      // Access the display value from TagValuesObj using the determined key
                      const tagDisplayValue = TagValuesObj[tagKey] || tagKey; // Fallback to tagKey if no matching entry in TagValuesObj

                      return (
                        <Grid item>
                          <Tag text={tagDisplayValue} />
                        </Grid>
                      );
                    })}
                  </>
                )}
              </Grid>
            )}

            <Grid item container direction="column" spacing={2}>
              {" "}
              <Grid item>
                {" "}
                <Typography variant="h6" sx={{ color: "grey.main" }}>
                  Areas served
                </Typography>
              </Grid>
              {isCharityHead && editingSidebar && (
                <Grid item>
                  {" "}
                  <CountrySelector
                    value={sideBarChange.countriesActive}
                    handleChange={handleCountryChange}
                  />
                </Grid>
              )}
              {!editingSidebar && (
                <Grid item container direction="row" spacing={2}>
                  {charity.countriesActive.map(
                    (country: CharityCountriesActive | string) => {
                      var matchingVal = "";
                      if (isCharityCountriesActive(country)) {
                        matchingVal = country.value;
                      } else {
                        matchingVal = country;
                      }
                      // Using find to get the first matching country

                      const matchingCountry = countries.find(
                        (setCountry) => setCountry.code === matchingVal
                      );
                      // Return the label of the found country, or null if not found
                      return (
                        <Grid item>
                          <Tag
                            text={matchingCountry ? matchingCountry.label : ""}
                          />
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              )}
            </Grid>

            <Grid item>
              <Typography variant="h6" sx={{ color: "grey.main" }}>
                Founded
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h6" sx={{ color: "grey.main" }}>
                Weblink
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ color: "grey.main" }}>
                Email
              </Typography>
            </Grid>
          </Grid>{" "}
          {/* About */}
          <LeftHandSide
            charityFields={charityFields}
            handleButtonClick={handleButtonClick}
            updateField={updateField}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CharityPage;
