import { Alert, AlertColor, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";

type FadingMessageProps = {
  sx?: any;
  type: AlertColor; //success, alert, warning, error ONLY
  message: String;
  duration?: number; //milliseconds
};

// the button with the primary color e.g. 'Donate'
const FadingMessage = (props: FadingMessageProps) => {
  const [open, setOpen] = React.useState(true);
  const [showElement, setShowElement] = useState(true);

  const backgroundColor = props.type === "success" ? "#1DC39" : "#1D917";
  const timeoutDuration = props.duration ?? 1000; // Default is 1 second

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowElement(false);
    }, timeoutDuration); // Adjust the time in milliseconds (e.g., 5000 for 5 seconds)

    return () => {
      // Cleanup function to clear the timeout when the component unmounts or when showElement becomes false
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <Collapse in={open}>
        <Alert
          variant="filled"
          sx={{ bgcolor: backgroundColor }}
          severity={props.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default FadingMessage;
