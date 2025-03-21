import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Videoplay from './Components/Videoplay.jsx'
import { ContextProvider } from './Context/SearchContext.jsx'
import "./Components/loader.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/videos' element={<Videoplay />}></Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>
)
