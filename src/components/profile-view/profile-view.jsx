import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import './profile-view.scss';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: [],
      UsernameError: "",
      PasswordError: "",
      EmailError: "",
      BirthdayError: ""
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthdayChange = this.onBirthdayChange.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      Username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      Password: event.target.value
    });
  }

  onEmailChange(event) {
    this.setState({
      Email: event.target.value
    });
  }

  onBirthdayChange(event) {
    this.setState({
      Birthday: event.target.value
    });
  }


  //Allow user to update their user information
  handleUpdateUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    let validated = this.formValidation();
    if (validated) {
      axios.put('https://myflixapplication.herokuapp.com/users/${Username}', {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(response => {
          const data = response.data;
          console.log(data);
          alert("Your information has been successfully updated!");
          window.open('/', '_self');
        })
        .catch(e => {
          console.log("Error updating user information")
        });
    }
  }

  //Error handling with user information
  formValidation() {
    let UsernameError = {};
    let PasswordError = {};
    let EmailError = {};
    let BirthdayError = {};
    let isValid = true;
    if (!(this.state.Username && this.state.Username.length > 4)) {
      UsernameError.notValidUsername = "Username must be at least 4 characters";
      isValid = false;
    }
    if (!(this.state.Password && this.state.Password.length > 5)) {
      PasswordError.notValidPassword = "Password must be at least 5 characters";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes("@"))) {
      EmailError.notValidEmail = "Please enter a valid email address";
      isValid = false;
    }
    if (!(this.state.Birthday)) {
      BirthdayError.noBirthday = "Please enter your date of birth";
      isValid = false;
    }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdayError: BirthdayError,
    })
    return isValid;
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  // GET user information by username
  getUser(token) {
    let url =
      'https://myflixapplication.herokuapp.com/users/' + localStorage.getItem('user');
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
          birthday: moment(response.data.Birthday).format("YYYY-MM-DD"),
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Allow user to delete their account
  handleDeleteUser = (e) => {
    e.preventDefault();
    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
      const token = localStorage.getItem('token');
      const Username = localStorage.getItem('user');

      axios.delete('https://myflixapplication.herokuapp.com/users/${Username}', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert("Your account has been deleted");
          window.open('/', '_self');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  removeFavorite() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .delete(
        `https://myflixapplication.herokuapp.com/users/${user}/movies/${movie._id}`, {}, { 
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
            alert(`Removed from Favorites List`)
          })
          .catch(function (error) {
            console.log(error);
          });
      };

  
  render() {
    const { FavoriteMovies } = this.state;
    const { movies } = this.props;
    const { UsernameError, PasswordError, EmailError, BirthdayError } = this.state;
    console.log(movies)
    const favoriteMovieList = movies.filter((movie) => {
      return FavoriteMovies.includes(movie._id);
    });
    console.log(favoriteMovieList)
    return (
      <Container className="profile-view">
        <h1 className="text-center mt-4">User Profile</h1>

        <h4 className="mt-4 text-center">Favorite Movies</h4>
        {FavoriteMovies.length === 0 && <p className="text-center mt-3">You have not added any movies to your list of favorites yet!</p>}
        <Row>    
            {favoriteMovieList.length > 0 &&
              favoriteMovieList.map((movie) => {
                return (
                  <Col key={movie._id}>
                  <Link to={`/movies/${movie._id}`}>
                    <Card className="profile-view_movie-card">
                      <Card.Img variant="top" className="mx-auto" src={movie.ImagePath} />
                      <Card.Body>
                        <Card.Title className="text-decoration-none">
                          <h5 className="movie-card_title">{movie.Title}</h5>
                        </Card.Title>
                        <div className="mt-3">
                          <Button
                                  className="rem-fav"
                                  value={movie._id} onClick={(e) => this.removeFavorite(e, movie)}
                                >
                                  + Remove from Favs
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
                );
              })}
          
          </Row>

        <h4 className="mt-5 text-center">Update User Information</h4>
        <Form className="profile-form mb-5">
          <Row className="profile-row mt-4">
            <Col className="profile-form_label">
              <Form.Label>Username</Form.Label>
            </Col>
            <Col>
              {Object.keys(UsernameError).map((key) => {
                return (
                  <div className="form-validation-error" key={key}>
                    {UsernameError[key]}
                  </div>
                );
              })}
               <Form.Control
                required
                type="text"
                placeholder={this.state.Username}
                onChange={this.onUsernameChange} />
            </Col>
          </Row>
          <Row className="profile-row mt-3">
            <Col className="profile-form_label">
              <Form.Label>Email</Form.Label>
            </Col>
            <Col>
              {Object.keys(EmailError).map((key) => {
                return (
                  <div className="form-validation-error" key={key}>
                    {EmailError[key]}
                  </div>
                );
              })}
               <Form.Control
                required
                type="text"
                placeholder={this.state.Email}
                onChange={this.onEmailChange} />
            </Col>
          </Row>
          <Row className="profile-row mt-3">
            <Col className="profile-form_label">
              <Form.Label>Password</Form.Label>
            </Col>
            <Col>
              {Object.keys(PasswordError).map((key) => {
                return (
                  <div className="form-validation-error" key={key}>
                    {PasswordError[key]}
                  </div>
                );
              })}
               <Form.Control
                required
                type="text"
                placeholder={this.state.Password}
                onChange={this.onPasswordChange} />
            </Col>
          </Row>
          <Row className="profile-row mt-3">
            <Col className="profile-form_label">
              <Form.Label>Birthday</Form.Label>
            </Col>
            <Col>
              {Object.keys(BirthdayError).map((key) => {
                return (
                  <div className="form-validation-error" key={key}>
                    {BirthdayError[key]}
                  </div>
                );
              })}
              <Form.Control
                required
                type="date"
                defaultValue={this.state.Birthday}
                onChange={this.onBirthdayChange} />
            </Col>
          </Row>
          <Form.Group className="profile-form_buttons text-center mt-4">
            <Button type="button" variant="secondary" className="profile-btn mr-5" onClick={this.handleUpdateUser}>
              Update Information
            </Button>
            <Button type="button" variant="danger" className="profile-btn-2" onClick={this.handleDeleteUser}>Delete Account</Button>
          </Form.Group>
        </Form>
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