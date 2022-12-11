import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import './App.css';
import PhoneLogin from "./components/PhoneLogin";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/phone-login" element={<PhoneLogin/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
