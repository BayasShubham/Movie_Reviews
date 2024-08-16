import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = ({ movies, onUpdate }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === parseInt(id));

  const [reviews, setReviews] = useState(movie ? movie.reviews || [] : []);
  const [newReview, setNewReview] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editReview, setEditReview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editIndex !== null) {
      setEditReview(reviews[editIndex]);
    }
  }, [editIndex, reviews]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      const updatedMovie = { ...movie, reviews: [...reviews, newReview] };
      setReviews(updatedMovie.reviews);
      onUpdate(movie.id, updatedMovie);
      setNewReview('');
      setError('');
    } else {
      setError('Review cannot be empty');
    }
  };

  const handleEditReview = (index) => {
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    if (editReview.trim()) {
      const updatedReviews = reviews.map((review, index) =>
        index === editIndex ? editReview : review
      );
      const updatedMovie = { ...movie, reviews: updatedReviews };
      setReviews(updatedReviews);
      onUpdate(movie.id, updatedMovie);
      setEditIndex(null);
      setEditReview('');
      setError('');
    } else {
      setError('Review cannot be empty');
    }
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    const updatedMovie = { ...movie, reviews: updatedReviews };
    setReviews(updatedReviews);
    onUpdate(movie.id, updatedMovie);
  };

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container">
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <h2>Reviews</h2>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <li key={index}>
              {editIndex === index ? (
                <div>
                  <textarea
                    value={editReview}
                    onChange={(e) => setEditReview(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                </div>
              ) : (
                <div>
                  <p>{review}</p>
                  <button onClick={() => handleEditReview(index)}>Edit</button>
                  <button onClick={() => handleDeleteReview(index)}>Delete</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>No reviews yet.</li>
        )}
      </ul>
      <form onSubmit={handleAddReview} className="review-form">
        <textarea
          placeholder="Add your review here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          required
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Add Review</button>
      </form>
      <Link to="/">Back to Movie List</Link>
    </div>
  );
};

export default MovieDetail;
