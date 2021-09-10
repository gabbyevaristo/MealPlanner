import express from 'express';

const router = express.Router();

// Search recipes
router.get('/', async (req, res) => {
    try {
        const { search } = req.body;
        const user = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=fb7c210376f8428fbb29a5e78bda5cf0&query=${search}&number=20`
        );
        res.json(user);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get recipe based off of ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await fetch(
            `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=fb7c210376f8428fbb29a5e78bda5cf0&includeNutrition=false`
        );
        res.json(recipe);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get random recipes
router.get('/random', async (req, res) => {
    try {
        const { amount, tags } = req.body;
        const recipes = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=fb7c210376f8428fbb29a5e78bda5cf0&number=${amount}&tags=${tags}`
        );
        res.json(recipes);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get recipes based on ingredients
router.get('/random', async (req, res) => {
    try {
        const { ingredients, amount } = req.body;
        const recipes = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=fb7c210376f8428fbb29a5e78bda5cf0&ingredients=${ingredients}&number=${amount}`
        );
        res.json(recipes);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// FOR LATER
// Get recipes based on a certain number of ingredients
// Get similar recipes

export default router;
