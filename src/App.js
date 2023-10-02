import * as React from 'react'
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider,
  } from "@tanstack/react-query";
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useThemeContext } from './styles/themes/mainTheme/ThemeContextProvider';
import Navbar from './components/navbar/Navbar';
import Overview from './pages/overview/Overview';
import "./styles/global.scss";
import Menu from "./components/menu/Menu";
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Footer from './components/footer/footer';
import PageNotFound from './pages/404/404'
import HomePage from './pages/homePage/HomePage';
import { useCookies } from 'react-cookie';

const queryClient = new QueryClient();



function App() {
	const { theme } = useThemeContext();
  const [user, setUser] = useState("")


	const OverviewLayout = () => {

    const fetchUserData = async () => {
      const response = await fetch('/getUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()
      console.log(await data['name'])
      setUser(await data['name'])
    }
    useEffect(() => {
      fetchUserData()
    }, [user])
    
    return(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App'>
          <Navbar name={user ? user: 'loading'} />
          <div className='container'>
            <div className='menuContainer'>
            <Menu />
            </div>
            <div className='contentContainer'>
              <QueryClientProvider client={queryClient}>
              <Outlet />
              </QueryClientProvider>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
      );
    }
    

		

  const PageNotFoundLayout = () => {
    return(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageNotFound />
      </ThemeProvider>
    )
  }

  const BaseLayout = () => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </ThemeProvider>
    )

  }

  const router = createBrowserRouter([
      {
        path: "/",
        element: <BaseLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />
          }
        ]
      },
      {
          path: "/overview",
          element: <OverviewLayout />,
          children: [
              {
                  path: "",
                  element: <Overview />,
              },
          ],
      },
      {
        path: '/auth',
        element: <BaseLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'signup',
            element: <SignUp />,
          },
        ],
      },
      {
          path: '*',
          element: <PageNotFoundLayout />,
      },
  ])

  return <RouterProvider router={router} />
}

export default App;