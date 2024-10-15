import { connectToDatabase } from '~/lib/db.server';
import bcrypt from 'bcryptjs';

export async function createUser(email: string, password: string) {
  const db = await connectToDatabase();
  const collection = db.collection('users');

  const existingUser = await collection.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await collection.insertOne({ email, password: hashedPassword });
  return { id: result.insertedId, email };
}

export async function verifyLogin(email: string, password: string) {
  const db = await connectToDatabase();
  const collection = db.collection('users');

  const user = await collection.findOne({ email });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return { id: user._id, email: user.email };
}