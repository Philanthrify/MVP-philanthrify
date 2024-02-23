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
          {isDragActive ? ( // TODO: change smallText
            <SmallText>Drop the file here...</SmallText>
          ) : (
            <>
              <TypographySmallText
                variant="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: palette.white.light,
                  marginRight: "10px", // needed for having
                }}
              >
                Click to upload
              </TypographySmallText>{" "}

              <TypographySmallText
                variant="h3"
                sx={{
                  fontWeight: 300,
                  fontSize: "16px",
                  color: "#A4A6AD",
                  marginRight: "10px", // needed for having
                }}
              >
                or drag 'n' drop a file here, or click to select a file
              </TypographySmallText>{" "}



              <TypographySmallText>
                Drag 'n' drop a file here, or click to select a file
              </TypographySmallText>
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
