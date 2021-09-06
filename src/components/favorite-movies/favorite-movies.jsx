import React from 'react';

// React-Bootstrap components
import { Button, Card, Row, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './favorite-movies.scss';

export class FavoriteMovies extends React.Component {
  constructor(props) {
    super(props);
  }

  // DELETE request to remove a movie from favorites list
  removeFavorite(movie) {
    let username = localStorage.getItem('user');
    axios
      .delete(`https://myflixapplication.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
    // .then(() => window.location.reload());
  }

  render() {
    const favoriteMovies = this.props.user.FavoriteMovies;
    const { movies } = this.props;

    return (
      <div className="text-light">Favorite Movies- confused how to set this up</div>
    );
  }
}


export default FavoriteMovies;