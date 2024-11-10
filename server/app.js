require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

console.log("first");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

console.log("second");

// Import and use routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const requestRoutes = require('./routes/requests');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/requests', requestRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("third");
