import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Grid, IconButton, Link, Tooltip } from "@mui/material";
type OwnLinkProps = {
  text: string;
  weblink: string;
  openInNew: boolean; // bool for whether you want the side icon for opening in new tab
  linkColour?: string;
};

// a link thing for general bits of the website, with icon on end
const OwnLink: React.FC<OwnLinkProps> = ({
  text,
  weblink,
  openInNew,
  linkColour,
}) => {
  // Check if the link is an email
  const isEmail = weblink.startsWith("mailto:");
  // Use a regex to match the domain part of the URL
  const regex = isEmail
    ? /(?:mailto:)?([^@]+@[^@]+)/
    : /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
  const match = text.match(regex);
  // Simplify the hostname by removing 'www.' if present and returning the rest
  const textOutput = match ? match[1] : text; // Default to original text if no match
  const copyToClipboard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent navigation for anchor tag
    navigator.clipboard.writeText(weblink);
    // Optional: Show feedback here (e.g., Tooltip, Snackbar)
  };
  return (
    <Link
      href={weblink}
      underline="hover"
      target={openInNew ? "_blank" : "_self"} // Conditional target attribute
      sx={{ color: linkColour ? linkColour : "#444CE7" }}
      paddingLeft={0.5}
      paddingRight={0.5}
    >
      <Grid container direction="row" spacing={0.5}>
        <Grid item> {textOutput} </Grid>{" "}
        {openInNew && (
          <Grid item>
            <OpenInNewIcon
              sx={{ color: linkColour ? linkColour : "#444CE7" }}
            />
          </Grid>
        )}
        {/* <Grid item>
          <Tooltip title="Copy to clipboard">
            <IconButton
              onClick={copyToClipboard}
              size="small"
              sx={{ color: "#444CE7" }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Grid> */}
      </Grid>
    </Link>
  );
};

export default OwnLink;
