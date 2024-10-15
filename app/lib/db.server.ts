import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://670e10e0465239f20af063e7-prod:2a95c30056889f1d872bfd86f587c0@670e10e0465239f20af063e7.kjm0cyv.mongodb.net/670e10e0465239f20af063e7-prod';

let client: MongoClient;

export async function connectToDatabase() {
  if (client) {
    return client.db();
  }

  try {
    client = await MongoClient.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return client.db();
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    console.log('Closed MongoDB connection');
  }
}