import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Nav({ darkMode, setDarkMode }) {
  
  const navigate = useNavigate();

  

  return (
    <header className="sticky top-0 z-40 ">
      <nav className="   bg-pandaWhite dark:bg-pandaBlack  px-6 py-4 flex items-center justify-between text-pandaBlack dark:text-pandaWhite shadow dark:shadow-grey">
        <div className="text-4xl font-bold ms-10  ">
          <a href="#">PillPanda</a>
        </div>

        <div className="flex items-center space-x-6 mx-8">
          <a href="#" className="hover:text-pandaRed">
            Home
          </a>
          <a href="#about" className="hover:text-pandaBlue">
            About
          </a>
          <button onClick={() => navigate("/login",)} className="px-4 py-1.5 border-pandaGreen border-2  rounded-md hover:bg-green-200 text-sm">
            Log In
          </button>
          <button onClick={() => navigate("/signup",)} className="px-4 py-2 bg-pandaGreen text-pandaWhite rounded-md hover:opacity-70 text-sm dark:bg-pandaGreen dark:text-pandaBlack">
            Sign Up
          </button>
          

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-pandaWhite peer-checked:bg-blue-600 transition-colors"></div>
            <div className="absolute self-center left-1 top-1 w-4 h-4 bg-pandaRed rounded-full transition-transform peer-checked:translate-x-5  peer-checked:bg-pandaBlue  duration-150 ease-out"></div>
            <img
              src={darkMode ? "/moon.png" : "/sun.png"}
              className={darkMode ? " left-3 h-5 w-5" : "ms-1 h-4 w-4"}
            />
          </label>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
