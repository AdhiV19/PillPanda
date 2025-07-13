import React, { useEffect, useState } from "react";
import axios from "axios";

function Addprescription() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [prescriptionList, updateLocalPrescriptionList] = useState([]);
  
useEffect(() => {
  localStorage.setItem("pillpanda-prescriptions", JSON.stringify(prescriptionList));
}, [prescriptionList]);
  

  useEffect(() => {
    if (searchTerm.length === "") {
      setMedicines([]);
      return;
    }

    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get("https://68724b0c76a5723aacd4392a.mockapi.io/pillpanda/medicines1"),
          axios.get("https://68724b0c76a5723aacd4392a.mockapi.io/pillpanda/medicines")
        ]);
        const allMeds = [...res1.data, ...res2.data];
        const filtered = allMeds.filter(med =>
          med.Name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setMedicines(filtered);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleAddToPrescription = (med) => {
    updateLocalPrescriptionList(prev => [
      ...prev,
      {
        ...med,
        taken: { morning: false, afternoon: false, night: false },
        time: { morning: "", afternoon: "", night: "" },
        morning: 0,
        afternoon: 0,
        night: 0,
        totalDays: 0,
        daysLeft: 0,
        lastTickDate: null,
      }
    ]);
    alert(`${med.Name} has been added to the prescription list.`);
    
  };

  const handleQtyChange = (index, timeOfDay, action) => {
    updateLocalPrescriptionList(prev => {
      const updated = [...prev];
      const item = updated[index];
      if (action === "inc") {
        item[timeOfDay] += 1;
      } else if (action === "dec" && item[timeOfDay] > 0) {
        item[timeOfDay] -= 1;
      }
      return updated;
    });
  };

  const handleTimeChange = (index, timeOfDay, value) => {
    updateLocalPrescriptionList(prev => {
      const updated = [...prev];
      updated[index].time[timeOfDay] = value;
      return updated;
    });
  };

  const toggleTaken = (index, timeOfDay) => {
    updateLocalPrescriptionList(prev => {
      const updated = [...prev];
      updated[index].taken[timeOfDay] = !updated[index].taken[timeOfDay];
      return updated;
    });
  };

  const handleTotalDaysChange = (index, value) => {
    updateLocalPrescriptionList(prev => {
      const updated = [...prev];
      const num = parseInt(value) || 0;
      updated[index].totalDays = num;
      updated[index].daysLeft = num;
      return updated;
    });
  };

  const handleTickForToday = (index) => {
    const today = new Date().toISOString().split("T")[0];
    updateLocalPrescriptionList(prev => {
      const updated = [...prev];
      const item = updated[index];
      const doses = ['morning', 'afternoon', 'night'].filter(p => item[p] > 0);
      const allTaken = doses.every(p => item.taken[p]);

      if (!allTaken) {
        alert("Please mark all scheduled doses as taken before ticking today.");
        return prev;
      }

      if (item.lastTickDate === today) {
        alert("Today's tick has already been marked.");
        return prev;
      }

      if (item.daysLeft > 0) {
        item.daysLeft -= 1;
        item.lastTickDate = today;
        item.taken = { morning: false, afternoon: false, night: false };
      }

      return updated;
    });
  };

  const handleDeletePrescription = (index) => {
    updateLocalPrescriptionList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-pandaBlue mb-2">💊 Add Prescription</h2>
        <input
          type="text"
          placeholder="Search medicine by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-4 py-2 rounded shadow focus:outline-none focus:ring focus:border-pandaBlue"
        />
      </div>

      {/* Medicine Search List */}
      <div className="max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-6 bg-white dark:bg-zinc-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {medicines.map((med, i) => (
            <div key={i} className="border rounded shadow bg-white dark:bg-zinc-900 p-3 flex flex-col justify-between">
              <img src="https://freesvg.org/img/pill.png" alt="pill" className="w-full h-24 object-contain mb-2" />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-pandaBlue dark:text-pandaRed">{med.Name}</span>
                <button onClick={() => handleAddToPrescription(med)} className="text-green-600 text-lg">➕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescription List */}
      {prescriptionList.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-pandaRed mb-4">📝 Prescription List</h3>
          {prescriptionList.map((item, index) => (
            <div key={index} className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="font-bold text-lg text-pandaBlue">{item.Name}</div>

                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Total Days</label>
                  <input
                    type="number"
                    min="0"
                    value={item.totalDays}
                    onChange={(e) => handleTotalDaysChange(index, e.target.value)}
                    className="border rounded px-2 py-1 w-20"
                  />
                  <span className="text-green-500 text-sm">Left: {item.daysLeft}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {['morning', 'afternoon', 'night'].map(period => (
                  <div key={period} className="flex flex-col gap-1 text-center">
                    <span className="text-sm font-medium capitalize text-gray-700">{period}</span>
                    <div className="flex justify-center items-center gap-2">
                      <button onClick={() => handleQtyChange(index, period, "dec")} className="px-2 py-1 border rounded">-</button>
                      <span>{item[period]}</span>
                      <button onClick={() => handleQtyChange(index, period, "inc")} className="px-2 py-1 border rounded">+</button>
                    </div>
                    {item[period] > 0 && (
                      <>
                        <input
                          type="time"
                          value={item.time[period]}
                          onChange={(e) => handleTimeChange(index, period, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        <label className="flex items-center justify-center text-xs gap-1">
                          <input
                            type="checkbox"
                            checked={item.taken[period]}
                            onChange={() => toggleTaken(index, period)}
                          />
                          Taken
                        </label>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleTickForToday(index)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  ✅ Tick Today
                </button>
                <button
                  onClick={() => handleDeletePrescription(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Addprescription;
