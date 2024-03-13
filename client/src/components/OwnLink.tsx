import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Grid, IconButton, Link, Tooltip } from "@mui/material";
type OwnLinkProps = {
  text: string;
  weblink: string;
};

// a link thing for general bits of the website, with icon on end
const OwnLink: React.FC<OwnLinkProps> = ({ text, weblink }) => {
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
      target="_blank" // opens in another tab
      sx={{ color: "#444CE7" }}
    >
      <Grid container direction="row" spacing={0.5}>
        <Grid item>{textOutput}</Grid>{" "}
        <Grid item>
          <OpenInNewIcon sx={{ color: "#444CE7" }} />
        </Grid>
        <Grid item>
          <Tooltip title="Copy to clipboard">
            <IconButton
              onClick={copyToClipboard}
              size="small"
              sx={{ color: "#444CE7" }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Link>
  );
};

export default OwnLink;
