import { useState } from 'react'
import Add_prescription from './components/Add_prescription'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Add_prescription/>
    </>
  )
}

export default App
