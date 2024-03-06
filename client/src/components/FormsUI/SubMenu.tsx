import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

const SubMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (): void => {
    setOpen(!open);
  };

  const handleSubmenuClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <List component="nav"
    
    >
      
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{/* Your Icon Here */}</ListItemIcon>
        <ListItemText primary="Project" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={handleSubmenuClick}>
            <ListItemText inset primary="Project 1" />
          </ListItem>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleSubmenuClose}
          >
            <MenuItem onClick={handleSubmenuClose}>Option 1</MenuItem>
            <MenuItem onClick={handleSubmenuClose}>Option 2</MenuItem>
            {/* More items */}
          </Menu>
        </List>
      </Collapse>
      {/* More ListItems for other main menu items */}
    </List>
  );
};

export default SubMenu;
