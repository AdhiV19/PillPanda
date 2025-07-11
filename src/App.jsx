
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home'
import Signup from "./components/Signup"
import Login from "./components/Login"
import Cart from "./components/Cart"
import React, { useState, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/signup" element={<Signup darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/Cart" element={<Cart darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
