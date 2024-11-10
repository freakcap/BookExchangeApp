import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddBookPage.css';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/books/add', { title, author, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Book added successfully');
      window.location.href = '/'; // Redirect to main page
    } catch (error) {
      alert('Failed to add book');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add Book</h2>
      <form onSubmit={handleAddBook} className="add-book-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;