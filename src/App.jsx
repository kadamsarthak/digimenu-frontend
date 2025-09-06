import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <Navbar className="nav" fixed='top'>
        <Container className="cont">
          <Navbar.Brand style={{ color: "#393E46" }}>DigiMenu</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as="span">
              <Link to="/home" style={{ textDecoration: "none" }} className={`navig ${currentPath === '/home' ? 'active-link' : ''}`}>Home</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/menu" style={{ textDecoration: "none" }} className={`navig ${currentPath === '/menu' ? 'active-link' : ''}`}>Menu</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/category" style={{ textDecoration: "none" }} className={`navig ${currentPath === '/category' ? 'active-link' : ''}`}>Category</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/qty" style={{ textDecoration: "none" }} className={`navig ${currentPath === '/qty' ? 'active-link' : ''}`}>Quantity</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
    </>
  );
}
