import * as React from 'react'
import NightModeToggle from "../nightModeToggle/NightModeToggle";
import "./navbar.scss";
import { useThemeContext } from "../../styles/themes/mainTheme/ThemeContextProvider";
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import MainLogo from '../../assets/MainLogo';
import { useTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors"
import { useNavigate } from "react-router-dom";

interface IProps {
  name: string
}


const Navbar = (props: IProps) => {
  const { name } = props
  const navigate = useNavigate()

  const theme = useTheme();
  console.log(theme.palette.primary.main )

  const logout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    navigate('/')
    
  }

  return (
    <div className="navbar">
      <div className="logo">
        <MainLogo wireFrameColor="#186F65" cornerColor='#B5CB99' accentColor='#FCE09B'/>
        <span>DemoApp</span>
      </div>
      <div className="icons">
        <button onClick={logout}>Logout</button>
        <SearchIcon />
        <AppsIcon />
        <FullscreenIcon />
        <div className="notification">
          <NotificationsIcon />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>{name}</span>
        </div>
        <SettingsIcon />
        <NightModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
