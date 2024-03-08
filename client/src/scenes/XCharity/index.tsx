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
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorResponse, useParams } from "react-router-dom";
import LeftHandSide from "./LeftHandSide";
import { TagValuesObj } from "@/models/tagValues";
import dayjs, { Dayjs } from "dayjs";
import OwnLink from "@/components/OwnLink";
import OwnDatePicker from "@/components/FormsUI/DatePicker";

// Extend AxiosError to include your custom properties
interface ExtendedAxiosError<T = any> extends AxiosError<T> {
  // Your custom property. You can make it optional or required based on your needs
  msg?: string;
}

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
  // a boolean for tracking whether the sidebar was actually edited since we only want to send new values upon save if
  // there actually are new values.
  /* 
  Rules: 
    - flips on when editing sidebar and there is a change to one of the fields
    - flips off when edit mode is flipped off
  */

  const [sidebarFirstEdit, setSideBarFirstEdit] = useState<boolean>(false);
  const [sideBarChange, setSideBarChange] = useState<CharityPageUpdatePayload>({
    tags: [],
    countriesActive: [],
    weblink: "",
    reachOutEmail: "",
    foundedDate: null,
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

      // update weblink active payload
      if (charity.weblink) {
        setSideBarChange((prevState) => ({
          ...prevState,
          weblink: charity.weblink != null ? charity.weblink : "",
        }));
      }

      // update reachOutEmail active payload
      if (charity.reachOutEmail) {
        setSideBarChange((prevState) => ({
          ...prevState,
          reachOutEmail:
            charity.reachOutEmail != null ? charity.reachOutEmail : "",
        }));
      }

      // update foundedDate active payload
      if (charity.foundedDate) {
        setSideBarChange((prevState) => ({
          ...prevState,
          foundedDate: charity.foundedDate,
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

  const handleSidebarEditMode = async (
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (charity) {
      // only chaning values if coming from editing and there actually are edits
      if (editingSidebar && sidebarFirstEdit) {
        // TODO: validate inputs
        const res = await sendNewTextValue(sideBarChange);
        //TODO: check result for errors
        console.log("🚀 ~ CharityPage ~ res:", res);
        dispatch(updateSidebarCharityPage(sideBarChange));
      }
      // flip whether editing the sidebar
      setEditingSidebar((prev) => !prev);
    }
    setSideBarFirstEdit(false);
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

  // the api call to update the values in backend, returns true if success or false if there was a problem
  const sendNewTextValue = async (
    updateObj: CharityUpdateTextFields
  ): Promise<boolean> => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/charity/${ukCharityNumber}`,
        updateObj,
        { headers: { authorization: token } }
      );
      // If the request succeeds, log the response and show a success message
      console.log(response.data);
      openAlertSnackbar(
        `${Object.keys(updateObj)} successfully changed!`,
        "success"
      );
      // Return true to indicate success
      return true;
    } catch (error) {
      console.error("An error occurred:", error);
      // Check if the error has a response (which means it was an error from the server)
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400: // Bad Request
            const errorMessage = data.msg;

            openAlertSnackbar(errorMessage, "error");

            break;
          case 401:
            // Unauthorized - handle authentication errors
            openAlertSnackbar(
              "You are not authorized. Please log in again.",
              "error"
            );
            break;
          case 404:
            // Not Found - handle cases where the resource doesn't exist
            openAlertSnackbar("The requested resource was not found.", "error");
            break;
          case 500:
            // Internal Server Error - handle server errors
            openAlertSnackbar("An internal server error occurred.", "error");
            break;
          default:
            // Other errors
            openAlertSnackbar(
              error.message || "An unknown error occurred",
              "error"
            );
        }
      } else {
        // This is likely a network error or something else outside of Axios
        openAlertSnackbar(
          "An unknown error occurred. Please check your network connection.",
          "error"
        );
      }
      // Return false to indicate failure
      return false;
    }
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
    setSideBarFirstEdit(true);
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
    setSideBarFirstEdit(true);
  };

  // handles chaning the weblink
  const handleWeblinkChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setSideBarChange((prevState) => ({
      ...prevState,
      weblink: value,
    }));
    setSideBarFirstEdit(true);
  };

  // handles chaning the weblink
  const handleReachOutEmailChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setSideBarChange((prevState) => ({
      ...prevState,
      reachOutEmail: value,
    }));
    setSideBarFirstEdit(true);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setSideBarChange((prevState) => ({
      ...prevState,
      foundedDate: newValue,
    }));
    setSideBarFirstEdit(true);
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

            {/* Founded */}
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                {" "}
                <Typography variant="h6" sx={{ color: "grey.main" }}>
                  Founded
                </Typography>
              </Grid>
              {charity.foundedDate && !editingSidebar && (
                <Grid item>
                  {dayjs(charity.foundedDate).format("MMMM D, YYYY")}
                </Grid>
              )}

              {editingSidebar && (
                <Grid item>
                  <OwnDatePicker
                    value={
                      sideBarChange.foundedDate
                        ? dayjs(sideBarChange.foundedDate)
                        : null
                    }
                    onChange={handleEndDateChange}
                  />
                </Grid>
              )}
            </Grid>

            <Grid item container direction="column" spacing={1}>
              {/* if weblink and not editing */}
              {charity.weblink && (
                <>
                  {" "}
                  <Grid item>
                    <Typography variant="h6" sx={{ color: "grey.main" }}>
                      Weblink
                    </Typography>
                  </Grid>{" "}
                  <Grid item>
                    {!editingSidebar && (
                      <Grid item container>
                        {" "}
                        <Grid item>
                          <OwnLink
                            text={charity.weblink}
                            weblink={charity.weblink}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}

              {isCharityHead && editingSidebar && (
                <Grid item>
                  <TextField
                    value={sideBarChange.weblink}
                    onChange={handleWeblinkChange}
                    placeholder="Input the link to website"
                    sx={{ width: "80%" }}
                  />
                </Grid>
              )}
            </Grid>

            <Grid item container direction="column" spacing={1}>
              {charity.reachOutEmail && (
                <>
                  {" "}
                  <Grid item>
                    <Typography variant="h6" sx={{ color: "grey.main" }}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item>
                    {!editingSidebar && (
                      <Grid item container>
                        {" "}
                        <Grid item>
                          <OwnLink
                            text={charity.reachOutEmail}
                            weblink={"mailto:" + charity.reachOutEmail}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
              {isCharityHead && editingSidebar && (
                <Grid item>
                  <TextField
                    value={sideBarChange.reachOutEmail}
                    onChange={handleReachOutEmailChange}
                    placeholder="Input the link to website"
                    sx={{ width: "80%" }}
                  />
                </Grid>
              )}
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
