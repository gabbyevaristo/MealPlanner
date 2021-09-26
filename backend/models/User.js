import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        ownedIngredients: {
            type: Array,
            default: [],
        },
        savedRecipes: {
            type: Array,
            default: [],
        },
        shoppingList: {
            type: Array,
            default: [],
        },
    },
    { minimize: false }
);

export default mongoose.model('User', UserSchema);
// module.exports = mongoose.model('User', UserSchema);
