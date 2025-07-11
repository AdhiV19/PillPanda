import React from 'react'
import Nav from './Nav'
import Body from './Body'
import Footer from './Footer'

function Home({ darkMode, setDarkMode }) {
  return (
    <div>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Body darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Footer darkMode={darkMode} setDarkMode={setDarkMode}/>
    </div>
  )
}

export default Home