import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const HowItWorks = () => {
  const { palette } = useTheme();
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Accordion sx={{ maxWidth: "70%" }}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5" sx={{ color: palette.grey[600] }}>
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Duis purus dui, tincidunt vel
              lectus vitae, tristique feugiat tortor. Donec facilisis lectus ut
              dui fermentum suscipit. Curabitur tincidunt justo ut purus
              volutpat aliquet. Donec dictum tincidunt orci volutpat volutpat.
              Suspendisse nunc nunc, blandit vel interdum et, maximus quis
              lacus. Integer lacus orci, accumsan nec luctus eu, condimentum
              quis erat. Ut vestibulum sem lorem. Nam pellentesque odio sit amet
              lacinia lobortis.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ maxWidth: "70%" }}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5" sx={{ color: palette.grey[600] }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              felis turpis, placerat quis fermentum ac, fermentum in dui.
              Suspendisse ut elit quis mauris suscipit dapibus at sit amet
              nulla. Aenean hendrerit neque massa, in mollis lorem sagittis vel.
              Ut gravida lorem accumsan cursus tristique. Etiam risus nulla,
              consectetur non urna at, suscipit semper quam. Etiam sagittis
              aliquam porttitor. Integer eleifend est eu ligula fermentum
              ornare. Etiam a dictum est. Donec fringilla fermentum mauris, in
              pharetra nulla. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia curae; Pellentesque semper
              elementum sapien, fringilla accumsan orci fermentum vitae.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ maxWidth: "70%" }}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Accordion 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5" sx={{ color: palette.grey[600] }}>
              Maecenas vitae sem vel dolor sagittis hendrerit eget ac nisl.
              Nullam imperdiet erat lorem, elementum iaculis eros pellentesque
              sit amet. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Sed ultricies nec nunc in commodo. Nunc neque eros,
              vehicula quis rutrum sed, eleifend quis lectus. Fusce pellentesque
              ipsum nec odio vulputate, sit amet fringilla quam bibendum. Fusce
              condimentum justo eu nulla tristique ullamcorper. Suspendisse nibh
              dolor, ullamcorper efficitur tincidunt sed, gravida vitae orci.
              Nulla vestibulum facilisis massa, sed volutpat nisi commodo eget.
              Donec tempor nunc nunc, sit amet semper nunc facilisis at.
              Vestibulum pellentesque nibh eget tellus fringilla mattis.
            </Typography>
          </AccordionDetails>
        </Accordion>{" "}
        <Accordion sx={{ maxWidth: "70%" }}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Accordion 4</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5" sx={{ color: palette.grey[600] }}>
              Proin eget libero non tortor sodales vulputate vel quis neque.
              Suspendisse ligula magna, aliquet eu odio at, sodales consequat
              quam. Curabitur non leo felis. Nulla eu purus faucibus, maximus
              lorem sed, maximus erat. Donec quis pretium diam. Curabitur
              accumsan tortor et ante semper, a eleifend nisi imperdiet. Sed
              ullamcorper quam eget ante elementum, mattis aliquet metus
              tincidunt. Aenean lacinia justo lectus, ac mattis mi euismod sed.
              Phasellus sollicitudin feugiat purus mollis vehicula. Proin
              aliquet est non diam molestie posuere. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam
              condimentum nibh eget ante luctus aliquam. Nunc eu ligula neque.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default HowItWorks;
