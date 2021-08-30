import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';

import loginicon from './login-icon.png';
import logo from './myflix-logo.png';
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflixapplication.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Form>
      <Row>
        <img src={logo} className="logo"></img>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <img src={loginicon} className="loginicon"></img>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <h1>Login</h1>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <Form.Group className="mb-3 pt-3" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
      </Row>
      <Row className="d-flex mx-auto justify-content-center">
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
      </Row>
      <Row className="d-flex mx-auto mt-3 justify-content-center">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Row>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};