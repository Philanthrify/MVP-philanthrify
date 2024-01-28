import OwnAccordion from "@/components/OwnAccordion";
import { useTheme } from "@mui/material";
import { accordionData } from "./howItWorks";
const HowItWorks = () => {
  const { palette } = useTheme();
  return (
    <>
      <OwnAccordion data={accordionData} />
    </>
  );
};

export default HowItWorks;
