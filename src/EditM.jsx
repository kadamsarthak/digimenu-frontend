import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export default function EditM() {
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();

    const [menu, setMenu] = useState({
        name: "",
        price: 0,
        cid: "",
        qid: ""
    });
    const [categories, setCategories] = useState([]);
    const [quantities, setQuantities] = useState([]);

    useEffect(() => {
        axios.get(`http://digimenu-api.onrender.com/menu`)
            .then(response => {
                const { menu_name, menu_price, cid, qid } = response.data;
                setMenu({ name: menu_name || "", price: menu_price|| "", cid: cid || "", qid: qid || "" });
            })
            .catch(err => {
                console.error("Error fetching menu data:", err.response?.data || err.message);
            });
    

        // Fetch categories
        axios.get("http://digimenu-api.onrender.com/menucategory")
            .then(response => setCategories(response.data.category || []));

        // Fetch quantities
        axios.get("http://digimenu-api.onrender.com/qty")
            .then(response => setQuantities(response.data.data || []));
    }, [id]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setMenu(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting form...");
        axios.put(`http://digimenu-api.onrender.com/updatemenu`, {
            mid: id,
            name: menu.name,
            price: menu.price,
            cid: menu.cid,
            qid: menu.qid
        })
            .then(() => {
                alert("Menu updated successfully!");
                navigate("/menu");
            })
            .catch(err => {
                console.error("Error updating menu:", err.response?.data || err.message);
                alert("Failed to update the menu. Please try again.");
            });
    }

    return (
        <div style={{ margin: "20px auto", maxWidth: "600px" }}>
            <h2>Edit Menu</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Menu Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={menu.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={menu.price}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="cid"
                        value={menu.cid}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.cid} value={cat.cid}>
                                {cat.grp_name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Select
                        name="qid"
                        value={menu.qid}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Quantity</option>
                        {quantities.map(q => (
                            <option key={q.qid} value={q.qid}>
                                {q.quantity}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => console.log("Button clicked!")}>
                    Update Menu
                </Button>
            </Form>
        </div>
    );
}
