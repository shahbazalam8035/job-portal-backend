import dotenv from "dotenv"
dotenv.config();

import app from "./app.js"
import { connectMongo, connectPostgres } from './config/db.js';

const PORT = process.env.PORT || 5000;
console.log('POSTGRES_URI =>', process.env.POSTGRES_URI);

// Connect databases
connectMongo();
connectPostgres();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});