import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import DragAndDrop from "@/components/FormsUI/DragAndDrop";
import TypographyTitle from "@/components/Title";
import { Project } from "@/models/project";
import { Grid } from "@mui/material";

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
        <TypographyTitle
          variant="h3"
          fontSize="18px"
          align="left"
          marginTop="0px"
          paddingBottom="10px"
        >
          Add picture to your project
        </TypographyTitle>
        <DragAndDrop onFileChange={handleFileChange} />
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Grid
            item
            xs={true}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "60px",
              marginBottom: "96px",
            }}
          >
            <SecondaryButton
              text="Back"
              onClick={props.handleBack}
              sx={{ width: "240px", marginRight: "20px" }}
            />

            <PrimaryButton
              text="Finish"
              type="submit"
              onClick={() => props.onSubmit(props.projectData)}
              sx={{ width: "240px" }}
            />
          </Grid>{" "}
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};
export default StepTwo;
