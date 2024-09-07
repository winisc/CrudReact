import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Historico from './pages/Historico/historico'
import Relatorios from './pages/Relatorios/relatorios'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/historico' element={<Historico/>}/>
        <Route path='/relatorios' element={<Relatorios/>}/>
        <Route path='*' element={<h1>Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
