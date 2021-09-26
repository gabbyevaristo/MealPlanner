// import express from 'express';
// import path from 'path';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// import usersRoutes from './routes/usersRoutes.js';
// import recipeRoutes from './routes/recipeRoutes.js';
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const usersRoutes = require('./routes/usersRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');

const app = express();
app.enable('trust proxy');

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

app.use(function (req, res, next) {
    if (
        req.get('X-Forwarded-Proto') != 'https' &&
        req.get('X-Forwarded-Port') != '443'
    ) {
        return res.redirect(
            ['https://', req.get('Host'), req.baseUrl].join('')
        );
    }
    next();
});

// const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = path.join(__dirname, 'client/build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log('SERVER RUNNING'));
