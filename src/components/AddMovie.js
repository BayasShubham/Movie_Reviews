import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAdd({ title, description });
      navigate('/');
    } else {
      setError('Both fields are required');
    }
  };

  return (
    <div className="container">
      <h1>Add New Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Movie Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
