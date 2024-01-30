import { Button, useTheme } from "@mui/material";

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
        padding: "0 24px", // Add padding left and right

      }}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default PrimaryButton;
