import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhook.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js'

// Initailize Express
const app = express();

// Connect MongoDB
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors());
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => res.send("API Running"));
app.post('/clerk', express.json(), clerkWebhooks);
app.use('/api/educator', express.json(), educatorRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});