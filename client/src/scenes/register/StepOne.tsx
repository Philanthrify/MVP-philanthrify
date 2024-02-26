import SignupButton from "@/components/Button/SignupButton";
import TypographyTitle from "@/components/Title";
import Buildings from "@/components/Icons/Signup/Buildings";
import GivingHand from "@/components/Icons/Signup/GivingHand";
import { Signup } from "@/models/Signup";
import { Button, Grid } from "@mui/material";
import PrimaryButton from "@/components/Button/PrimaryButton";

type StepOneProps = {
  data: Signup; // signup data store
  updateData: (updatedData: Signup) => void; // updates the parent comp with the new data
  handleNext: () => void;
};

const StepOne = (props: StepOneProps) => {
  // a function which takes either the DONOR or CHARITY button and updates props.data
  const setData = (userType: "DONOR" | "CHARITY") => {
    // Clone the current data and update the userType
    const updatedData = { ...props.data, userType: userType };
    props.updateData(updatedData);
  };

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <SignupButton
          selected={props.data.userType === "DONOR"}
          label={"Join as Donor"}
          description="Support a project and follow easily the impact of your donation."
          IconComponent={GivingHand}
          onClick={() => setData("DONOR")}
          
        />
       
      </Grid>
      <Grid item>
        <SignupButton
          selected={props.data.userType === "CHARITY"}
          label={"Join as Charity"}
          description="Start & fund easily your project and provide transparency to your donors"
          IconComponent={Buildings}
          onClick={() => setData("CHARITY")}
        />

<Grid
            item
            xs={true}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            

            <PrimaryButton
              text="Continue"
              type="submit"
              onClick={props.handleNext}
          
              sx={{ width: "220px" }}
            />
          

             
              </Grid>


      </Grid>
      <Grid item>
        
      </Grid>
    </Grid>
  );
};

export default StepOne;
