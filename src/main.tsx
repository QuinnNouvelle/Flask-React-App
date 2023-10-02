import {createRoot} from 'react-dom/client'
import App from './App.js'
import { ThemeContextProvider } from './styles/themes/mainTheme/ThemeContextProvider.js'
import * as React from 'react'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
)
