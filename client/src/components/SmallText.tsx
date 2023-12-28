import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const TypographySmallText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[500],
  wordBreak: "break-word", // Add this line
  whiteSpace: "normal", // Add this line
}));

export default TypographySmallText;
