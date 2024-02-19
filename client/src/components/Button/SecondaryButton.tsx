import { Button, useTheme } from "@mui/material";

type SecondaryButtonProps = {
  text: string;
  onClick?: any;
  sx?: any;
  type?: any;
};

// the button with the primary color e.g. 'Donate'
const SecondaryButton = (props: SecondaryButtonProps) => {
  const { palette } = useTheme();
  return (
    <Button
      type={props.type}
      sx={{
        color: palette.white.light,
        backgroundColor: '#394056',
        
        "&:hover": {
          color: palette.white.light,
          backgroundColor: '#4C5572',
          transform: "scale(0.96)",
          transition: 'transform 0.17s ease-in-out',
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

export default SecondaryButton;
