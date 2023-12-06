import AmountInput from "@/components/FormsUI/AmountInput";
import { ProjectFormData } from "./Project";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
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
import FormStyles from "@/components/FormsUI";
import React, { useEffect, useState } from "react";
import { TagValues, TagValuesObj } from "@/models/tagValues";
import LinkInput, { Link } from "@/components/LinkInput";
import TypographyTitle from "@/components/Title";

type StepOneProps = {
  projectData: ProjectFormData;
  onSubmit: (updatedData: ProjectFormData) => void;
};
const countries = ["United States", "Canada", "United Kingdom", "Australia"];

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
});

const StepOne = (props: StepOneProps) => {
  // console.log("🚀 ~ file: StepOne.tsx:47 ~ StepOne ~ props:", props);

  const [selectedTag, setSelectedTag] = useState<string[]>(
    props.projectData.listOfTags
  );
  const formik = useFormik({
    initialValues: props.projectData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("next page");
      props.onSubmit(values);
    },
  });
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
    formik.setFieldValue("links", [...formik.values.links, newLink]);
  };

  const removeLink = (linkToRemove: Link) => {
    const currentLinks = formik.values.links;
    const updatedLinks = currentLinks.filter(
      (link: Link) => link.id !== linkToRemove.id
    );
    formik.setFieldValue("links", updatedLinks);
    console.log(updatedLinks);
  };

  const handleLinkChange = (updatedLink: Link) => {
    const currentLinks = formik.values.links;
    const updatedLinks = currentLinks.map((link) =>
      link.id === updatedLink.id ? updatedLink : link
    );
    formik.setFieldValue("links", updatedLinks);
    console.log(updatedLinks);
  };
  const textFieldProps = FormStyles();
  useEffect(() => {
    console.log("Selected Tags Changed (FORMIK):", formik.values.listOfTags);
  }, [formik.values.listOfTags]);
  useEffect(() => {
    console.log("Selected Tags Changed:", selectedTag);
  }, [selectedTag]);
  return (
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
        justifyContent="center"
        alignItems="center"
        width="70%"
      >
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
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
        <FormControl sx={{ width: textFieldProps.textFieldWidth }}>
          <InputLabel
            id="country-label"
            sx={{
              ...textFieldProps.inputLabel,
            }}
          >
            Country
          </InputLabel>
          <Select
            labelId="country-label"
            id="country"
            name="country"
            value={formik.values.country}
            label="Country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              ...textFieldProps.select,
              width: "100%",
            }}
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.country && formik.errors.country ? (
            <div>{formik.errors.country}</div>
          ) : null}
        </FormControl>
        <FormControl sx={{ width: textFieldProps.textFieldWidth }}>
          <InputLabel
            id="demo-multiple-checkbox-label"
            sx={{
              ...textFieldProps.inputLabel,
            }}
          >
            Tags
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedTag}
            onChange={handleTagChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            sx={{
              ...textFieldProps.select,
              width: "100%",
            }}
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
          label="Challenge"
          value={formik.values.challenge}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.challenge && Boolean(formik.errors.challenge)}
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
          label="Solution"
          value={formik.values.solution}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.solution && Boolean(formik.errors.solution)}
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
            formik.touched.donationUsage && Boolean(formik.errors.donationUsage)
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
            formik.touched.futureImpact && Boolean(formik.errors.futureImpact)
          }
          helperText={formik.touched.futureImpact && formik.errors.futureImpact}
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
            formik.touched.targetAmount && Boolean(formik.errors.targetAmount)
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
          {formik.values.links.map((link) => (
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
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Grid>
    </form>
  );
};
export default StepOne;
