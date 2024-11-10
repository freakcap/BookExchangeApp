const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require("../middlewares/authMiddleware");

router.get('/available', verifyToken, bookController.getAllAvailableBooks);
router.post('/add', verifyToken, bookController.addBook);

module.exports = router;
