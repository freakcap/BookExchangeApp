import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import apiService from '../services/apiService';
import Modal from '../components/Modal';
import EditBookForm from '../components/EditBookForm';
import AddBookForm from '../components/AddBookForm';

const MyBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddBookModalOpen, setAddBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setAddBookModalOpen(true);
  }

  useEffect(() => {
    const fetchOwnedBooks = async () => {
      const response = await apiService.fetchOwnedBooks();
      setBooks(response.data);
    };
    fetchOwnedBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      await apiService.deleteBook(bookId);
      alert('Book deleted successfully');
      window.location.reload(); 
    } catch (error) {
      alert('Deletion failed');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = searchTerm == '' ? books : books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.isin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-page">
      <h2>Your Books</h2>
      <button className="add-book-button" onClick={handleAddClick}>Add Book</button>
      &nbsp; &nbsp;
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="books-container">
        {filteredBooks && filteredBooks.length > 0 && filteredBooks.map(book => (
          <div className="book-card" key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>ISIN: {book.isin}</p>
            <p>Owner: {book.owner.name}</p>
            <p>Description: {book.description}</p>
            <button onClick={() => handleEditClick(book)}>Edit</button>
            &nbsp; &nbsp;
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <EditBookForm book={selectedBook} />
      </Modal>
      <Modal isOpen={isAddBookModalOpen} onClose={() => setAddBookModalOpen(false)}>
        <AddBookForm />
      </Modal>
    </div>
  );
};

export default MyBooksPage;
