import React, { useState } from 'react';
import '../styles/AddBookPage.css';
import apiService from '../services/apiService';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isin, setIsin] = useState('');
  const [description, setDescription] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await apiService.addBook({ title, author, isin, description });
      alert('Book added successfully');
      window.location.href = '/my-books'; 
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
        <input
          type="text"
          placeholder="ISIN"
          value={isin}
          onChange={(e) => setIsin(e.target.value)}
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

export default AddBookForm;
