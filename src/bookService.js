import express from 'express';
import { router } from './bookRoutes.js'; 
import { getClient } from './databaseConnection.js';
import { ObjectId } from 'mongodb';

const services = express();

services.use(express.json());
services.use('/', router);

// Http calls

 export async function listBooks(){
    const client =await getClient();
    try {
      const database = client.db('BookManagementDB'); 
      const collection = database.collection('BookManagementCollections');
      const result = await collection.find({}).toArray();
      console.log(`Book Records Received`);
      return result;
    } catch (err) {
      console.error('Error listing books:', err);
      throw err;
    } finally{
      client.close();
    }
  }

  export async function addBook(newBook){
    const client =await getClient();
    try {
      const database = client.db('BookManagementDB'); 
      const collection = database.collection('BookManagementCollections');
      const result = await collection.insertOne(newBook);
      console.log(`Book Record Inserted`);
      return result;
    } catch (err) {
      console.error('Error inserting book:', err);
      throw err;
    } finally{
      client.close();
    }
  }

  export async function updateBook(bookId, updatedBook){
    const client =await getClient();
    try {
      const database = client.db('BookManagementDB'); 
      const collection = database.collection('BookManagementCollections');
      const filter = { _id: new ObjectId(bookId) };
      const update = { $set: updatedBook };
      const result = await collection.updateOne(filter, update);
      return result;
    } catch (err) {
      console.error('Error updating a book:', err);
      throw err;
    } finally {
      client.close();
    }
  }

  export async function deleteBook(bookId){
    const client =await getClient();
    try {
      const database = client.db('BookManagementDB'); 
      const collection = database.collection('BookManagementCollections');
      const filter = { _id: new ObjectId(bookId) };
      const result = await collection.deleteOne(filter);
      return result;
    } catch (err) {
      console.error('Error deleting a book:', err);
      throw err;
    } finally {
      client.close();
    }
  }

// server starter
const port = process.env.PORT || 8000;
services.listen(port, () => {
    console.log(`services started on port ${8000}`);
})

