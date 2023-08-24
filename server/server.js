const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://database:27017/simple_mean_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
});

const Book = mongoose.model('Book', bookSchema);

// CRUD operations
app.post('/api/books', async (req, res) => {
  const book = new Book(req.body);
  try {
    const savedBook = await book.save();
    res.json(savedBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    res.json(deletedBook);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Serve Angular frontend
app.use(express.static(path.join(__dirname, 'dist', 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'client', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server up: http://localhost:${port}`);
});








// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const path = require('path');

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/simple_mean_app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define the book schema
// const bookSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   pages: Number,
// });

// const Book = mongoose.model('Book', bookSchema);

// // CRUD operations
// app.post('/api/books', async (req, res) => {
//   const book = new Book(req.body);
//   try {
//     const savedBook = await book.save();
//     res.json(savedBook);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get('/api/books', async (req, res) => {
//   try {
//     const books = await Book.find({});
//     res.json(books);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.put('/api/books/:id', async (req, res) => {
//   try {
//     const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedBook);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.delete('/api/books/:id', async (req, res) => {
//   try {
//     const deletedBook = await Book.findByIdAndRemove(req.params.id);
//     res.json(deletedBook);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Serve Angular frontend
// app.use(express.static(path.join(__dirname, '../client/dist/client')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/client', 'index.html'));
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server up: http://localhost:${port}`);
// });
