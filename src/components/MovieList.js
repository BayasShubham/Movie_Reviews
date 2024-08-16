import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies, onDelete }) => {
  return (
    <div className="container">
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <div>
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              <Link to={`/movies/${movie.id}`}>View Details</Link>
              <button onClick={() => onDelete(movie.id)}>Delete Movie</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/add-movie" className="add-movie-link">Add Movie</Link>
    </div>
  );
};

export default MovieList;
