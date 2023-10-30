import express from 'express';
import { addBook, listBooks, updateBook , deleteBook } from './bookService.js';

const router = express.Router();

// List all books
router.get('/api/books', async (req, res) => {
  try {
    const books = await listBooks();
    res.json(books);
  } catch (err) {
    console.error('Error listing books:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new book
router.post('/api/books', async (req, res) => {
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
router.put('/api/books/:bookId', async (req, res) => {
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
router.delete('/api/books/:bookId', async (req, res) => {
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
