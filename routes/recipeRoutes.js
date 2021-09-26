// import express from 'express';
// import fetch from 'node-fetch';
const express = require('express');
// const fetch = require('node-fetch');
const axios = require('axios');

const router = express.Router();

const getIngredients = async () => {
    try {
        const ingredientsInfo = await axios(
            'https://world.openfoodfacts.org/ingredients.json'
        );
        const data = await ingredientsInfo.json();
        const ingredients = data.tags
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
        const { search } = req.body;
        const recipes = await axios(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=fb7c210376f8428fbb29a5e78bda5cf0&query=${search}&number=20`
        );
        const data = await recipes.json();
        res.json(data);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get recipe based off of ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await axios(
            `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=fb7c210376f8428fbb29a5e78bda5cf0&includeNutrition=false`
        );
        const data = await recipe.json();
        res.json(data);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get random recipes
router.post('/random', async (req, res) => {
    try {
        const { amount, tags } = req.body;
        const recipes = await axios(
            `https://api.spoonacular.com/recipes/random?apiKey=fb7c210376f8428fbb29a5e78bda5cf0&number=${amount}&tags=${tags}`
        );
        const data = await recipes.json();
        res.json(data.recipes);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

// Get recipes based on ingredients
router.post('/findByIngredients', async (req, res) => {
    try {
        const { ingredients, amount } = req.body;
        const recipes = await axios(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=fb7c210376f8428fbb29a5e78bda5cf0&ingredients=${ingredients}&number=${amount}`
        );
        const data = await recipes.json();
        res.json(data);
    } catch (err) {
        res.json({ msg: 'Server error' });
    }
});

module.exports = router;
// export default router;

// import express from 'express';
// import fetch from 'node-fetch';
// const express = require('express');
// const fetch = require('node-fetch');

// const router = express.Router();

// const getIngredients = async () => {
//     try {
//         const ingredientsInfo = await fetch(
//             'https://world.openfoodfacts.org/ingredients.json'
//         );
//         const data = await ingredientsInfo.json();
//         const ingredients = data.tags
//             .map((ingredient) => ingredient.name)
//             .filter((ingredient) => !ingredient.includes('-'))
//             .filter((ingredient) => !ingredient.includes(':'));
//         return ingredients;
//     } catch (err) {
//         return {};
//     }
// };

// const ingredients = getIngredients();

// // Get all ingredients
// router.get('/getAllIngredients', async (req, res) => {
//     try {
//         const data = await ingredients;
//         res.json(data);
//     } catch (err) {
//         res.json({ msg: 'Server error' });
//     }
// });

// // Search recipes
// router.post('/', async (req, res) => {
//     try {
//         const { query, cuisine, type, diet, amount } = req.body;
//         const recipes = await fetch(
//             `https://api.spoonacular.com/recipes/complexSearch?apiKey=9c220663160041f38ec55a6cfaddc642&query=${query}&cuisine=${cuisine}&type=${type}&diet=${diet}&number=${amount}`
//         );
//         const data = await recipes.json();
//         res.json(data);
//     } catch (err) {
//         res.json({ msg: 'Server error' });
//     }
// });

// // Get recipe based off of ID
// router.get('/:id', async (req, res) => {
//     try {
//         const recipe = await fetch(
//             `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=9c220663160041f38ec55a6cfaddc642&includeNutrition=false`
//         );
//         const data = await recipe.json();
//         res.json(data);
//     } catch (err) {
//         res.json({ msg: 'Server error' });
//     }
// });

// // Get random recipes
// router.post('/random', async (req, res) => {
//     try {
//         const { amount, tags } = req.body;
//         const recipes = await fetch(
//             `https://api.spoonacular.com/recipes/random?apiKey=9c220663160041f38ec55a6cfaddc642&number=${amount}&tags=${tags}`
//         );
//         const data = await recipes.json();
//         res.json(data.recipes);
//     } catch (err) {
//         res.json({ msg: 'Server error' });
//     }
// });

// // Get recipes based on ingredients
// router.post('/findByIngredients', async (req, res) => {
//     try {
//         const { ingredients, amount } = req.body;
//         const recipes = await fetch(
//             `https://api.spoonacular.com/recipes/findByIngredients?apiKey=9c220663160041f38ec55a6cfaddc642&ingredients=${ingredients}&number=${amount}`
//         );
//         const data = await recipes.json();
//         res.json(data);
//     } catch (err) {
//         res.json({ msg: 'Server error' });
//     }
// });

// // Get similar recipes

// // export default router;
// module.exports = router;
