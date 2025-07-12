import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const Add_prescription = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await axios.get(
          "https://68724b0c76a5723aacd4392a.mockapi.io/pillpanda/medicines1"
        );
         const response2= await axios.get(
          "https://68724b0c76a5723aacd4392a.mockapi.io/pillpanda/medicines"
        );
        setMedicines(response1.data);
        setMedicines(response2.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Container fluid className="p-4">
      <div
        className="mb-4"
        style={{
          borderBottom: "2px solid #ddd",
          paddingBottom: "1rem",
        }}
      >
        <h3 className="text-primary">💊 Medicine Inventory</h3>
      </div>

      <Row className="g-4">
        {medicines.map((med, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="h-100"
              style={{
                border: "1px solid #ccc",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Img
                variant="top"
                src="https://freesvg.org/img/pill.png"
                height="150"
                style={{ objectFit: "contain", padding: "10px" }}
              />
              <Card.Body>
                <Card.Title className="text-primary">{med.Name}</Card.Title>
                <Card.Text>
                  <strong>Qty:</strong> {med.Qty} <br />
                  <strong>Batch No:</strong> {med.BatchNo} <br />
                  <strong>MRP:</strong> ₹{med.MRP} <br />
                  <strong>Date:</strong> {med.Date}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Add_prescription;
