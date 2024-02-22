import FormStyles from "@/components/FormsUI";
import AmountInput from "@/components/FormsUI/AmountInput";
import CountrySelect from "@/components/FormsUI/CountrySelector";
import CustomDatePicker from "@/components/FormsUI/DatePicker";
import LinkInput, { Link } from "@/components/FormsUI/LinkInput";
import TagSelector from "@/components/FormsUI/TagSelector";
import TypographyTitle from "@/components/Title";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { Project } from "@/models/project";
import {
  Button,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
type StepOneProps = {
  projectData: Project;
  onSubmit: (updatedData: Project) => void;
};

// TODO: add validation for links including the 'http...' format
const validationSchema = yup.object({
  title: yup.string().required("username is required"),
});

const StepOne = (props: StepOneProps) => {
  // console.log("🚀 ~ file: StepOne.tsx:47 ~ StepOne ~ props:", props);

  const formik = useFormik({
    initialValues: props.projectData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("next page");
      props.onSubmit(values);
    },
  });
  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    formik.setFieldValue("tag", value);
  };
  const addLink = () => {
    const newLink = { id: uuidv4(), webLink: "", socialMedia: "Facebook" };
    formik.setFieldValue("link", [...formik.values.link, newLink]);
  };

  const removeLink = (linkToRemove: Link) => {
    const currentLinks = formik.values.link;
    const updatedLinks = currentLinks.filter(
      (link: Link) => link.id !== linkToRemove.id
    );
    formik.setFieldValue("link", updatedLinks);
    console.log(updatedLinks);
  };

  const handleLinkChange = (updatedLink: Link) => {
    const currentLinks = formik.values.link;
    const updatedLinks = currentLinks.map((link: Link) =>
      link.id === updatedLink.id ? updatedLink : link
    );
    formik.setFieldValue("link", updatedLinks);
    console.log(updatedLinks);
  };
  const handleCountryChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: String | null
  ) => {
    formik.setFieldValue("country", newValue ? newValue : "");
  };
  const handleEndDateChange = (newValue: Dayjs | null) => {
    formik.setFieldValue("endDate", newValue ? newValue : null);
  };
  const textFieldProps = FormStyles();
  useEffect(() => {
    console.log("Changed (FORMIK):", formik.values);
  }, [formik.values]);

  return (
    <form
      // onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "left",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="left"
        alignItems="left"
        width="70%"
      >
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          sx={{ width: "100%", }}
        >
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{
              ...textFieldProps.textField,
            }}
          />
        </Grid>{" "}
        <Grid item sx={{ width: "100%" }}>
          <TextField
            fullWidth
            id="challenge"
            placeholder="Highlight an important statistic of primary goal of this project."
            name="challenge"
            label="Subtitle"
            value={formik.values.challenge}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.challenge && Boolean(formik.errors.challenge)}
            helperText={formik.touched.challenge && formik.errors.challenge}
            sx={{
              ...textFieldProps.textField,
            }}
          />
        </Grid>
        <Grid
          item
          container
          spacing={2}
          direction="column"
          alignItems="flex-start"
          sx={{ width: "100%" }}
        >
          <Grid item>
            {/* setting the country via formik */}
            <Typography
              variant="h3"
              align="left"
              fontSize= "18px"
              sx={{ color: "white.light", textAlign: "left", width: "100%", marginTop: "40px", marginBottom: "10px", }}
            >
              Where the project is taking place?
            </Typography>
          </Grid>
          <Grid item sx={{ width: "50%", marginBottom: "20px", }}>
            <CountrySelect
              value={formik.values.country}
              onChange={handleCountryChange}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          sx={{ width: "100%", marginLeft: "-50px", marginBottom: "10px", }}
        >
          {/* setting the tags via formik */}
          <TagSelector
            value={formik.values.tag}
            handleChange={handleTagChange}
            
          />
        </Grid>
        <Grid item sx={{ width: "100%", marginBottom: "10px", }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            id="challenge"
            placeholder="Please explain in 1 to 2 paragraphs the challenge that is being seen in the area you want to help. Provide as many facts & statistics as possible, and maybe someone’s personal story too."
            name="challenge"
            label="Background and goals"
            value={formik.values.challenge}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.challenge && Boolean(formik.errors.challenge)}
            helperText={formik.touched.challenge && formik.errors.challenge}
            sx={{
              ...textFieldProps.textField,
            }}
          />
        </Grid>
        <Grid item sx={{ width: "100%", marginBottom: "10px", }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            id="solution"
            placeholder="Please explain in 1 to 3 paragraphs, what the solution your organisation is suggesting? How you will accomplish it? What plans you have prepared to ensure its success? And Any Previous successful projects you have managed to show the likelihood of success?"
            name="solution"
            label="Solution"
            value={formik.values.solution}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.solution && Boolean(formik.errors.solution)}
            helperText={formik.touched.solution && formik.errors.solution}
            sx={{
              ...textFieldProps.textField,
            }}
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          sx={{ width: "100%", marginBottom: "10px", }}
        >
          {" "}
          <TextField
            fullWidth
            multiline
            rows={4}
            id="donationUsage"
            placeholder="In as much detail as you can give, please breakdown what the money will be used for. E.g:“The funds raised here will go to Constructing a custom ICT Centre in a slum in Uganda. Along with fitting the centre out with computers, furniture, WiFi and providing a year’s salary to 4 team members that will run the centre day-to-day”. "
            name="donationUsage"
            label="Breakdown of where donations go"
            value={formik.values.donationUsage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.donationUsage &&
              Boolean(formik.errors.donationUsage)
            }
            helperText={
              formik.touched.donationUsage && formik.errors.donationUsage
            }
            sx={{
              ...textFieldProps.textField,
            }}
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="flex-start"
          sx={{ width: "100%", }}
        >
          {" "}
          <TypographyTitle variant="h3" fontSize= "18px" align="center" marginTop= "30px" paddingBottom= "10px">
            How much are you hoping to raise?
          </TypographyTitle>{" "}
          <AmountInput
            value={formik.values.targetAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.targetAmount && Boolean(formik.errors.targetAmount)
            }
            helperText={
              formik.touched.targetAmount && formik.errors.targetAmount
                ? formik.errors.targetAmount
                : undefined
            }
            label="Target Amount"
            id="targetAmount"
            name="targetAmount"
            width="100%"
          
          />
        </Grid>{" "}
        <Grid
          item
          container
          direction="column"
          alignItems="flex-start"
          sx={{ width: "50%" }}
        >
          <TypographyTitle variant="h3" fontSize= "18px" align="left" marginTop= "40px" paddingBottom= "10px">
            When are you hoping to raise by?
          </TypographyTitle>
          {/* Date picker */}
          <CustomDatePicker
            value={formik.values.endDate}
            onChange={handleEndDateChange}
          />
        </Grid>{" "}
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ width: "100%" }}
        >
          <TypographyTitle variant="h3" fontSize= "18px" align="left" marginTop= "40px" paddingBottom= "0px">
            Add links to social media:
          </TypographyTitle>
          {formik.values.link.map((link: Link) => (
            <LinkInput
              id={link.id}
              webLink={link.webLink}
              socialMedia={link.socialMedia}
              onChange={(updatedLink) => handleLinkChange(updatedLink)}
              onDelete={removeLink}
            />
          ))}
          <Button onClick={addLink}>Add Link</Button>

          <Grid
              item
              xs={true}
              style={{ display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "60px",
              marginBottom: "96px", }}
            >

            

              <PrimaryButton
                text="Continue"
                type="submit"
                onClick={() => props.onSubmit(props.projectData)}
                sx={{ width: "240px", }}
              />
              
            </Grid>{" "}


          
        </Grid>
        <Grid item>



        </Grid>
        
        
        </Grid>
    </form>
  );
};
export default StepOne;
