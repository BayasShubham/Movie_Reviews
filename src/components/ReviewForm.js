// src/components/ReviewForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/App.css';

function ReviewForm() {
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (review.trim() === '') {
      setError('Review cannot be empty');
      return;
    }

    // Here you would usually send the review to a backend server or some state management
    console.log('Review submitted:', review);
    setError('');
    setReview('');
    navigate('/'); // Redirect to movie list or other relevant page
  };

  return (
    <div className="container">
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Back to Movie List</Link>
    </div>
  );
}

export default ReviewForm;
