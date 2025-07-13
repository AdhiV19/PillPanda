import { useState } from 'react'
import Add_prescription from './components/Add_prescription'
// import Notification from './components/Notification'
import './App.css'

function App() {
   const [prescriptionList, setPrescriptionList] = useState([]);

  return (
    <div>
    {/* setPrescriptionList={setPrescriptionList} */}
      <Add_prescription  />


      {/* <Notification prescriptionList={prescriptionList} /> */}
    </div>
  );
}

export default App
