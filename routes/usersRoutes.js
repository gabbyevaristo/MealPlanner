import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Get all users
router.get('/getUsers', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Get a specific user
router.get('/getUser', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            throw new Error(`User with ID: ${req.user.id} does not exist`);
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Register a user
router.post('/registerUser', async (req, res) => {
    try {
        const { name, email, password, confirmedPassword } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(400).json({ msg: `EMAIL_EXISTS` });
            return;
        }
        if (password !== confirmedPassword) {
            res.status(400).json({ msg: 'MISMATCHED_PWDS' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        const token = await jwt.sign(
            { id: savedUser._id.toString() },
            process.env.JWT_SECRET
        );
        res.json({
            token,
            userData: {
                id: savedUser._id.toString(),
                name: savedUser.name,
                ownedIngredients: savedUser.ownedIngredients,
                savedRecipes: savedUser.savedRecipes,
                shoppingList: savedUser.shoppingList,
            },
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Login user
router.post('/loginUser', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                const token = await jwt.sign(
                    { id: user._id.toString() },
                    process.env.JWT_SECRET
                );
                res.json({
                    token,
                    userData: {
                        id: user._id.toString(),
                        name: user.name,
                        ownedIngredients: user.ownedIngredients,
                        savedRecipes: user.savedRecipes,
                        shoppingList: user.shoppingList,
                    },
                });
            } else {
                throw new Error(`Wrong email or password`);
            }
        } else {
            throw new Error(`Wrong email or password`);
        }
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Delete user
router.delete('/deleteUser', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            throw new Error(`User with ID: ${req.user.id} does not exist`);
        }
        const removedUser = await User.deleteOne({
            _id: req.user.id,
        });
        res.json(removedUser);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Edit password

// Get user's ingredients
router.get('/getIngredients', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const ingredients = user.ownedIngredients;
        res.json(ingredients);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Add to ingredients list
router.put('/addIngredient', auth, async (req, res) => {
    try {
        const { ingredient } = req.body;
        const updatedUser = await User.updateOne(
            { _id: req.user.id },
            {
                $addToSet: {
                    ownedIngredients: [ingredient],
                },
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Remove from ingredients list
router.put('/deleteIngredient', auth, async (req, res) => {
    try {
        const { ingredient } = req.body;
        const updatedUser = await User.updateOne(
            { _id: req.user.id },
            {
                $pull: {
                    ownedIngredients: ingredient,
                },
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Get user's saved recipes
router.get('/getRecipes', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const savedRecipes = user.savedRecipes;
        res.json(savedRecipes);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Add to saved recipes
router.put('/addRecipe', auth, async (req, res) => {
    try {
        const { recipeId } = req.body;
        const updatedUser = await User.updateOne(
            { _id: req.user.id },
            {
                $addToSet: {
                    savedRecipes: [recipeId],
                },
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Remove from saved recipes
router.put('/deleteRecipe', auth, async (req, res) => {
    try {
        const { recipeId } = req.body;
        const updatedUser = await User.updateOne(
            { _id: req.user.id },
            {
                $pull: {
                    savedRecipes: recipeId,
                },
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Get user shopping list
router.get('/getShoppingList', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const shoppingList = user.shoppingList;
        res.json(shoppingList);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Add to shopping list
router.put('/addShoppingList', auth, async (req, res) => {
    try {
        const { item } = req.body;
        const updatedUser = await User.updateOne(
            { _id: req.user.id },
            {
                $addToSet: {
                    shoppingList: [item],
                },
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Remove from shopping list
router.put('/deleteShoppingList', auth, async (req, res) => {
    try {
        const { item } = req.body;
        const updatedUser = await User.updateOne(
            { _id: req.user.id },
            {
                $pull: {
                    shoppingList: item,
                },
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

export default router;
