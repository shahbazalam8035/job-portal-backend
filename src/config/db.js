import mongoose from 'mongoose';
import { Pool } from 'pg';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
  }
};

 const pgPool = new Pool({
  connectionString: process.env.POSTGRES_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectPostgres = async () => {
  try {
    await pgPool.connect();
    console.log('PostgreSQL Connected');
  } catch (err) {
    console.error('PostgreSQL Connection Error:', err);
  }
};

export { connectMongo, connectPostgres, pgPool };