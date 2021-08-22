import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { 
          _id: 1, 
          Title: 'Harry Potter',
          Description: 'Harry Potter is a film series based on the eponymous novels by J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films',
          Genre: 'Fantasy',
          Director: 'Chris Columbus',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Harry-film-logo.png'
        },
        { 
          _id: 2, 
          Title: 'Avengers',
          Description: 'The director of the agency S.H.I.E.L.D., Nick Fury, sets in motion project Avengers, joining the Iron Man, Captain America, The Hulk, Thor, Black Widow, and Hawkeye, to save the world from the powerful Loki and the alien invasion.',
          Genre: 'Superhero',
          Director: 'Joss Whedon',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg'
        },
        { 
          _id: 3, 
          Title: 'Fantastic Beasts',
          Description: 'A spinoff and prequel to Harry Potter- The adventures of writer Newt Scamander in New Yorks secret community of witches and wizards seventy years before Harry Potter reads his book in school.',
          Genre: 'Fantasy',
          Director: 'David Yates',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Fantastic_Beasts_and_Where_to_Find_Them_poster.png'
        },
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({ selectedMovie: newSelectedMovie });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}

export default MainView;