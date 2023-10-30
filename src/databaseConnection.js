
import { MongoClient, ServerApiVersion } from 'mongodb';


const uri = "mongodb+srv://admin:admin@bookmanagementcluster.excqggt.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(err){
    console.log('ERROR: ', err)
  } finally {
    await client.close();
  }
};

async function getClient() {
  try {
    await client.connect();
    return client;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}


export {connectToDatabase, getClient};

