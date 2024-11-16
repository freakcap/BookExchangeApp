const Book = require('../models/Book');
const User = require('../models/User');

exports.getAllAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({ available: true }).populate('owner', 'name');
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getAllOwnedBooks = async (req, res) => {
  try {
    const userId = req.user.id; 
    const books = await Book.find({ owner: userId }).populate('owner', 'name');
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, isin, description } = req.body;
    const userId = req.user.id; 

    const newBook = new Book({
      title,
      author,
      isin,
      description,
      owner: userId,
      available: true,
    });

    const savedBook = await newBook.save();

    // Find the user by ID and update their booksOwned array
    await User.findByIdAndUpdate(
      userId,
      { $push: { booksOwned: savedBook._id } },
      { new: true } 
    );

    res.status(201).json({ message: 'Book added successfully', book: savedBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { bookId, title, author, isin, description } = req.body;
    const userId = req.user.id; 

    const book = await Book.findById(bookId);

    if (userId !== String(book.owner)) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    book.title = title;
    book.author = author;
    book.isin = isin;
    book.description = description;

    await book.save();

    res.status(201).json({ message: 'Book updated successfully', book: book });
  } catch (error) {
    console.error('Error updating` book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    console.log("deleting");
    const bookId = req.params.id;
    const userId = req.user.id; 

    const book = await Book.findById(bookId);

    if (userId !== String(book.owner)) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    await book.deleteOne();

    res.status(201).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


