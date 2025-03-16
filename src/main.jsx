import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Videoplay from './Components/Videoplay.jsx'
import { ContextProvider } from './Context/SearchContext.jsx'
import "./Components/loader.css"
createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
)
