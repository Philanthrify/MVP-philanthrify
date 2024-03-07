import { CharityPageFields } from "@/models/charity";
import { RootState } from "@/redux/store";
import { Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
type TaglineProps = {
  buttons?: React.ReactNode[];
  editing: boolean;
  charityFields: CharityPageFields;
  updateField: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};
const Tagline = (props: TaglineProps) => {
  const charity = useSelector((state: RootState) => state.charity.charity);
  const isCharityHead: boolean = charity?.requesterCharityHead || false;

  if (!charity) {
    return <></>;
  }
  return (
    <Grid
      item
      container
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={{ width: "40%" }} justifyContent="flex-end">
        {props.editing ? (
          <TextField
            multiline
            maxRows={4}
            name="tagline"
            value={props.charityFields.tagline.current}
            onChange={props.updateField}
            sx={{
              width: "100%",
            }}
          />
        ) : (
          <Typography variant="h4" color="white.light">
            {charity.tagline}
          </Typography>
        )}
      </Grid>
      {isCharityHead && !charity.tagline && !props.editing && (
        <Grid item>
          <Typography variant="h4" color="grey.main">
            Add a tagline to your charity?
          </Typography>
        </Grid>
      )}
      {props.buttons && (
        <>
          {props.buttons.map((button, index) => (
            <Grid item key={index} direction="column" justifyContent="flex-end">
              {button}
            </Grid>
          ))}
        </>
      )}
      {/* {isCharityHead && <EditButton name="tagline"/>} */}
    </Grid>
  );
};

export default Tagline;
