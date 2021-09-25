import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import usersRoutes from './routes/usersRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize middleware
app.use(cors());
app.use(express.json());

// Add routes
app.use('/users', usersRoutes);
app.use('/recipe', recipeRoutes);

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('CONNECTED TO DATABASE')
);

app.listen(PORT, () => console.log('SERVER RUNNING'));
