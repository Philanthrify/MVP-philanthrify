import { Project } from "@/models/project";

import DragAndDrop from "@/components/FormsUI/DragAndDrop";
import TypographyTitle from "@/components/Title";
import { Button, Grid } from "@mui/material";

type StepTwoProps = {
  projectData: Project;
  handleBack: () => void;
  onSubmit: (projectData: Project) => void;
};

// TODO: add caption to form data to practice sending form and files together
const StepTwo = (props: StepTwoProps) => {
  const handleFileChange = (file: File | null) => {
    if (file) {
      props.projectData.image = file;
    } else {
      props.projectData.image = null;
    }
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <TypographyTitle variant="h4" align="center" padding="15px 0">
          Add a profile picture for the project:
        </TypographyTitle>
        <DragAndDrop onFileChange={handleFileChange} />
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={props.handleBack}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => props.onSubmit(props.projectData)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default StepTwo;
