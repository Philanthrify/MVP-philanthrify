import React, { useCallback, useState } from "react";
import SmallText from "../SmallText";
import { useDropzone } from "react-dropzone";
import { Box, Grid, useTheme } from "@mui/material";
import UploadFile from "../Icons/UploadFile";
import TypographySmallText from "../SmallText";
const allowedExtensions = ["image/jpeg", "image/png", "image/gif"];

type FileUploadProps = {
  onFileChange: (file: File | null) => void;
};

const DragAndDrop: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { palette } = useTheme();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && allowedExtensions.includes(file.type)) {
        onFileChange(file);
        setErrorMessage("");
      } else {
        onFileChange(null);
        setErrorMessage(
          "Invalid file type or size. Please upload a valid image file (jpg, png, gif) no larger than 5MB."
        );
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "1px solid var(--Dark-mode-Dark-hover-input-colors, #53535B)",
        borderRadius: "var(--radius-4xl, 24px)",
        width: "70%",
        height: "150px",
        padding: "20px",
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <input {...getInputProps()} />
        <Grid item>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "grey",
              borderRadius: "var(--radius-md, 8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UploadFile />
          </Box>
        </Grid>

        <Grid item container direction="row" justifyContent="center">
          {isDragActive ? ( // TODO: change smallText
            <SmallText>Drop the file here...</SmallText>
          ) : (
            <>
              <TypographySmallText
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: palette.white.light,
                  marginRight: "10px", // needed for having
                }}
              >
                Click to upload
              </TypographySmallText>{" "}
              <SmallText>
                Drag 'n' drop a file here, or click to select a file
              </SmallText>
              <SmallText>SVG, PNG, JPG or GIF (max. 800x400px)</SmallText>
            </>
          )}
        </Grid>

        {/* File information display (optional) */}
        {/* {file && <SmallText>Selected file: {file.name}</SmallText>} */}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </Grid>{" "}
    </div>
  );
};

export default DragAndDrop;
