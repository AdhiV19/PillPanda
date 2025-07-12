import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Alert } from "react-bootstrap";

const Notification = ({ prescriptionList }) => {
  const [notifications, setNotifications] = useState([]);
  const [missed, setMissed] = useState([]);

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      const currentHourMin = now.getHours() * 60 + now.getMinutes();

      const newNotifications = [];
      const missedDoses = [];

      prescriptionList.forEach((item) => {
        ["morning", "afternoon", "night"].forEach((period) => {
          if (item[period] > 0 && item.time[period]) {
            const [hh, mm] = item.time[period].split(":").map(Number);
            const scheduledMinutes = hh * 60 + mm;
            const diff = scheduledMinutes - currentHourMin;

            if (diff === 5) {
              newNotifications.push({
                name: item.Name,
                period,
                time: item.time[period],
                message: `⏰ Time to take your ${period} dose of ${item.Name} at ${item.time[period]}`,
              });
            }

            if (currentHourMin > scheduledMinutes && !item.taken[period]) {
              missedDoses.push({
                name: item.Name,
                period,
                time: item.time[period],
                message: `❌ You missed your ${period} dose of ${item.Name} at ${item.time[period]}`,
              });
            }
          }
        });
      });

      setNotifications(newNotifications);
      setMissed(missedDoses);
    };

    checkNotifications(); // initial check
    const interval = setInterval(checkNotifications, 60000); // check every minute

    return () => clearInterval(interval);
  }, [prescriptionList]);

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-primary">🔔 Medicine Notifications</h3>

      {notifications.length > 0 && (
        <Alert variant="info">
          {notifications.map((note, idx) => (
            <div key={idx}>✅ {note.message}</div>
          ))}
        </Alert>
      )}

      {missed.length > 0 && (
        <Alert variant="danger">
          {missed.map((miss, idx) => (
            <div key={idx}>{miss.message}</div>
          ))}
        </Alert>
      )}

      <Row className="mt-4">
        {prescriptionList.map((item, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{item.Name}</Card.Title>
                <p><strong>Days Left:</strong> {item.daysLeft}</p>
                {["morning", "afternoon", "night"].map((period) =>
                  item[period] > 0 && item.time[period] ? (
                    <div key={period}>
                      <strong>{period}:</strong> {item.time[period]} -{" "}
                      {item.taken[period] ? "✅ Taken" : "⏳ Pending"}
                    </div>
                  ) : null
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Notification;
