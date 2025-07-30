import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhook.js';

// Initailize Express
const app = express();

// Connect MongoDB
await connectDB()

// Middlewares
app.use(cors());

app.get('/', (req, res) => res.send("API Running"));
app.post('/clerk', express.json(), clerkWebhooks);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});