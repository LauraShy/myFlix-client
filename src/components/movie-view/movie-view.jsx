import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";

import logo from './myflix-logo.png';
import './movie-view.scss'

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return(
      <div className="movie-view">
        <div>
          <img src={logo} className="logo"></img>
        </div>
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

