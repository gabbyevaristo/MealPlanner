import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import usersRoutes from './backend/routes/usersRoutes.js';
import recipeRoutes from './backend/routes/recipeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize middleware
app.use(cors());
app.use(express.json());

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('CONNECTED TO DATABASE')
);

// Add routes
app.use('/users', usersRoutes);
app.use('/recipe', recipeRoutes);

const __dirname = dirname(fileURLToPath(import.meta.url));
// const buildPath = path.join(__dirname, 'client/build');
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log('SERVER RUNNING'));
