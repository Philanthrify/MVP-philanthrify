import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Alert, AlertColor, Snackbar } from "@mui/material";

export interface AlertSnackbarMessage {
  message: string;
  key: number;
  status: AlertColor;
}

interface ConsecutiveAlertSnackbarsProps {
  snackPack: readonly AlertSnackbarMessage[];
  setSnackPack: Dispatch<SetStateAction<readonly AlertSnackbarMessage[]>>;
}

const ConsecutiveAlertSnackbars: React.FC<ConsecutiveAlertSnackbarsProps> = ({ snackPack, setSnackPack }) => {

  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<AlertSnackbarMessage | undefined>(
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

  console.log(snackPack);

  return (
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={1250}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
      >
        <Alert
          onClose={handleClose}
          severity={messageInfo ? messageInfo.status : undefined}
          variant="filled"
          sx={{ width: '100%' }}
        >{messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
  );
}

export default ConsecutiveAlertSnackbars;