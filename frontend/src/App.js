import React from 'react'
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Registration from './components/User/Registration'
import Login from './components/User/Login';
import Dashboard from './components/User/Dashboard';
import PublicNav from './components/Navbar/PublicNav';
import PrivateNavbar from './components/Navbar/PrivateNav';
import Home from './components/Home/Home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <PrivateNavbar/>
        <Routes>
          
          <Route path="/"  element={<Home/>} />
          <Route path="/registration"  element={<Registration/>} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/dashboard"  element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App