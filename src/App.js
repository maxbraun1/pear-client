import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import axios from "axios";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Logout from "./components/Auth/Logout.js";
import Register from "./pages/Register";
import Submit from "./pages/Submit";
import User from "./pages/User";
import About from "./pages/About";

export const LoggedContext = React.createContext();

function App(){
  const {REACT_APP_API} = process.env;
  const [loggedStatus, setLoggedStatus] = useState(false);

  useEffect(() => {
    checkLoggedStatus();
  }, [])
  
  return (
    <LoggedContext.Provider value={{loggedStatus, checkLoggedStatus}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/logout" element={<PrivateRoute auth={loggedStatus}><Logout/></PrivateRoute>} />
        <Route path="/submit" element={<PrivateRoute auth={loggedStatus}><Submit/></PrivateRoute>} />
        <Route path="/profile/*" element={<PrivateRoute auth={loggedStatus}><Profile /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </LoggedContext.Provider>
  );

  function checkLoggedStatus(){
    axios.get(REACT_APP_API + "/auth/loggedStatus", {withCredentials: true}).then(response => {
      setLoggedStatus(response.data);
    })
  }
}

export default App;
