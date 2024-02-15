import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import TypographyTitle from "../Title";
import { Grid, TextField } from "@mui/material";
import { ProjectPageFields } from "@/scenes/XProject/Project";

type ProjectTitleProps = {
  editing: boolean;
  buttons?: React.ReactNode[];
  projectFields: ProjectPageFields;
  updateField: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

// This component is for the project title
const ProjectTitle = (props: ProjectTitleProps) => {
  const project = useSelector((state: RootState) => state.project.project);
  return (
    <>
      {project?.title && (
        <Grid container direction="row" spacing={2} alignItems="center">
          {!props.editing ? (
            <Grid item>
              <TypographyTitle
                variant="h1"
                alignSelf="flex-start"
                padding="15px 0"
              >
                {project.title}
              </TypographyTitle>
            </Grid>
          ) : (
            <TextField
              name="title"
              value={props.projectFields.title.current}
              onChange={props.updateField}
              sx={{
                width: "80%",
              }}
            />
          )}
          {props.buttons && (
            <Grid item>
              {props.buttons.map((button, index) => (
                <div key={index}>{button}</div>
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default ProjectTitle;
