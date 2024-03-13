import EditButton from "@/components/Button/EditButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SectionHeader from "@/components/Project/SectionHeader";
import SectionText from "@/components/Project/SectionText";
import { Grid, TextField } from "@mui/material";
import ProjectBox from "./ProjectBox";
import { ProjectShort } from "@/models/project";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CharityPageFields } from "@/models/charity";
import { useNavigate } from "react-router-dom";
type LeftHandSideProps = {
  charityFields: CharityPageFields;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  updateField: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const LeftHandSide = (props: LeftHandSideProps) => {
  const navigate = useNavigate();

  const charity = useSelector((state: RootState) => state.charity.charity);
  // used for checking whether to display editing access to page user
  const isCharityHead: boolean = charity?.requesterCharityHead || false;
  if (charity) {
    return (
      <Grid
        item
        container
        md={8}
        spacing={2}
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid item sx={{ width: "100%" }}>
          <SectionHeader
            header={"About the charity"}
            buttons={
              isCharityHead
                ? [
                    <EditButton
                      name="about"
                      done={props.charityFields.about.edit}
                      onClick={props.handleButtonClick}
                    />,
                  ]
                : []
            }
          />
        </Grid>
        {charity.about ? (
          <Grid item sx={{ width: "100%" }}>
            {props.charityFields.about.edit ? (
              <TextField
                name="about"
                multiline
                rows={4}
                value={props.charityFields.about.current}
                onChange={props.updateField}
                sx={{
                  width: "80%",
                }}
              />
            ) : (
              <SectionText text={charity.about} />
            )}
          </Grid>
        ) : (
          <Grid item sx={{ width: "100%" }}>
            {props.charityFields.about.edit ? (
              <TextField
                name="about"
                multiline
                rows={4}
                value={props.charityFields.about.current}
                onChange={props.updateField}
                sx={{
                  width: "80%",
                }}
              />
            ) : (
              <>Nothing yet</>
            )}
          </Grid>
        )}{" "}
        {/* Projects that the charity is undergoing */}
        <Grid container item spacing={5} sx={{ width: "100%" }}>
          <Grid item md={12}>
            {" "}
            <SectionHeader
              header={"Their projects"}
              buttons={[
                <PrimaryButton
                  text="Add new project"
                  onClick={() => {
                    navigate(`/addproject`);
                  }}
                />,
              ]}
            />
          </Grid>
          {charity.projects && (
            <Grid
              item
              container
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{ width: "90%" }}
            >
              {charity.projects.map((project: ProjectShort, _index) => {
                return (
                  <Grid item md={12} sx={{ height: "200px" }}>
                    <ProjectBox project={project} />{" "}
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
};

export default LeftHandSide;
