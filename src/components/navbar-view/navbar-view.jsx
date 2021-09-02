import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from './myflix-logo.png';

function Navbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home">
        <Navbar.Logo>
          <img src={logo} className="logo"></img>
        </Navbar.Logo>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#mainview">Movies</Nav.Link>
          <Nav.Link href="#profile">Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

// I wasn't sure where to put the profile view so I was thinking in a navbar...but don't really undertand how to implement it into each view

