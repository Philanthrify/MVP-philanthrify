import { Grid } from "@mui/material";
import React from "react";
import Facebook from "../Icons/Links/Facebook";
import Instagram from "../Icons/Links/Instagram";
import LinkedIn from "../Icons/Links/LinkedIn";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Twitter from "../Icons/Links/Twitter";

const Links = () => {
  const project = useSelector((state: RootState) => state.project.project);
  console.log(project?.link);
  const renderSocialIcon = (socialMedia: string, webLink: string) => {
    switch (socialMedia) {
      case "Facebook":
        return <Facebook webLink={webLink} />;
      case "Twitter":
        return <Twitter webLink={webLink} />;
      case "Instagram":
        return <Instagram webLink={webLink} />;
      case "LinkedIn":
        return <LinkedIn webLink={webLink} />;
      default:
        return null;
    }
  };
  if (project?.link) {
    return (
      <>
        <Grid container direction="row" spacing={4}>
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
