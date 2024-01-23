import { Alert, AlertColor, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

type FadingMessageProps = {
  sx?: any;
  type: AlertColor; //success, alert, warning, error ONLY
  message: String;

// the button with the primary color e.g. 'Donate'
const FadingMessage = (props: FadingMessageProps) => {
  const [open, setOpen] = React.useState(true);
  const backgroundColor = props.type === "success" ? "#1DC39" : "#1D917";

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
