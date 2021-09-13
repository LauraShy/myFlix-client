import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import './profile-view.scss';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthDate: null,
      favoriteMovies: [],
      movies: [],
    };
  }

  getUser(token) {
    let url =
      "https://myflixapplication.herokuapp.com/users/" + localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data),
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: new Date(response.data.Birthday).toLocaleDateString(),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  // PUT request to update the users profile
  updateProfile() {
    axios
      .put(`https://myflixapplication.herokuapp.com/users/${this.props.user.Username}`,
      this.state.formValues)
      .then(response => {
        this.props.onProfileUpdate(response.data);
        alert('You have sucessfully updated your profile.');
        this.props.history.push(`/users/${response.data.Username}`)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // DELETE request to delete user profile
  handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(`https://myflixapplication.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Remove Favorite Movie
  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://myflixapplication.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        alert(movie.Title + " was removed from your favorite movies.");
      });
  }

  // Convert date into YYYY/MM/DD
  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  handleChange(e) {
    const { target } = e;
    this.setState((prev) => ({
      formValues: {
        ...prev.formValues,
        [target.name]: target.value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.updateProfile();
  }

  
  render() {
    let { username, birthday, email } = this.state;

    return (
      <Container className="profile-view">

        <Row className="user-info mb-5 mt-4 text-center">
          <h1 className="d-flex justify-content-center mt-2">User Profile</h1>
          <p className="d-flex justify-content-center text-light mb-1"><b className="mr-1">Username:</b> {`${username}`} </p>
          <p className="d-flex justify-content-center text-light mb-1"><b className="mr-1">Email:</b> {`${email}`}</p>
          <p className="d-flex justify-content-center text-light mb-1"><b className="mr-1">Birthday:</b> {`${this.formatDate(birthday)}`}</p>
        </Row>

        <Row className="justify-content-md-center">
            <h2 className="mb-2 mt-4">My Favorite Movies </h2>
            {favoriteMovieList.length === 0 && (
              <p className="text-light">
                You do not have any favorite movies yet!
              </p>
            )}
            {favoriteMovieList.length > 0 &&
              favoriteMovieList.map((movie) => {
                return (
                  <Col sm={12} md={6}>
                    <Card key={movie._id} className="fav-card mt-2">
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Img id="poster" src={movie.ImagePath} />
                      </Link>
                      <Button
                        className="profile-btn mt-2"
                        onClick={() => this.removeFavorite(movie)}
                      >
                        Remove
                      </Button>
                    </Card>
                  </Col>
                );
              })}
          </Row>

        <Form>
          <h4 className="d-flex justify-content-center mt-3">Update Your Account</h4>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control name="Username" type="username" value={this.state.formValues.Username} placeholder="Update your username" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="Password" type="password" value={this.state.formValues.Password} placeholder="Update your password" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name="Email" type="email" value={this.state.formValues.Email} placeholder="Update your email address" onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control name="Birthday" type="date" value={this.state.formValues.Birthday} onChange={this.handleChange} />
          </Form.Group>
        </Form>

        <div className="buttons text-center mb-3">
          <Button className="profile-btn mr-2 mt-5" type="submit" onClick={this.handleSubmit}>Update Profile</Button>
          <Button className="profile-btn mt-5" onClick={() => {
            const confirmBox = window.confirm("Are you sure you want to delete your account?")
            if (confirmBox === true) { this.handleDelete() }
          }} > Delete Account </Button>
        </div>

      </Container >
    );
  }
}

ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
    FavoriteMovies: PropTypes.array,
  }),
};

export default (ProfileView);