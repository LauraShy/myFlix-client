import React from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import logo from './myflix-logo.png';
import './header.scss';

const Header = (props) => {
  function onLoggedOut() {
    localStorage.clear();
    window.open('/', '_self');
  }
  const { user } = props;
  console.log(user)
  return (
    <>
    { user && <Navbar collapseOnSelect expand="lg" className="my-awesome-nav" fixed="top">
        <Container>
      <Navbar.Brand href="/">
        <img 
          src={logo} 
          className="logo"
          width="auto"
          height="55" 
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href='/'>Movies</Nav.Link>
          <Nav.Link href={'/users/${user}'}>Profile</Nav.Link>
          <Nav.Link onClick={() => { onLoggedOut() }}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>  
     
    </Navbar> }
    </>
  )
}
export default Header;