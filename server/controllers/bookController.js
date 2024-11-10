// server/controllers/bookController.js
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

exports.addBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const userId = req.user.id; // Ensure user ID is extracted from the authenticated token

    // Create a new book entry
    const newBook = new Book({
      title,
      author,
      description,
      owner: userId,
      available: true,
    });

    // Save the new book to the database
    const savedBook = await newBook.save();

    // Find the user by ID and update their booksOwned array
    await User.findByIdAndUpdate(
      userId,
      { $push: { booksOwned: savedBook._id } },
      { new: true } // Returns the updated document
    );

    res.status(201).json({ message: 'Book added successfully', book: savedBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

