import React from "react";
import { Typography } from "@mui/material";
import "./404.scss"


const PageNotFound = () => {
  return (
    <div className="notFound_container">
      <div className="content"> 
        <Typography variant="h1">404</Typography>
        <Typography variant="2">Page Not Found</Typography>
      </div>
    </div>
  )
}

export default PageNotFound