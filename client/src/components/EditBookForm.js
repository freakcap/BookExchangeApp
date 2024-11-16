import React, { useState } from 'react';
import '../styles/AddBookPage.css';
import apiService from '../services/apiService';

const EditBookForm = ({ book }) => {
  
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [isin, setIsin] = useState(book.isin || '');
  const [description, setDescription] = useState(book.description || '');
  const bookId = book._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.editBook({ bookId, title, author, isin, description });
      alert('Book updated successfully');
      window.location.href = '/my-books'; 
    } catch (error) {
      alert('Failed to add book');
      window.location.href = '/my-books'; 
    }
  };

  return (
    <div className="add-book-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
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
        <button type="submit">Edit Book</button>
      </form>
    </div>
  );
};

export default EditBookForm;

