import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const TypographyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.white.light,
}));

export default TypographyTitle;
