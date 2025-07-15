import React, { useEffect, useState } from "react";

function Notification() {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [missed, setMissed] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pillpanda-prescriptions")) || [];
    setPrescriptionList(stored);
  }, []);

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const upcoming = [];
      const missedDoses = [];

      prescriptionList.forEach((item) => {
        ["morning", "afternoon", "night"].forEach((period) => {
          if (item[period] > 0 && item.time[period]) {
            const [hh, mm] = item.time[period].split(":").map(Number);
            const scheduled = hh * 60 + mm;
            const diff = scheduled - currentMinutes;

            if (diff === 5) {
              upcoming.push({
                name: item.Name,
                period,
                time: item.time[period],
                message: `⏰ Take your ${period} dose of ${item.Name} at ${item.time[period]}`,
              });
            }

            if (currentMinutes > scheduled && !item.taken[period]) {
              missedDoses.push({
                name: item.Name,
                period,
                time: item.time[period],
                message: `❌ Missed ${period} dose of ${item.Name} scheduled at ${item.time[period]}`,
              });
            }
          }
        });
      });

      setNotifications(upcoming);
      setMissed(missedDoses);
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, [prescriptionList]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pandaBlue dark:text-pandaRed mb-6">🔔 Medicine Notifications</h2>

      {notifications.length > 0 && (
        <div className="bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 text-blue-700 dark:text-blue-200 p-4 rounded mb-4">
          {notifications.map((n, i) => (
            <div key={i}>✅ {n.message}</div>
          ))}
        </div>
      )}

      {missed.length > 0 && (
        <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded mb-4">
          {missed.map((m, i) => (
            <div key={i}>⚠ {m.message}</div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {prescriptionList.map((item, index) => (
          <div key={index} className="bg-white dark:bg-zinc-800 shadow p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-pandaBlack dark:text-white mb-2">{item.Name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">Days Left: {item.daysLeft}</p>
            {["morning", "afternoon", "night"].map((period) =>
              item[period] > 0 && item.time[period] ? (
                <div key={period} className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                  {period.charAt(0).toUpperCase() + period.slice(1)}: {item.time[period]} -{" "}
                  {item.taken[period] ? "✅ Taken" : "⏳ Pending"}
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
