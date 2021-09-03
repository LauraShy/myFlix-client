import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;
    console.log(genre)
    return (
      <div className="genre-view mt-5">
        <h1>Genre</h1>
        <div className="genre-name mt-3">
          <h3>
            <span className="value">Genre: {genre.Name}</span>
          </h3>
        </div>
        <div className="genre-description">
          <span className="value">Description: {genre.Description}</span>
        </div>

        <Button variant="primary mt-3" onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
    );
  }
}

GenreView.propTypes = {
  genre: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired
  }).isRequired
};
