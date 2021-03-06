import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import  Header  from '../header/header';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss'

// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

// #2 export keyword won't be used here
class MainView extends React.Component {

  constructor(){
    super();
    // #3 movies state removed from here
    this.state = {
      user: null,
      selectedMovie: null,
      register: null
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
  }
}

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // GET MOVIES REQUEST
  getMovies(token) {
    axios.get('https://myflixapplication.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // #4 remove state here
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // GET USERS REQUEST
  getUsers(token) {
    axios.post('https://myflixapplication.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    let { user } = this.state;

    /* if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />; */

    return (
      <Router>
        <Header user={user} />
        <Row className="main-view justify-content-md-center">

        {/* MAIN VIEW PATH */}  
        <Route exact path="/" id='mainview' render={() => {
          if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6 update pat to MoviesList and remove map
            return <MoviesList movies={movies}/>;
          }} />

          {/* REGISTER VIEW PATH */}
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          {/* MOVIE VIEW PATH */}
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* PROFILE VIEW PATH */}
          <Route path="/users/:Username" render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            if (movies.length === 0) return <div className="main-view" />;
            return <>
              <Col lg={8} md={12}>
                <ProfileView user={user} history={history} movies={movies} onBackClick={() => history.goBack()} />
              </Col>
              
            </>
          }} />


          {/* GENRE VIEW PATH */}
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* DIRECTOR VIEW PATH */}
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

// #7
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #8 update export to include connect, mapStateToProps (any time the store is updated, this function will be called), and so on
export default connect(mapStateToProps, { setMovies } )(MainView);