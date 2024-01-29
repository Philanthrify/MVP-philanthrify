import ConsecutiveAlertSnackbars, { AlertSnackbarMessage } from '@/components/Utilities/ConsecutiveAlertSnackbars';
import ConsecutiveSnackbars, { SnackbarMessage } from '@/components/Utilities/ConsecutiveSnackbars';
import { AlertColor } from '@mui/material';
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

interface SnackbarContextProps {
  openAlertSnackbar: (message: string, status: AlertColor) => void;
  openSimpleSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alertSnackPack, setAlertSnackPack] = useState<readonly AlertSnackbarMessage[]>([]);
  const [simpleSnackPack, setSimpleSnackPack] = useState<readonly SnackbarMessage[]>([]);

  const openAlertSnackbar = useCallback((message: string, status: AlertColor) => {
    const newSnack = { message, key: new Date().getTime(), status };
    setAlertSnackPack((prev) => [...prev, newSnack]);
  }, []);

  const openSimpleSnackbar = useCallback((message: string) => {
    const newSnack = { message, key: new Date().getTime() };
    setSimpleSnackPack((prev) => [...prev, newSnack]);
  }, []);

  return (
    <SnackbarContext.Provider value={{ openAlertSnackbar, openSimpleSnackbar }}>
      {children}
      <ConsecutiveAlertSnackbars snackPack={alertSnackPack} setSnackPack={setAlertSnackPack} />
      <ConsecutiveSnackbars snackPack={simpleSnackPack} setSnackPack={setSimpleSnackPack} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
