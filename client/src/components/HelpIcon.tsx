import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
type InfoTooltipProps = {
  title: string | null;
};

const HelpIcon = (props: InfoTooltipProps) => {
  return (
    <Tooltip title={props.title} arrow>
      <IconButton size="small" aria-label="info" color="primary">
        <InfoIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default HelpIcon;
