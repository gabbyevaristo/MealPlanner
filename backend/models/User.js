import mongoose from 'mongoose';

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
            type: Object,
            default: {},
        },
        savedRecipes: {
            type: Array,
            default: [],
        },
        shoppingList: {
            type: Object,
            default: {},
        },
    },
    { minimize: false }
);

export default mongoose.model('User', UserSchema);
