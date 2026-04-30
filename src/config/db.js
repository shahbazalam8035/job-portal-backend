const mongoose = require('mongoose');
const { Pool } = require('pg');

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
  }
};

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const connectPostgres = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL Connected');
  } catch (err) {
    console.error('PostgreSQL Connection Error:', err.message);
  }
};

module.exports = { connectMongo, connectPostgres, pool };