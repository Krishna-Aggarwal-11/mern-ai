import React from 'react'
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Registration from './components/User/Registration'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/registration"  element={<Registration/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App