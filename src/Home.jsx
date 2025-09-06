import App from "./App";
import axios from "axios";
import { useEffect, useState } from "react";
import './Home.css';

export default function Home() {
  const [data, setDta] = useState([]);
  
  useEffect(() => {
    menucard();
  }, []);
  
  function menucard() {
    axios.get("http://digimenu-api.onrender.com/mainmenu")
    .then(response => {
      let r = response.data.menu;
      console.log(r);
      setDta(r);
    });
  }

  return (
    <>
      <App />
      <center><h1>Home Page</h1></center>

      <div className="menu-container">
        {data.map((item, index) => (
          
          <div className="menu-item" key={index}>
            <img src={`http://digimenu-api.onrender.com/uploads/${item.img_url}`} alt="menu" className="menu-img"/>
            <div className="menu-details">
              <h2>{item.menu_name}</h2>
              <p>Price: ₹{item.menu_price}</p>
              <p>Category: {item.grp_name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

