import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import TypographyTitle from "../Title";
import { Grid, TextField } from "@mui/material";
import { ProjectPageFields } from "@/scenes/XProject/Project";

type ProjectSubtitleProps = {
  editing: boolean;
  buttons?: React.ReactNode[];
  projectFields: ProjectPageFields;
  updateField: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

// This component is for the project title
const ProjectSubtitle = (props: ProjectSubtitleProps) => {
  const project = useSelector((state: RootState) => state.project.project);
  return (
    <>
      {project?.subtitle && (
        <Grid container direction="row" spacing={4} alignItems="center">
          {!props.editing ? (
            <Grid item>
              <TypographyTitle
                variant="h4"
                alignSelf="flex-start"
                padding="15px 0"
                fontWeight={400}
              >
                {project.subtitle}
              </TypographyTitle>
            </Grid>
          ) : (
            <Grid item>
              <TextField
                multiline
                maxRows={4}
                name="subtitle"
                value={props.projectFields.subtitle.current}
                onChange={props.updateField}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
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

export default ProjectSubtitle;
