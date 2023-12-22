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
import React, { useState, useCallback } from "react";
import TagValues from "@/models/tagValues";
import LinkInput, { Link } from "@/components/FormsUI/LinkInput";
import TypographyTitle from "@/components/Title";
import SmallText from "@/components/SmallText";
import { useDropzone } from "react-dropzone";

type StepTwoProps = {
  projectData: ProjectFormData;
  handleBack: () => void;
  onSubmit: (projectData: ProjectFormData) => void;
};

const allowedExtensions = ["image/jpeg", "image/png", "image/gif"];
// TODO: add caption to form data to practice sending form and files together
const StepTwo = (props: StepTwoProps) => {
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && allowedExtensions.includes(file.type)) {
      setFile(file);
      console.log(file);
      props.projectData.image = file;
      setErrorMessage("");
    } else {
      setFile(null);
      props.projectData.image = null;
      setErrorMessage(
        "Invalid file type or size. Please upload a valid image file (jpg, png, gif) no larger than 5MB."
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <TypographyTitle variant="h4" align="center" padding="15px 0">
        Add a profile picture for the project:
      </TypographyTitle>
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

        {/* File information display (optional) */}
        {file && <SmallText>Selected file: {file.name}</SmallText>}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </div>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={props.handleBack}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => props.onSubmit(props.projectData)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default StepTwo;
