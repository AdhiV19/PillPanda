import { useState } from 'react'
import Add_prescription from './components/Add_prescription'
import Notification from './components/Notification'
import './App.css'

function App() {
   const [prescriptionList, setPrescriptionList] = useState([]);

  return (
    <div>
    
      <Add_prescription setPrescriptionList={setPrescriptionList} />


      <Notification prescriptionList={prescriptionList} />
    </div>
  );
}

export default App
