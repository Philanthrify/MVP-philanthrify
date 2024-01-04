import { Button, useTheme } from "@mui/material";
import React from "react";

type PrimaryButtonProps = {
  text: string;
  onClick?: any;
  sx?: any;
  type?: any;
};

// the button with the primary color e.g. 'Donate'
const PrimaryButton = (props: PrimaryButtonProps) => {
  const { palette } = useTheme();
  return (
    <Button
      type={props.type}
      sx={{
        ...props.sx,
        color: palette.background.light,
        backgroundColor: palette.primary.main,
        "&:hover": {
          backgroundColor: palette.primary.main,
        },
      }}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default PrimaryButton;
