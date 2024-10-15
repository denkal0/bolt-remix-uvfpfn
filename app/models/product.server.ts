import { connectToDatabase } from '~/lib/db.server';
import { ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export async function getAllProducts() {
  const db = await connectToDatabase();
  return db.collection('products').find().toArray();
}

export async function getProductById(id: string) {
  const db = await connectToDatabase();
  return db.collection('products').findOne({ _id: new ObjectId(id) });
}

export async function createProduct(product: Omit<Product, '_id'>) {
  const db = await connectToDatabase();
  const result = await db.collection('products').insertOne(product);
  return { id: result.insertedId, ...product };
}