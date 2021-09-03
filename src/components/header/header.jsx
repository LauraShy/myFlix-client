import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import logo from './myflix-logo.png';

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
      <Navbar.Brand href="#home">
        <img 
          src={logo} 
          className="logo"
          width="auto"
          height="30" 
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href='/'>Movies</Nav.Link>
          <Nav.Link href='/profile'>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation;
// I wasn't sure where to put the profile view so I was thinking in a navbar...but don't really undertand how to implement it into each view

