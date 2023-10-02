import { Link } from "react-router-dom";
import "./menu.scss";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Person } from "@mui/icons-material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SignpostIcon from '@mui/icons-material/Signpost';
import AppsIcon from '@mui/icons-material/Apps';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import App from "../../App";
import React from "react";
// NEXT IS REPLACING THE ICONS WITH MUI ICONS CHECK HERE FOR START https://mui.com/material-ui/icons/

const OtherMenu = () => {
  return (
    <div className="menu">
        <div className="item" key="1">
          <Typography variant="subtitle1">Main</Typography>
            <Link to="/" className="listItem" key="1">
              <HomeIcon />
              <span className="listItemTitle">Homepage</span>
            </Link>
            <Link to="/" className="listItem" key="2">
              <Person />
              <span className="listItemTitle">Profile</span>
            </Link>
        </div>
        <div className="item" key="2">
          <Typography variant="subtitle1">Lists</Typography>
            <Link to="/" className="listItem" key="1">
              <Diversity3Icon />
              <span className="listItemTitle">Users</span>
            </Link>
            <Link to="/" className="listItem" key="2">
              <ShoppingCartIcon />
              <span className="listItemTitle">Products</span>
            </Link>
            <Link to="/" className="listItem" key="3">
              <AssignmentIcon />
              <span className="listItemTitle">Orders</span>
            </Link>
            <Link to="/" className="listItem" key="4">
              <SignpostIcon />
              <span className="listItemTitle">Posts</span>
            </Link>
        </div>
        <div className="item" key="3">
          <Typography variant="subtitle1">General</Typography>
            <Link to="/" className="listItem" key="1">
              <AppsIcon />
              <span className="listItemTitle">Elements</span>
            </Link>
            <Link to="/" className="listItem" key="2">
              <SpeakerNotesIcon />
              <span className="listItemTitle">Notes</span>
            </Link>
            <Link to="/" className="listItem" key="3">
              <EmailIcon />
              <span className="listItemTitle">Forms</span>
            </Link>
            <Link to="/" className="listItem" key="4">
              <CalendarMonthIcon />
              <span className="listItemTitle">Calendar</span>
            </Link>
        </div>
    </div>
  );
};

export default OtherMenu;
