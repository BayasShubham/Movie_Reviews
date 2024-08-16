import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import AddMovie from './components/AddMovie';
import './styles/App.css';

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    setMovies(savedMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleAddMovie = (newMovie) => {
    setMovies([...movies, { ...newMovie, id: movies.length + 1, reviews: [] }]);
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleUpdateMovie = (id, updatedMovie) => {
    setMovies(movies.map(movie => movie.id === id ? updatedMovie : movie));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList movies={movies} onDelete={handleDeleteMovie} />} />
        <Route path="/movies/:id" element={<MovieDetail movies={movies} onUpdate={handleUpdateMovie} />} />
        <Route path="/add-movie" element={<AddMovie onAdd={handleAddMovie} />} />
      </Routes>
    </Router>
  );
};

export default App;
