import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { PlusCircle, DashLg, PlusLg, Trash } from "react-bootstrap-icons";

const Add_prescription = ({ setPrescriptionList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [prescriptionList, updateLocalPrescriptionList] = useState([]);

  useEffect(() => {
    setPrescriptionList(prescriptionList);
  }, [prescriptionList]);

  useEffect(() => {
    if (searchTerm.length === 0) {
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
    <Container fluid className="p-4">
      <div
        className="mb-4"
        style={{ borderBottom: "2px solid #ddd", paddingBottom: "1rem" }}
      >
        <h3 className="text-primary">💊 Add Prescription</h3>
        <Form.Control
          type="text"
          placeholder="Search medicine by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{
        maxHeight: "350px",
        overflowY: "scroll",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "30px"
      }}>
        <Row className="g-4">
          {medicines.map((med, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="h-100"
                style={{ border: "1px solid #ccc", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
              >
                <Card.Img
                  variant="top"
                  src="https://freesvg.org/img/pill.png"
                  height="150"
                  style={{ objectFit: "contain", padding: "10px" }}
                />
                <Card.Body>
                  <Card.Title className="text-primary d-flex justify-content-between align-items-center">
                    {med.Name}
                    <PlusCircle size={20} className="text-success" role="button" onClick={() => handleAddToPrescription(med)} />
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {prescriptionList.length > 0 && (
        <div>
          <h5 className="text-secondary mb-3">📝 Prescription List</h5>
          {prescriptionList.map((item, index) => (
            <Card className="mb-3" key={index}>
              <Card.Body>
                <Row>
                  <Col md={3}><strong>{item.Name}</strong></Col>
                  <Col md={2}>
                    <Form.Label>Total Days</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={item.totalDays}
                      onChange={(e) => handleTotalDaysChange(index, e.target.value)}
                    />
                    <div className="mt-2 text-success">Days Left: {item.daysLeft}</div>
                  </Col>
                  <Col md={5} className="d-flex justify-content-around">
                    {['morning', 'afternoon', 'night'].map(period => (
                      <div key={period} className="text-center">
                        <small className="text-muted">{period}</small><br />
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handleQtyChange(index, period, "dec")}
                        ><DashLg /></Button>
                        <span className="mx-2">{item[period]}</span>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => handleQtyChange(index, period, "inc")}
                        ><PlusLg /></Button>
                        {item[period] > 0 && (
                          <>
                            <Form.Control
                              type="time"
                              className="mt-1"
                              value={item.time[period]}
                              onChange={(e) => handleTimeChange(index, period, e.target.value)}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Taken"
                              checked={item.taken[period]}
                              onChange={() => toggleTaken(index, period)}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </Col>
                  <Col md={1} className="text-center">
                    <Button variant="success" size="sm" onClick={() => handleTickForToday(index)}>
                      ✅ Tick Today
                    </Button>
                  </Col>
                  <Col md={1} className="text-center">
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeletePrescription(index)}>
                      <Trash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Add_prescription;
