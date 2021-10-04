const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Load all ingredients when app first begins
const getIngredients = async () => {
    try {
        const ingredientsInfo = await axios.get(
            'https://world.openfoodfacts.org/ingredients.json'
        );

        const ingredients = ingredientsInfo.data.tags
            .map((ingredient) => ingredient.name)
            .filter((ingredient) => !ingredient.includes('-'))
            .filter((ingredient) => !ingredient.includes(':'));

        return ingredients;
    } catch (err) {
        return {};
    }
};

const ingredients = getIngredients();

// Get all ingredients
router.get('/getAllIngredients', async (req, res) => {
    try {
        const data = await ingredients;
        res.json(data);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Search recipes
router.post('/', async (req, res) => {
    try {
        const { query, cuisine, type, diet, amount } = req.body;

        const recipes = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_KEY}&query=${query}&cuisine=${cuisine}&type=${type}&diet=${diet}&number=${amount}`
        );

        res.json(recipes.data);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get recipe based off of ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await axios.get(
            `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.SPOONACULAR_KEY}&includeNutrition=false`
        );

        res.json(recipe.data);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get random recipes
router.post('/random', async (req, res) => {
    try {
        const { amount, tags } = req.body;

        const recipes = await axios.get(
            `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_KEY}&number=${amount}&tags=${tags}`
        );

        res.json(recipes.data.recipes);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get recipes based on ingredients
router.post('/findByIngredients', async (req, res) => {
    try {
        const { ingredients, amount } = req.body;

        const recipes = await axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.SPOONACULAR_KEY}&ingredients=${ingredients}&number=${amount}`
        );

        res.json(recipes.data);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

module.exports = router;
