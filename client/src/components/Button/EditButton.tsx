import { Button } from "@mui/material";
import Edit from "../Icons/Edit";

const EditButton = () => {
  return (
    // in order to make the button a circle the width and height need to be set and minwidth undone
    <Button
      sx={{
        borderRadius: "50%",
        minWidth: 0,
        width: "48px",
        height: "48px",
        backgroundColor: "background.light",
        "&:hover": { backgroundColor: "background.main" },
      }}
    >
      <Edit />
    </Button>
  );
};

export default EditButton;
