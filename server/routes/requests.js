const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const verifyToken = require("../middlewares/authMiddleware");

router.post('/request', verifyToken, requestController.requestBook);
router.get('/owner', verifyToken, requestController.viewRequests);
router.patch('/update', verifyToken, requestController.updateRequestStatus);
router.get('/user-requests', verifyToken, requestController.getAllUserRequests);

module.exports = router;
