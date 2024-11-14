const Request = require('../models/Request');
const Book = require('../models/Book');

exports.requestBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    // Check if the book is available
    const book = await Book.findById(bookId);
    if (!book || !book.available) {
      return res.status(400).json({ error: 'Book is not available' });
    }

    const newRequest = new Request({
      book: bookId,
      requester: userId,
      owner: book.owner,
      status: 'Pending'
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request sent successfully', request: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send request' });
  }
};

exports.viewRequests = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch requests where the user is the owner
      const requests = await Request.find({ owner: userId }).populate('book requester', 'title name');
      res.status(200).json(requests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch requests' });
    }
  };
  
  exports.updateRequestStatus = async (req, res) => {
    try {
      const { requestId, status } = req.body;
      if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
  
      const request = await Request.findById(requestId);
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      if (req.user.id !== String(request.owner)) {
        return res.status(403).json({ error: 'Unauthorized action' });
      }
  
      request.status = status;
      await request.save();
  
      if (status === 'Approved') {
        const book = await Book.findById(request.book);
        book.available = false;
        await book.save();
      }
  
      res.status(200).json({ message: 'Request status updated', request });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update request status' });
    }
  };

exports.getAllUserRequests = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authentication middleware

    // Fetch all requests where the user is the requester or the owner
    const requests = await Request.find({
      $or: [{ requester: userId }, { owner: userId }]
    })
    .populate('book')
    .populate('requester', 'username') // Populate only relevant fields
    .populate('owner', 'username');

    res.status(200).json({ requests });
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  