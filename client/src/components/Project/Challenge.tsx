import { mapValues } from "@/models/tagValues";
import { RootState } from "@/redux/store";
import { Box, Grid, useTheme, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import ChallengeStars from "../Icons/ChallengeStars";
import TypographySmallText from "../SmallText";
import TypographyTitle from "../Title";
import Tag from "./Tag";
import { ProjectPageFields } from "@/scenes/XProject/Project";

type ChallengeProps = {
  editing: boolean;
  buttons?: React.ReactNode[];
  projectFields: ProjectPageFields;
  updateField: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const Challenge = (props: ChallengeProps) => {
  const { palette } = useTheme();
  const project = useSelector((state: RootState) => state.project.project);
  const transformKeysToValues = (projectTags: object): string[] => {
    // get into list of values
    const values = Object.values(projectTags).map((item) => item.value);
    // get values from TagValuesObj
    return mapValues(values);
  };
  var tags: string[] = [];
  if (project?.tag) {
    tags = transformKeysToValues(project.tag);
    console.log(tags);
  }

  if (project && project.backgroundAndGoals) {
    return (
      <Box
        sx={{
          width: "95%",

          borderRadius: "1.75rem",
          border: "1px solid", // Set the border thickness and style
          borderColor: palette.grey[800], // Use a color from your theme
          // Add any additional styling you need here
          display: "flex", // Make Box a flex container
          justifyContent: "center", // Horizontally center the content
        }}
      >
        <Grid
          container
          spacing={2.5}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ width: "100%", padding: "45px 40px 45px 40px" }}
        >
          <Grid
            container
            item
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Grid item>
              {" "}
              <ChallengeStars />
            </Grid>
            <Grid item>
              <TypographyTitle
                variant="h3"
                align="center"
                sx={{
                  marginBottom: "-3px", // Add a negative margin bottom
                  display: "inline-block", // Allow margin to affect the surrounding elements
                }}
              >
                Project background and goals
              </TypographyTitle>
            </Grid>
            {props.buttons && (
              <Grid item>
                {props.buttons.map((button, index) => (
                  <Grid item key={index}>
                    {button}
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          <Grid item sx={{ width: "95%" }}>
            {" "}
            {!props.editing ? (
              <TypographySmallText
                variant="body2"
                // align="center"
                sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}
              >
                {project.backgroundAndGoals}
              </TypographySmallText>
            ) : (
              <TextField
                name="backgroundAndGoals"
                multiline
                rows={4}
                value={props.projectFields.backgroundAndGoals.current}
                onChange={props.updateField}
                sx={{
                  width: "80%",
                }}
              />
            )}{" "}
          </Grid>

          <Grid container item direction="row" spacing={2}>
            {tags.map((value: string) => (
              <Grid item>
                <Tag text={value} />{" "}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
  return <></>;
};

export default Challenge;
