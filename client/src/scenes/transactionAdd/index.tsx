import { Project } from "@/models/project";
import { RootState } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/models/auth";
import { useFormik } from "formik";
import * as yup from "yup";
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
import FormStyles from "@/components/FormsUI";
import AmountInput from "@/components/FormsUI/AmountInput";
import { TransactionKinds } from "@/models/transaction";
const validationSchema = yup.object({}); //can use this to create a validation schema - STEP 3 IN REGISTER SCENE EXAMPLE

const TransactionAdd = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state
  const textFieldProps = FormStyles();

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
        url: "http://localhost:1337/project",
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
      console.log(values);
      //write to CSV
      //use validation schema - formik and yup libraries - look up documentation for these and make sure you use the validation schema
      //
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
      <form
        // onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Grid
          container
          spacing={2}
          direction="column"
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
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="space-between"
          >
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
              />{" "}
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Role"
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
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="whatBrought"
                name="whatBrought"
                label="What did you pay for?"
                value={formik.values.whatBrought}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.whatBrought &&
                  Boolean(formik.errors.whatBrought)
                }
                helperText={""}
                sx={{
                  ...textFieldProps.textField,
                }}
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
              {" "}
              <TextField
                fullWidth
                id="whatFor"
                name="whatFor"
                label="What will it be used for?"
                value={formik.values.whatFor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.whatFor && Boolean(formik.errors.whatFor)}
                helperText={""}
                sx={{
                  ...textFieldProps.textField,
                }}
              />
              <Grid xs={10}>
                <FormHelperText
                  error={
                    formik.touched.whatFor && Boolean(formik.errors.whatFor)
                  }
                ></FormHelperText>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default TransactionAdd;
