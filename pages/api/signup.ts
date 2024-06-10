// pages/api/signup.js
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const clientPromise = MongoClient.connect(process.env.MONGODB_URI);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection('users').insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'User created' });
};
