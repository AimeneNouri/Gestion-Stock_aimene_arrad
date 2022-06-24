import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './views/Login'
import Respo from './layout/respo'
import Admin from './layout/admin'
import ApiCalls from './helpers/ApiCalls'

const App = () => {
  const [mode, setMode] = useState("");
  const [isadmin, setIsAdmin] = useState(false);
  const [isrespo, setIsRespo] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const user = ApiCalls.getCurrentUser();
    if(user){
      setCurrentUser(user);
      setIsAdmin(user.roles.includes("ROLE_ADMIN"));
      setIsRespo(user.roles.includes("ROLE_RESPO"));
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Routes>
          {!currentUser && <Route path='/login' element={<Login />} /> }
          {isrespo && <Route path='/respo/*' element={<Respo />} /> }
          {isadmin && <Route path='/admin/*' element={<Admin />} /> }

          <Route path='*' element={currentUser ? isadmin ? <Admin /> : <Respo /> : <Login />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;