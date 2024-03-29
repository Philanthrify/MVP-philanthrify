import { RootState } from "@/redux/store";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Facebook from "../Icons/Links/Facebook";
import Instagram from "../Icons/Links/Instagram";
import LinkedIn from "../Icons/Links/LinkedIn";
import Twitter from "../Icons/Links/Twitter";
import Youtube from "../Icons/Links/Youtube";

const Links = () => {
  const project = useSelector((state: RootState) => state.project.project);
  console.log(project?.link);
  const renderSocialIcon = (socialMedia: string, webLink: string) => {
    // TODO: youtube and other
    switch (socialMedia) {
      case "Facebook":
        return <Facebook webLink={webLink} />;
      case "Twitter":
        return <Twitter webLink={webLink} />;
      case "Instagram":
        return <Instagram webLink={webLink} />;
      case "LinkedIn":
        return <LinkedIn webLink={webLink} />;
      case "Youtube":
        return <Youtube webLink={webLink} />;
      default:
        return null;
    }
  };
  if (project?.link) {
    return (
      <>
        <Grid container direction="row" spacing={2}>
          {project?.link.map((linkItem, index) => (
            <Grid item key={index}>
              {renderSocialIcon(linkItem.socialMedia, linkItem.webLink)}
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
};

export default Links;
