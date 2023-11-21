import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const TypographyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[500],
}));

export default TypographyTitle;
