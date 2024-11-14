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

