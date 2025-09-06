import { useState, useEffect } from 'react';
import './Admin.css'; // Use static import for CSS
import { useNavigate } from "react-router-dom";
import App from './App';
import axios from 'axios';

export default function Admin() {


 const navigate = useNavigate();
  const [usrnm, setUsrnm] = useState("Admin");
  const [pwd, setPwd] = useState("pass123");

 const [usrchk,usrCheck] = useState("");
 const [pwchk,pwCheck] = useState("");


 
  const handleusr = (e) => {
    usrCheck(e.target.value);
  }

  const handlepwd = (e) => {
    pwCheck(e.target.value);
  }

  function api() {
    
    return axios.get("http://digimenu-api.onrender.com/admin")
      .then(response => {
        // console.log(response.data);
        let usr = response.data.admin[0].admin;
        let p = response.data.admin[0].pwd;
        console.log(usr);
        console.log(p);
        setUsrnm(usr)
        setPwd(p);
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.get("http://digimenu-api.onrender.com/admin")
      .then(response => {
        let usr = response.data.admin[0].admin;
        let p = response.data.admin[0].pwd;
        console.log(usr);
        console.log(p);
  
        // ✅ Now directly compare here, not using state
        if (usr === usrchk && p === pwchk) {
          alert("Login Successful");
          navigate("/Home");
        } else {
          alert("Login Failed");
        }
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  }
  

  // useEffect(() => {
  //   // Check credentials after `usrnm` and `pwd` have been updated
  //   if (usrnm && pwd) {  // Ensure both usrnm and pwd are set before checking
  //     if (usrnm === usrchk && pwd === pwchk) {
  //       alert("Login Successful");
  //       navigate("/Home");
  //     } else if (usrchk && pwchk) {
  //       alert("Login Failed");
  //     }
  //   }
  // }, [usrnm, pwd, usrchk, pwchk]); 

  return (
    <div className='bdy'>
      <img src="src/images/admin.png" alt="not found" className='imgs' />
      <div className='login'>
        <form className='frm' onSubmit={handleSubmit}> {/* Attach api function to form submission */}
          <h1>Admin Dashboard Login</h1>
          <label htmlFor='usrnm'>Username</label>
          <input type='text' name='usrnm' id='usrnm' value={usrnm} onChange={handleusr} />
          <label htmlFor='pwd'>Password</label>
          <input type='password' name='pwd' id='pwd' value={pwd} onChange={handlepwd} />
          <button type="submit">Login</button>{/* Use type="submit" to trigger form submit */}
        </form>
      </div>
    </div>
  );
}
