import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  useTheme,
} from "@mui/material";
import FormBox from "@/components/FormBox";
import FormStyles from "@/components/FormsUI";
import ErrorComponent from "@/components/FormError";
import TypographyTitle from "@/components/Title";
import { v4 as uuidv4 } from "uuid";

import LinkInput, { Link } from "@/components/LinkInput";
import AmountInput from "@/components/FormsUI/AmountInput";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/authSlice";
// TODO: add validation for links including the 'http...' format
const validationSchema = yup.object({
  title: yup.string().required("username is required"),
  challenge: yup.string().required("Password is required"),
  targetAmount: yup
    .number()
    .required("Target amount is required")
    .positive("Amount must be positive")
    .typeError("Amount must be a number"),
});

const CreateProjectForm = () => {
  const token = useSelector(selectToken);
  const [links, setLinks] = useState<Link[]>([
    { id: uuidv4(), link: "", socialMedia: "Facebook" },
  ]);

  const addLink = () => {
    const newLink = { id: uuidv4(), link: "", socialMedia: "Facebook" };
    setLinks([...links, newLink]);
    formik.setFieldValue("links", [...formik.values.links, newLink]);
  };

  const removeLink = (linkToRemove: Link) => {
    const updatedLinks = links.filter((link) => link.id !== linkToRemove.id);
    setLinks(updatedLinks);
    formik.setFieldValue("links", updatedLinks);
    console.log(updatedLinks);
  };

  const handleLinkChange = (updatedLink: Link) => {
    console.log(updatedLink);
    const updatedLinks = links.map((link) =>
      link.id === updatedLink.id ? updatedLink : link
    );
    setLinks(updatedLinks);
    formik.setFieldValue("links", updatedLinks);
    console.log(updatedLinks);
  };
  const [formError, setFormError] = useState("");
  const textFieldProps = FormStyles();

  const formik = useFormik({
    initialValues: {
      title: "",
      challenge: "",
      solution: "",
      donationUsage: "",
      futureImpact: "",
      links: [{ id: uuidv4(), link: "", socialMedia: "Facebook" }], // a list of links
      targetAmount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios({
        method: "post",
        url: "http://localhost:1337/project",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: JSON.stringify(values),
        withCredentials: true,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Grid xs={8}>
        <FormBox>
          <TypographyTitle variant="h1" align="center" padding="15px 0">
            Submit New Project:
          </TypographyTitle>

          {formError && <ErrorComponent message={formError} />}
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              width="70%"
            >
              <TextField
                fullWidth
                id="title"
                name="title"
                label="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                sx={{
                  ...textFieldProps.textField,
                  width: textFieldProps.textFieldWidth,
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                id="challenge"
                name="challenge"
                label="challenge"
                value={formik.values.challenge}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.challenge && Boolean(formik.errors.challenge)
                }
                helperText={formik.touched.challenge && formik.errors.challenge}
                sx={{
                  ...textFieldProps.textField,
                  width: textFieldProps.textFieldWidth,
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                id="solution"
                name="solution"
                label="solution"
                value={formik.values.solution}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.solution && Boolean(formik.errors.solution)
                }
                helperText={formik.touched.solution && formik.errors.solution}
                sx={{
                  ...textFieldProps.textField,
                  width: textFieldProps.textFieldWidth,
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                id="donationUsage"
                name="donationUsage"
                label="Donation Usage"
                value={formik.values.donationUsage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.donationUsage &&
                  Boolean(formik.errors.donationUsage)
                }
                helperText={
                  formik.touched.donationUsage && formik.errors.donationUsage
                }
                sx={{
                  ...textFieldProps.textField,
                  width: textFieldProps.textFieldWidth,
                }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                id="futureImpact"
                name="futureImpact"
                label="Future Impact"
                value={formik.values.futureImpact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.futureImpact &&
                  Boolean(formik.errors.futureImpact)
                }
                helperText={
                  formik.touched.futureImpact && formik.errors.futureImpact
                }
                sx={{
                  ...textFieldProps.textField,
                  width: textFieldProps.textFieldWidth,
                }}
              />
              <AmountInput
                value={formik.values.targetAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.targetAmount &&
                  Boolean(formik.errors.targetAmount)
                }
                helperText={
                  formik.touched.targetAmount && formik.errors.targetAmount
                    ? formik.errors.targetAmount
                    : undefined
                }
              />
              <TypographyTitle variant="h4" align="center" padding="15px 0">
                Add links to social media:
              </TypographyTitle>
              <Grid item xs={12}>
                {links.map((link) => (
                  <LinkInput
                    id={link.id}
                    link={link.link}
                    socialMedia={link.socialMedia}
                    onChange={(updatedLink) => handleLinkChange(updatedLink)}
                    onDelete={removeLink}
                  />
                ))}
                <Button onClick={addLink}>Add Link</Button>
              </Grid>

              <Grid xs={10} padding="10px 0px">
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormBox>
      </Grid>
    </Grid>
  );
};

export default CreateProjectForm;
