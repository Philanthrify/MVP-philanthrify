import SignupButton from "@/components/Button/SignupButton";

import Buildings from "@/components/Icons/Signup/Buildings";
import GivingHand from "@/components/Icons/Signup/GivingHand";
import { Signup } from "@/models/Signup";
import { Button, Grid } from "@mui/material";

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
      spacing={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <SignupButton
          selected={props.data.userType === "DONOR"}
          label={"Join as Donor"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam"
          IconComponent={GivingHand}
          onClick={() => setData("DONOR")}
        />
      </Grid>
      <Grid item>
        <SignupButton
          selected={props.data.userType === "CHARITY"}
          label={"Join as Charity"}
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam"
          IconComponent={Buildings}
          onClick={() => setData("CHARITY")}
        />
      </Grid>
      <Grid item>
        {" "}
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={props.handleNext}
          sx={{ width: "100px" }}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default StepOne;
