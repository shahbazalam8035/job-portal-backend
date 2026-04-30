const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { connectMongo, connectPostgres } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect databases
connectMongo();
connectPostgres();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});