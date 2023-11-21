import React, { ChangeEvent, useCallback, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
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
import { useDropzone } from "react-dropzone";
import SmallText from "@/components/SmallText";

import TagValues from "@/models/tagValues";

const allowedExtensions = ["image/jpeg", "image/png", "image/gif"];
const maxSize = 5 * 1024 * 1024; // 5MB
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// TODO: add validation for links including the 'http...' format
const validationSchema = yup.object({
  title: yup.string().required("username is required"),
  challenge: yup.string().required("Password is required"),
  targetAmount: yup
    .number()
    .required("Target amount is required")
    .positive("Amount must be positive")
    .typeError("Amount must be a number"),
  image: yup.mixed().required("Required"),
});

const CreateProjectForm = () => {
  const token = useSelector(selectToken);
  const [links, setLinks] = useState<Link[]>([
    { id: uuidv4(), link: "", socialMedia: "Facebook" },
  ]);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTag, setSelectedTag] = React.useState<string[]>([]);

  const handleTagChange = (event: SelectChangeEvent<typeof selectedTag>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setSelectedTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    formik.setFieldValue("listOfTags", value);
    // console.log(selectedTag);
  };
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
      links: [{ id: uuidv4(), link: "", socialMedia: "Facebook" }],
      listOfTags: [],
      targetAmount: 0,
      image: "",
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
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && allowedExtensions.includes(file.type) && file.size <= maxSize) {
      setFile(file);
      console.log(file);
      formik.setFieldValue("image", file);
      setErrorMessage("");
    } else {
      setFile(null);
      setErrorMessage(
        "Invalid file type or size. Please upload a valid image file (jpg, png, gif) no larger than 5MB."
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedTag}
                  onChange={handleTagChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  sx={{ ...textFieldProps.select, paddingY: "0px" }}
                >
                  {TagValues.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <Checkbox checked={selectedTag.indexOf(tag) > -1} />
                      <ListItemText primary={tag} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
              <TypographyTitle variant="h4" align="center" padding="15px 0">
                Add a profile picture for the project:
              </TypographyTitle>
              {/* Drag and Drop Zone */}
              <div
                {...getRootProps()}
                style={{
                  border: "2px dashed gray",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <SmallText>Drop the file here...</SmallText>
                ) : (
                  <SmallText>
                    Drag 'n' drop a file here, or click to select a file
                  </SmallText>
                )}
              </div>

              {/* File information display (optional) */}
              {file && <SmallText>Selected file: {file.name}</SmallText>}
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}

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
