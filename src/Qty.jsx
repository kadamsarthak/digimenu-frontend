import App from "./App"
import axios from 'axios';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Qty() {
  const [data, setDta] = useState([]);

  useEffect(() => {
    menucard();
  }, []);

  // --------------------- fetch quantity
  function menucard() {
    axios.get("https://digimenu-api.onrender.com/qty")
      .then(response => {
        let r = response.data.data;
        console.log(r);
        setDta(r);
      })
  }

  // --------------------- delete quantity
  function delQty(qtyid) {
    axios.delete("https://digimenu-api.onrender.com/delqty", {
      data: { "qid": qtyid }
    })
      .then(response => {
        console.log(response.data);
        alert("Qty id: " + qtyid + " Deleted Successfully");
        menucard();
      })
  }

  // --------------------- add quantity
  const [qid, setQid] = useState(0);
  const [quantity, setQty] = useState("");
  function addQty() {
    const newQ = {
      qid: qid,
      qty: quantity
    }
    axios.post("https://digimenu-api.onrender.com/addqty", newQ)
      .then(response => {
        alert("Quantity added successfully");
        menucard();
      })
  }

  return (
    <>
      <App />

      <div style={{
        background: 'linear-gradient(to right, #A9C9A4, #F0F0F0)',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <center><h1 style={{ color: '#333' }}>Quantity Page</h1></center>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          maxWidth: '600px',
          margin: '20px auto'
        }}>
          {data.map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <span style={{ fontSize: '16px', color: '#4E6C50' }}><b>Sr no.:</b> {item.qid}</span>
              <span style={{ fontSize: '18px', fontWeight: '500', color: '#4E6C50' }}>{item.quantity}</span>
              <span style={{ fontSize: '14px', color: '#888' }}>Created at: {item.created_at}</span>
              <Button variant="danger" onClick={() => delQty(item.qid)}>Delete</Button>
            </div>
          ))}
        </div>

        <br /><br />

        <Form style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "15px",
          justifyContent: "space-around",
          padding: "20px",
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <center><h2 style={{ color: '#4E6C50' }}>You can add quantity here</h2></center>
          <Row className="mb-3">
            <Form.Group as={Col} >
              <Form.Label>Sr no.</Form.Label>
              <Form.Control type="text" placeholder="Enter sr no." onChange={(e) => setQid(e.target.value)} required />
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label>Quantity Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Quantity Name" onChange={(e) => setQty(e.target.value)} required />
            </Form.Group>
          </Row>

          <br /><br />

          <Button variant="success" onClick={addQty}>
            Add Quantity
          </Button>
        </Form>
      </div>
    </>
  )
}
