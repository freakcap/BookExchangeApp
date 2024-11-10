const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  booksOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
});

module.exports = mongoose.model('User', userSchema);
