import App from "./App";
import axios from 'axios';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate();
  const [data, setDta] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantity, setQty] = useState([]);
  const [selectedQty, setSelectedQty] = useState('');
  const [mname, setMname] = useState('');
  const [price, setPrice] = useState(0);
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    menucard();
    fetchCategories();
    fetchQty();
  }, []);

  function menucard() {
    axios.get("http://digimenu-api.onrender.com/menu")
      .then(response => {
        let r = response.data.menu;
        setDta(r);
      });
  }

  function delMenu(Mid) {
    axios.delete("http://digimenu-api.onrender.com/delmenu", {
      data: { "id": Mid }
    })
      .then(response => {
        alert("mid: " + Mid + " deleted Successfully");
        menucard();
      });
  }

  function fetchCategories() {
    axios.get("http://digimenu-api.onrender.com/menucategory")
      .then(response => {
        setCategories(response.data.category);
      });
  }

  function fetchQty() {
    axios.get("http://digimenu-api.onrender.com/qty")
      .then(response => {
        setQty(response.data.data);
      });
  }

  function addMenu() {
    const formData = new FormData();
    formData.append('name', mname);
    formData.append('price', price);
    formData.append('cid', selectedCategory);
    formData.append('qid', selectedQty);
    formData.append('img', imgFile);

    axios.post("http://digimenu-api.onrender.com/addmenu", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        alert("Menu Added successfully");
        menucard();
      });
  }

  return (
    <>
      <App />
      <div style={{
        background: 'linear-gradient(to right, #A9C9A4, #F0F0F0)',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <h1 style={{ textAlign: "center", color: "#4C6E58", marginBottom: "30px" }}>Menu Page</h1>

        <div style={{ maxWidth: '900px', margin: 'auto' }}>
          {data.map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#E6F2E6',
              borderRadius: '15px',
              padding: '15px',
              marginBottom: '15px',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              {/* {item.img_url && (
                <imga src={`http://localhosta:8000/uploads/${item.img_url}`} alt={item.menu_name}
                  style={{ width: '100%', maxWidth: '300px', borderRadius: '10px', marginBottom: '10px' }} />
              )} */}
              <h3 style={{ margin: '5px 0', color: '#4C6E58' }}>{item.menu_name}</h3>
              <p style={{ margin: '5px 0' }}>Price: ₹{item.menu_price}</p>
              <p style={{ margin: '5px 0' }}>Added at: {item.added_at}</p>
              <div>
                <Button variant="warning" onClick={() => navigate(`/EditM/${item.mid}`)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => delMenu(item.mid)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>

        <br /><br />

        <Form style={{
          backgroundColor: "#F8FFF8",
          borderRadius: "15px",
          padding: "20px",
          maxWidth: "800px",
          margin: "auto",
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ textAlign: "center", color: "#4C6E58" }}>You can add menu here</h2>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Menu Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Menu Name" onChange={(e) => setMname(e.target.value)} required />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Menu Price</Form.Label>
              <Form.Control type="text" pattern="\d*" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Menu Image</Form.Label>
            <Form.Control type="file" onChange={(e) => setImgFile(e.target.files[0])} />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Choose category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.cid}>{category.grp_name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Quantity</Form.Label>
              <Form.Select value={selectedQty} onChange={(e) => setSelectedQty(e.target.value)}>
                <option value="">Choose Quantity</option>
                {quantity.map((quantity, index) => (
                  <option key={index} value={quantity.qid}>{quantity.quantity}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <br />

          <Button variant="success" onClick={addMenu}>
            Add menu
          </Button>
        </Form>
      </div>
    </>
  );
}
