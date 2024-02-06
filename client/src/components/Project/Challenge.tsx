import { mapValues } from "@/models/tagValues";
import { RootState } from "@/redux/store";
import { Box, Grid, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import ChallengeStars from "../Icons/ChallengeStars";
import TypographySmallText from "../SmallText";
import TypographyTitle from "../Title";
import Tag from "./Tag";

const Challenge = () => {
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

  if (project && project.challenge) {
    return (
      <Box
        sx={{
          width: "95%",
          // maxWidth: "400px",
          // height: "230px",
          borderRadius: "1.75rem",
          border: "1px solid", // Set the border thickness and style
          borderColor: palette.grey[800] , // Use a color from your theme
          // Add any additional styling you need here
          display: "flex", // Make Box a flex container
          justifyContent: "center", // Horizontally center the content
        }}
      >
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ width: "90%", padding: "40px 0px 40px 0px" }}
        >
          <Grid container item direction="row" spacing={2}>
            <Grid item>
              {" "}
              <ChallengeStars />
            </Grid>
            <Grid item>
              <TypographyTitle
                variant="h3"
                align="left"
                
                padding="0px 0px 0px 0px"
              >
                The challenge
              </TypographyTitle>
            </Grid>
          </Grid>

          <Grid item>
            <TypographySmallText
              variant="body2"
              // align="center"
              sx={{ wordWrap: "break-word" }}
            >
              {project.challenge}
            </TypographySmallText>
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
