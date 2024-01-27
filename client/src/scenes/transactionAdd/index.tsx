import FormStyles from "@/components/FormsUI";
import AmountInput from "@/components/FormsUI/AmountInput";
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
import * as yup from "yup";
import CloseableMessage from "../../components/Utilities/CloseableMessage";

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

  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

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
      setSubmitSuccess(null);
      axios({
        method: "post",
        url: "http://localhost:1337/transaction",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: values,
      })
        .then((response) => {
          console.log(response);
          setSubmitSuccess(true);
          formik.setValues({
            project: "",
            amount: 0,
            category: "",
            whatBrought: "", // what did you pay for?
            whatFor: "", // what did you use it for?
          });
        })
        .catch((error) => {
          console.log(error);
          setSubmitSuccess(false);
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
                width="100%"
              />{" "}
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  What Kind of Transaction
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
      <div>
        {/* FadingMessage component 
              TODO fix sticky position to bottom of screen - wrap in div to fix sizing - also of submit button
        */}
        {submitSuccess !== null && (
          <CloseableMessage
            sx={{ position: "fixed", bottom: 0 }}
            message={
              submitSuccess
                ? "Transaction submitted successfully"
                : "Failed to submit transaction"
            }
            type={submitSuccess ? "success" : "error"}
          />
        )}
      </div>
    </>
  );
};

export default TransactionAdd;
