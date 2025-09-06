import App from "./App"
import axios from 'axios';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function Category() {
  const [data, setDta] = useState([]);

  useEffect(() => {
    menucard();
  }, []);

  // -------------------- category fetch
  function menucard() {
    axios.get("http://digimenu-api.onrender.com/menucategory")
      .then(response => {
        let r = response.data.category;
        console.log(r);
        setDta(r);
      })
  }

  // ------------------- delete category
  function delCategory(catid) {
    axios.delete("http://digimenu-api.onrender.com/delCat", {
      data: { "cid": catid }
    })
      .then(response => {
        console.log(response.data);
        alert("cid: " + catid + " deleted Successfully");
        menucard();
      })
  }

  // ------------------- add category
  const [cat, setCat] = useState("");
  function addCategory() {
    const newC = {
      grp_name: cat
    };
    axios.post("http://digimenu-api.onrender.com/addCat", newC)
      .then(response => {
        alert("Category Added successfully");
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
        <center><h1 style={{ color: '#333' }}>Category Page</h1></center>

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
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '18px', fontWeight: '500', color: '#4E6C50' }}>{item.grp_name}</span>
              <Button variant="danger" onClick={() => delCategory(item.cid)}>Delete</Button>
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
          <center><h2 style={{ color: '#4E6C50' }}>You can add category here</h2></center>
          <Form.Group as={Col}>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category Name"
              onChange={(e) => setCat(e.target.value)}
              required
            />
          </Form.Group>

          <br /><br />

          <Button variant="success" onClick={addCategory}>
            Add Category
          </Button>
        </Form>
      </div>
    </>
  )
}
