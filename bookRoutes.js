import express from 'express';
import { addBook, getBookByBookId, getAllBooks, updateBook , deleteBook } from './bookService.js';

const router = express.Router();

// List all books
router.get('/', async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    console.error('Error listing books:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// list book by id
router.get('/:bookId', async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const books = await getBookByBookId(bookId);
    res.json(books);
  } catch (err) {
    console.error('Error listing books:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  const newBook = req.body;
  try {
    const result = await addBook(newBook);
    res.status(201).json({ message: 'Book added successfully', insertedCount: result.insertedCount });
  } catch (err) {
    console.error('Error adding a book:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a book
router.put('/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  const updatedBook = req.body;
  try {
    // Implement the updateBook function in service.js
    const result = await updateBook(bookId, updatedBook);
    res.json({ message: 'Book updated successfully', modifiedCount: result.modifiedCount });
  } catch (err) {
    console.error('Error updating a book:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a book
router.delete('/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  try {
    // Implement the deleteBook function in service.js
    const result = await deleteBook(bookId);
    res.json({ message: 'Book deleted successfully', deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error deleting a book:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export { router };
