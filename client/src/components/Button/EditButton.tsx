import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";
import Edit from "../Icons/Edit";
// DESIGN TIP: Button might need to be smaller
interface EditButtonProps {
  name: string;
  done: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const EditButton: React.FunctionComponent<EditButtonProps> = ({
  name,
  done,
  onClick,
}) => {
  return (
    // in order to make the button a circle the width and height need to be set and minwidth undone
    <Button
      name={name}
      onClick={onClick}
      sx={{
        borderRadius: "50%",
        minWidth: 0,
        width: "48px",
        height: "48px",
        backgroundColor: "primary.700",
        "&:hover": { backgroundColor: "background.main" },
      }}
    >
      {done ? <DoneIcon /> : <Edit />}
    </Button>
  );
};

export default EditButton;
