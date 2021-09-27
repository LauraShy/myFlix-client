import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import axios from 'axios';

import './movie-view.scss'

export class MovieView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios
      .post(
        `https://myflixapplication.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, { //I've tried a few versions of this link
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
            alert(`Added to Favorites List`)
          })
          .catch(function (error) {
            console.log(error);
          });
      };

  render() {
    const { movie, onBackClick } = this.props;

    return(
      <div className="movie-view mb-5">
        <div className="movie-poster mt-3">
          <img src={movie.ImagePath} className="movie-img" />
        </div>
        <div className="movie-title mt-3">
          <span className="label h1">Title: </span>
          <span className="value h1">{movie.Title}</span>
        </div>
        <div className="movie-description mt-2">
          <span className="label h5">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="mt-3">
          <Button
                  className="fav-btn"
                  value={movie._id} onClick={(e) => this.addFavorite(e, movie)}
                >
                  + Add To Favorites
          </Button>
        </div>
        <h5 className="mt-5">More About {movie.Title}</h5>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Button className="mt-4" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    ); 
  }
}

MovieView.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
}

