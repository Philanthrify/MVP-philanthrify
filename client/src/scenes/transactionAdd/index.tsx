import FormStyles from "@/components/FormsUI";
import AmountInput from "@/components/FormsUI/AmountInput";
import TypographyTitle from "@/components/Title";
import TypographySmallText from "@/components/SmallText";
import line2 from "@/assets/line2.png";
import { Typography } from "@mui/material";
import { useSnackbar } from "@/contexts/snackbarContext";
import { DecodedToken } from "@/models/auth";
import { Project } from "@/models/project";
import { TransactionKinds } from "@/models/transaction";
import { RootState } from "@/redux/store";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";

import * as yup from "yup";

//const validationSchema = yup.object({});

//TODO need refresh in place for this to be worthwhile
const validationSchema = yup.object({
  project: yup.string().required("Parent project is required"),
  amount: yup.number().min(0.01, "A transaction amount is required"),
  category: yup.string().required("Transaction category is required"),
  whatBrought: yup.string().required("Transaction subject is required"),
  whatFor: yup.string().required("Transaction purpose is required"),
});

const TransactionAdd = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state
  const textFieldProps = FormStyles();

  const { openAlertSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);
  let userId: string;
  if (token) {
    const decoded: DecodedToken = jwtDecode(token);
    if (decoded.userId) {
      userId = decoded.userId;
    }
  }
  const [projects, setProjects] = useState<Project[]>([]);
  const fetchUserProjects = async () => {
    setLoading(true);
    // check which projects the user is on (for now just the ones they've created)
    try {
      axios({
        method: "get",
        url: `${import.meta.env.VITE_API_URL}/project`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        params: { userId: userId },
        // withCredentials: true,
      }).then((response) => {
        setProjects(response.data);
      });
    } catch (error) {
      setError("Failed to load projects"); // Set error state
    } finally {
      setLoading(false);
    }
  };
  // now calling the fetch
  useEffect(() => {
    fetchUserProjects();
  }, []);
  useEffect(() => {
    console.log("🚀 ~ TransactionAdd ~ projects:", projects);
  }, [projects]);

  const formik = useFormik({
    initialValues: {
      project: "",
      amount: 0,
      category: "",
      whatBrought: "", // what did you pay for?
      whatFor: "", // what did you use it for?
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/transaction`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: values,
      })
        .then((response) => {
          console.log(response);
          openAlertSnackbar("Transaction submitted", "success");
          navigate(""); // redirect to same page
        })
        .catch((error) => {
          console.log(error);

          openAlertSnackbar(
            "Something went wrong. Transaction not submitted",
            "error"
          );
        });
    },
  });
  // console logging as they change
  useEffect(() => {
    console.log("🚀 ~ TransactionAdd ~ formik.values:", formik.values);
  }, [formik.values]);
  const changeProject = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    formik.setFieldValue("project", value);
  };
  const changeCategory = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    formik.setFieldValue("category", value);
  };
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
  if (error) {
    return <div>Error: {error}</div>; // Show error if present
  }

  return (
    <>
      <Grid
        sx={{
          backgroundImage: `url(${line2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: "120px",
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        {/* ... rest of your component */}
      </Grid>

      <TypographyTitle variant="h2" align="center" marginTop={7}>
        Confirm a transaction
      </TypographyTitle>

      <Typography variant="body2" align="center">
        Build trust between your charity and donors by confirming your
        transactions.
      </Typography>

      <form
        // onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
          marginBottom: "150px",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Grid
          container
          spacing={3}
          direction="column"
          maxWidth="640px"
          justifyContent="space-between"
          alignItems="space-between"
        >
          <Grid item>
            {" "}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Which project is this for?
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.project}
                label="Which project is this for?"
                onChange={changeProject}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    <ListItemText primary={project.title} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            spacing={3}
            direction="row"
            justifyContent="space-between"
            alignItems="space-between"
          >
            {" "}
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="whatBrought"
                name="whatBrought"
                label="What did you pay for?"
                placeholder="e.g. Brick, materials"
                value={formik.values.whatBrought}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.whatBrought &&
                  Boolean(formik.errors.whatBrought)
                }
                helperText={""}
              />
              <Grid xs={10}>
                <FormHelperText
                  error={
                    formik.touched.whatBrought &&
                    Boolean(formik.errors.whatBrought)
                  }
                ></FormHelperText>{" "}
              </Grid>{" "}
            </Grid>{" "}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  What kind of transaction
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Type of Transaction"
                  onChange={changeCategory}
                >
                  {Object.entries(TransactionKinds).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      <ListItemText primary={value} />{" "}
                      {/* Display the value with spaces */}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={3}
            direction="row"
            justifyContent="space-between"
            alignItems="space-between"
          >
            {" "}
            <Grid item xs={6}>
              {" "}
              <AmountInput
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={
                  formik.touched.amount && formik.errors.amount
                    ? formik.errors.amount
                    : undefined
                }
                label="Amount"
                id="amount"
                name="amount"
                width="100%"
              />{" "}
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                fullWidth
                id="whatFor"
                name="whatFor"
                label="Further details (Optional)"
                placeholder="e.g. Building school"
                value={formik.values.whatFor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.whatFor && Boolean(formik.errors.whatFor)}
                helperText={""}
              />
              <Grid xs={10}>
                <FormHelperText
                  error={
                    formik.touched.whatFor && Boolean(formik.errors.whatFor)
                  }
                ></FormHelperText>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </Grid>{" "}
          <Grid
            item
            xs={true}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <SecondaryButton
              text="Cancel"
              onClick={() => {
                console.log("");
              }}
              sx={{ width: "240px", marginRight: "20px" }}
            />

            <PrimaryButton
              text="Submit transaction"
              type="submit"
              onClick={() => {
                console.log("");
              }}
              sx={{ width: "240px" }}
            />
          </Grid>{" "}
          <Grid sx={{ display: "flex", justifyContent: "center" }}>
            <TypographySmallText
              variant="body2"
              align="center"
              display="flex"
              justifyContent="center"
              marginTop={4}
              maxWidth="380px"
              sx={{
                color: "#A4A6AD",
                fontWeight: 200,
                fontSize: 12,
                fontStyle: "italic",
              }} // Use sx prop to specify color
            >
              By submitting this transaction you accept responsibility for the
              validity of the information & confirm that all this information is
              accurate.
            </TypographySmallText>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TransactionAdd;
