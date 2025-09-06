import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './Admin.jsx'
import App from './App.jsx'
import Home from './Home.jsx'
import Menu from './Menu.jsx'
import Category from './Category.jsx'
import Qty from './Qty.jsx'
import './index.css'
import EditM from './EditM.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin/>}    />
        <Route path="/app" element={<App/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/qty" element={<Qty/>} />
        <Route path="/EditM/:id" element={<EditM />} />
      </Routes>
    </BrowserRouter>
  // </StrictMode>
)
