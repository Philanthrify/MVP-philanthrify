import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0,0,0,.8",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "430px",
}));
export default FormBox;
