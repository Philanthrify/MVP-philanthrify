import FormStyles from "@/components/FormsUI";
import AmountInput from "@/components/FormsUI/AmountInput";
import CountrySelect from "@/components/FormsUI/CountrySelector";
import CustomDatePicker from "@/components/FormsUI/DatePicker";
import LinkInput, { Link } from "@/components/FormsUI/LinkInput";
import TagSelector from "@/components/FormsUI/TagSelector";
import TypographyTitle from "@/components/Title";
import { Project } from "@/models/project";
import { Button, Grid, SelectChangeEvent, TextField } from "@mui/material";
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
        alignItems: "center",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        width="70%"
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
            width: textFieldProps.textFieldWidth,
          }}
        />
        {/* setting the country via formik */}
        <CountrySelect
          value={formik.values.country}
          onChange={handleCountryChange}
        />
        {/* setting the tags via formik */}
        <TagSelector value={formik.values.tag} handleChange={handleTagChange} />

        <TextField
          fullWidth
          multiline
          rows={4}
          id="challenge"
          name="challenge"
          label="Challenge"
          value={formik.values.challenge}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.challenge && Boolean(formik.errors.challenge)}
          helperText={formik.touched.challenge && formik.errors.challenge}
          sx={{
            ...textFieldProps.textField,
            width: textFieldProps.textFieldWidth,
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          id="solution"
          name="solution"
          label="Solution"
          value={formik.values.solution}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.solution && Boolean(formik.errors.solution)}
          helperText={formik.touched.solution && formik.errors.solution}
          sx={{
            ...textFieldProps.textField,
            width: textFieldProps.textFieldWidth,
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          id="donationUsage"
          name="donationUsage"
          label="Donation Usage"
          value={formik.values.donationUsage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.donationUsage && Boolean(formik.errors.donationUsage)
          }
          helperText={
            formik.touched.donationUsage && formik.errors.donationUsage
          }
          sx={{
            ...textFieldProps.textField,
            width: textFieldProps.textFieldWidth,
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          id="futureImpact"
          name="futureImpact"
          label="Future Impact"
          value={formik.values.futureImpact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.futureImpact && Boolean(formik.errors.futureImpact)
          }
          helperText={formik.touched.futureImpact && formik.errors.futureImpact}
          sx={{
            ...textFieldProps.textField,
            width: textFieldProps.textFieldWidth,
          }}
        />
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
          width="70%"
        />
        <TypographyTitle variant="h4" align="center" padding="15px 0">
          When are you hoping to raise by?
        </TypographyTitle>
        {/* Date picker */}
        <CustomDatePicker
          value={formik.values.endDate}
          onChange={handleEndDateChange}
        />
        <TypographyTitle variant="h4" align="center" padding="15px 0">
          Add links to social media:
        </TypographyTitle>
        <Grid item xs={12}>
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
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Grid>
    </form>
  );
};
export default StepOne;
