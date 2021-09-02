import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;
    console.log(director)
    return (
      
      <div className="director-view mt-5">
        <h1>Director</h1>
        <div className="director-name mt-3">
          <h2>
            <span className="value">{director.Name}</span>
          </h2>
        </div>
        <div className="director-bio mt-2">
          <span className="value">Bio: {director.Bio}</span>
        </div>

        <div className="director-birthdate mt-2">
          <span className="value">Birthyear: {director.Birth}</span>
        </div>

        <Button variant="primary mt-3" onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
    );
  }
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birthdate: propTypes.instanceOf(Date),
  }).isRequired
};