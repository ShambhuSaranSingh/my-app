
import { useState, useEffect } from "react";
import {Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Home";
import Login from './Login';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import axios from "axios";


function App() {

  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (updateUserDetails) => {
    setUserDetails(updateUserDetails);
  };

  const isUserLoggedIn = async () => {
    const res = await axios.post('http://localhost:5002/auth/is-user-logged-in', {}, {
      withCredentials: true, // to send cookies with the request
    });
    updateUserDetails(res.data.user);
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);
  
  return (
    <>
      <Routes>
        <Route path="/" element={userDetails ?
          <Navigate to="/dashboard" /> :
          <AppLayout>
            <Home />
        </AppLayout>}
        />
        <Route path="/login" element={userDetails ?
          <Navigate to="/dashboard" /> :
          <AppLayout>
            <Login updateUserDetails={updateUserDetails}/>
          </AppLayout>}
        />
        <Route path="/dashboard" element={userDetails ?
          <Dashboard />:
          <Navigate to="/login" />
        } 
        />
      </Routes>
    </>
  );
}

export default App;
