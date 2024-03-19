import React from 'react'
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Registration from './components/User/Registration'
import Login from './components/User/Login';
import Dashboard from './components/User/Dashboard';
import PublicNav from './components/Navbar/PublicNav';
import PrivateNavbar from './components/Navbar/PrivateNav';
import Home from './components/Home/Home';
import { useAuth } from './AuthContext/AuthContext';
import AuthRoute from './components/AuthRoute/AuthRoute';
import BlogPostAIAssistant from './components/ContentGeneration/ContentGeneration';

const App = () => {

  const {isAuthenticated} = useAuth();
  return (
    <div>
      <BrowserRouter>
        {isAuthenticated ? <PrivateNavbar/> : <PublicNav/>}
        <Routes>
          
          <Route path="/"  element={<Home/>} />
          <Route path="/registration"  element={<Registration/>} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/dashboard"  element={
            <AuthRoute>
              <Dashboard/>
            </AuthRoute>
          } />
          <Route path="/generate-content"  element={
            <AuthRoute>
              <BlogPostAIAssistant/>
            </AuthRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App