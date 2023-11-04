import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type ErrorProps = {
  message: string;
};

const ErrorComponent: React.FC<ErrorProps> = ({ message }) => {
  const theme = useTheme();
  if (!message) return null;

  return (
    <Typography
      className="error"
      color="error"
      align="center"
      marginBottom={theme.spacing(3)}
    >
      {" "}
      {message}
    </Typography>
  );
};

export default ErrorComponent;
