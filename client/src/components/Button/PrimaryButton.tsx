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
        color: palette.white.light,
        backgroundColor: 'primary.700',
        
        "&:hover": {
          backgroundColor: 'primary.900',
        },
        padding: "0 24px", // Add padding left and right
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default PrimaryButton;
