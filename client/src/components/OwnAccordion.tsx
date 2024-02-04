import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AccordionItem } from "@/models/AccordianProps";

interface OwnAccordionProps {
  data: Record<string, AccordionItem[]>;
}
// The OwnAccordion takes a data object from howItWorks.ts and maps out the values to make the final Accordion
// each record is one Accordion section and holds a list of AccordionItems which in turn hold the text to go below
// and the style (allowing to make sections).
const OwnAccordion: React.FC<OwnAccordionProps> = ({ data }) => {
  const { palette } = useTheme();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {Object.entries(data).map(([key, value], index) => (
        <>
          <Accordion key={index} sx={{ width: "60%" }}>
            <AccordionSummary
              expandIcon={
                <ArrowDownwardIcon sx={{ color: palette.grey[600] }} />
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6">{key}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {value.map((elem, lineIndex) => (
                <Typography
                  key={lineIndex}
                  variant="body2"
                  sx={{
                    color: palette.grey[600],
                    marginBottom: lineIndex < value.length - 1 ? 2 : 0,
                    ...elem.sxProps, // Dump in the sx props which may have been defined for that elem
                  }}
                >
                  {elem.text}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          <Divider />
        </>
      ))}
    </Grid>
  );
};

export default OwnAccordion;
