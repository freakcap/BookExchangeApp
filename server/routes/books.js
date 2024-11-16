const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require("../middlewares/authMiddleware");

router.get('/available', verifyToken, bookController.getAllAvailableBooks);
router.post('/add', verifyToken, bookController.addBook);
router.get('/owned', verifyToken, bookController.getAllOwnedBooks);
router.patch('/update', verifyToken, bookController.editBook);
router.delete('/delete/:id', verifyToken, bookController.deleteBook)

module.exports = router;
