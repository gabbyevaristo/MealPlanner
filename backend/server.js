import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import usersRoutes from './routes/usersRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize middleware
const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
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
