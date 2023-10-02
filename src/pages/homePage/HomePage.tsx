import * as React from 'react'
import { Link } from 'react-router-dom'
import "./homePage.scss"
import { Typography } from '@mui/material'

const HomePage = () => {
  return(
  <div className='HomePageContainer'>
    <Typography variant='h1'> Welcome To Your App</Typography>
    <Link to={'/auth/login'}>Login</Link>
  </div>)
}

export default HomePage