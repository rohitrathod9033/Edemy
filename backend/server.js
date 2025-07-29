import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Global Middleware
app.use(cors());

// Routes
app.get('/', (req, res) => res.send("API Working"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});