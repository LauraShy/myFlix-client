import React, {useState} from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';

import registericon from './register-icon.png';
import logo from './myflix-logo.png';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflixapplication.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthdate
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };

  return (
    <Form>
      <Row>
        <img src={logo} className="logo"></img>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <img src={registericon} className="registericon"></img>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <h1>Register Now!</h1>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <Form.Group className="mb-3 pt-3" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Create username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>  
      </Row>
      <Row className="d-flex mx-auto justify-content-center">
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Create password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
      </Row>
      <Row className="d-flex mx-auto justify-content-center">
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
      </Row>
      <Row className="d-flex mx-auto justify-content-center">
        <Form.Group controlId="dob">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="birthdate" placeholder="YYYY-MM-DD" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        </Form.Group>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center"> 
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Row>
    </Form>
  )
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
};

