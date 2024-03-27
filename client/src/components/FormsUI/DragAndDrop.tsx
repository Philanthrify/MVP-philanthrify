import React, { useCallback, useState } from "react";
import SmallText from "../SmallText";
import { useDropzone } from "react-dropzone";
import { Box, Grid, useTheme } from "@mui/material";
import UploadFile from "../Icons/UploadFile";
import TypographySmallText from "../SmallText";
const allowedExtensions = ["image/jpeg", "image/png", "image/svg"];

//TODO: Enforce ratios for different images - logos and avatars are 1:1, others are 9:16, etc...

type FileUploadProps = {
  onFileChange: (file: File | null) => void;
};

const DragAndDrop: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null); // Store the selected file name
  const { palette } = useTheme();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && allowedExtensions.includes(file.type)) {
        onFileChange(file);
        setErrorMessage("");
        setSelectedFile(file.name); // Set the selected file name
      } else {
        onFileChange(null);
        setErrorMessage(
          "Invalid file type or size. Please upload a valid image file (jpg, png, gif) no larger than 5MB."
        );
        setSelectedFile(null); // Set the selected file name
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "1px solid var(--Dark-mode-Dark-hover-input-colors, #383B46)",
        borderRadius: "var(--radius-4xl, 24px)",
        width: "70%",
        height: "260px",
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1C1F2A",
      }}
    >
      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <input {...getInputProps()} />
        <Grid item>
          <Box
            sx={{
              width: "60px",
              height: "60px",
              backgroundColor: "#394056",
              borderRadius: "var(--radius-md, 16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <UploadFile />
          </Box>
        </Grid>
        <Grid item container direction="row" justifyContent="center">
          {isDragActive ? ( // conditional on if dragging file in
            <SmallText>Drop the file here...</SmallText>
          ) : (
            <Grid item container direction="column" marginBottom="32px">
              <Grid item container direction="row" justifyContent="center" alignContent="centre" marginBottom="20px">
              {selectedFile ? ( // conditional on if a file is uploaded or not
                <TypographySmallText
                variant="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: palette.white.light,
                  marginRight: "10px",
                }}>{selectedFile}</TypographySmallText>
              ) : (
              <>
                <TypographySmallText
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: palette.white.light,
                    marginRight: "10px",
                  }}>Click to upload a file</TypographySmallText>
                <TypographySmallText
                  variant="h3"
                  sx={{
                    fontWeight: 300,
                    fontSize: "16px",
                    color: "#A4A6AD",
                  }}>or drag 'n' drop here</TypographySmallText>
              </>
              )}
              </Grid>
              <TypographySmallText
                variant="h3"
                sx={{
                  fontWeight: 100,
                  fontSize: "14px",
                  color: "#A4A6AD",
                  textAlign: "center", // Center text horizontally
                }}>SVG, PNG or JPG/JPEG (max. 800px*400px)</TypographySmallText>
            </Grid>
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
