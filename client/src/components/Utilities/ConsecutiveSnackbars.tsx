import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Snackbar, Typography } from "@mui/material";

export interface SnackbarMessage {
  message: string;
  key: number;
}

interface ConsecutiveAlertSnackbarsProps {
  snackPack: readonly SnackbarMessage[];
  setSnackPack: Dispatch<SetStateAction<readonly SnackbarMessage[]>>;
}

const ConsecutiveAlertSnackbars: React.FC<ConsecutiveAlertSnackbarsProps> = ({ snackPack, setSnackPack }) => {

  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined,
  );

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={1250}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {messageInfo ? <Typography>{messageInfo.message}</Typography> : undefined}
    </Snackbar>
  );  
}

export default ConsecutiveAlertSnackbars;