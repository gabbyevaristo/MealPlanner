// import { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../../../App';
// import RecipeCard from './RecipeCard';
// import './FilteredRecipes.css';

// const FilteredRecipes = () => {
//     const user = useContext(UserContext);
//     const { selectedPantryItems: ingredients } = useParams();

//     const [filteredRecipes, setFilteredRecipes] = useState([]);
//     const [savedRecipes, setSavedRecipes] = useState([]);

//     useEffect(() => {
//         try {
//             const loadFilteredRecipes = async () => {
//                 const res = await fetch(
//                     'http://localhost:5000/recipe/findByIngredients',
//                     {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ ingredients, amount: 9 }),
//                     }
//                 );
//                 const data = await res.json();
//                 setFilteredRecipes(data);
//             };
//             loadFilteredRecipes();
//         } catch (err) {
//             console.log(err);
//         }
//     }, []);

//     useEffect(() => {
//         try {
//             const loadUserRecipes = async () => {
//                 const res = await fetch(
//                     `http://localhost:5000/users/getRecipes/${user.id}`,
//                     {
//                         method: 'GET',
//                     }
//                 );
//                 const data = await res.json();
//                 setSavedRecipes(data);
//             };
//             loadUserRecipes();
//         } catch (err) {
//             console.log(err);
//         }
//     }, []);

//     return (
//         <div className="filtered-recipes">
//             <div className="arrow-to-pantry-container">
//                 <Link to="/home/pantry" className="arrow-to-pantry">
//                     <i className="fa fa-arrow-left fa-lg"></i>
//                 </Link>
//             </div>
//             <div className="filtered-recipes-title">
//                 Recipes with <span>Selected Ingredients</span>
//             </div>
//             {filteredRecipes.length !== 0 && (
//                 <div className="filtered-recipes-container">
//                     {filteredRecipes.map((recipe, index) => {
//                         return (
//                             <div className="filtered-recipe" key={index}>
//                                 <RecipeCard
//                                     recipe={recipe}
//                                     inSavedRecipe={
//                                         savedRecipes.length !== 0
//                                             ? savedRecipes.includes(recipe.id)
//                                             : false
//                                     }
//                                 />
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//             <div className="btn-to-pantry-container">
//                 <Link to="/home/pantry" className="btn-to-pantry">
//                     Go Back
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default FilteredRecipes;

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import RecipeCard from './RecipeCard';
import './FilteredRecipes.css';

const FilteredRecipes = () => {
    const [filteredRecipes, setFilteredRecipes] = useState([
        {
            id: 665620,
            title: 'Zabaglione with Roasted Plums',
            image: 'https://spoonacular.com/recipeImages/665620-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 2,
            missedIngredients: [
                {
                    id: 9279,
                    amount: 12.0,
                    unit: '',
                    unitLong: '',
                    unitShort: '',
                    aisle: 'Produce',
                    name: 'plums',
                    original: '12 Italian plums, halved and pitted',
                    originalString: '12 Italian plums, halved and pitted',
                    originalName: 'Italian plums, halved and pitted',
                    metaInformation: ['italian', 'pitted', 'halved'],
                    meta: ['italian', 'pitted', 'halved'],
                    extendedName: 'italian plums',
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/plum.jpg',
                },
                {
                    id: 1125,
                    amount: 4.0,
                    unit: 'large',
                    unitLong: 'larges',
                    unitShort: 'large',
                    aisle: 'Milk, Eggs, Other Dairy',
                    name: 'egg yolks',
                    original: '4 large egg yolks',
                    originalString: '4 large egg yolks',
                    originalName: 'egg yolks',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/egg-yolk.jpg',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
            likes: 7,
        },
        {
            id: 635315,
            title: 'Blood Orange Margarita',
            image: 'https://spoonacular.com/recipeImages/635315-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    id: 1009206,
                    amount: 1.0,
                    unit: 'cup',
                    unitLong: 'cup',
                    unitShort: 'cup',
                    aisle: 'Beverages',
                    name: 'blood orange juice',
                    original: '1 cup fresh-squeezed blood orange juice',
                    originalString: '1 cup fresh-squeezed blood orange juice',
                    originalName: 'fresh-squeezed blood orange juice',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/blood-orange-juice.jpg',
                },
                {
                    id: 10814037,
                    amount: 8.0,
                    unit: 'ounces',
                    unitLong: 'ounces',
                    unitShort: 'oz',
                    aisle: 'Alcoholic Beverages',
                    name: 'tequila',
                    original: '8 ounces premium tequila-reposada',
                    originalString: '8 ounces premium tequila-reposada',
                    originalName: 'premium tequila-reposada',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/tequila.png',
                },
                {
                    id: 14534,
                    amount: 7.0,
                    unit: 'ounces',
                    unitLong: 'ounces',
                    unitShort: 'oz',
                    aisle: 'Alcoholic Beverages',
                    name: 'triple sec',
                    original: '7 ounces triple sec',
                    originalString: '7 ounces triple sec',
                    originalName: 'triple sec',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/white-rum.jpg',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
            likes: 3,
        },
        {
            id: 635260,
            title: 'Blackcurrant Sauce',
            image: 'https://spoonacular.com/recipeImages/635260-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    id: 14130,
                    amount: 0.5,
                    unit: 'cup',
                    unitLong: 'cups',
                    unitShort: 'cup',
                    aisle: 'Beverages',
                    name: 'creme soda',
                    original: '1/2 cup Creme de Cassis',
                    originalString: '1/2 cup Creme de Cassis',
                    originalName: 'Creme de Cassis',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/soda-can.jpg',
                },
                {
                    id: 19297,
                    amount: 100.0,
                    unit: 'grams',
                    unitLong: 'grams',
                    unitShort: 'g',
                    aisle: 'Nut butters, Jams, and Honey',
                    name: 'jelly',
                    original: '100 grams redcurrant jelly',
                    originalString: '100 grams redcurrant jelly',
                    originalName: 'redcurrant jelly',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/strawberry-jam.png',
                },
                {
                    id: 9152,
                    amount: 1.0,
                    unit: 'tablespoon',
                    unitLong: 'tablespoon',
                    unitShort: 'Tbsp',
                    aisle: 'Produce',
                    name: 'lemon juice',
                    original: '1 tablespoon lemon juice',
                    originalString: '1 tablespoon lemon juice',
                    originalName: 'lemon juice',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/lemon-juice.jpg',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
            likes: 2,
        },
        {
            id: 1155776,
            title: 'Easy Homemade Chocolate Truffles',
            image: 'https://spoonacular.com/recipeImages/1155776-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    id: 2050,
                    amount: 1.5,
                    unit: 'tsp',
                    unitLong: 'teaspoons',
                    unitShort: 'tsp',
                    aisle: 'Baking',
                    name: 'vanilla',
                    original: '1 1/2 tsp vanilla',
                    originalString: '1 1/2 tsp vanilla',
                    originalName: 'vanilla',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/vanilla-extract.jpg',
                },
                {
                    id: 1017,
                    amount: 8.0,
                    unit: 'oz',
                    unitLong: 'ounces',
                    unitShort: 'oz',
                    aisle: 'Cheese',
                    name: 'cream cheese',
                    original: '1 8 oz. package cream cheese',
                    originalString: '1 8 oz. package cream cheese',
                    originalName: 'package cream cheese',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/cream-cheese.jpg',
                },
                {
                    id: 10019903,
                    amount: 3.0,
                    unit: 'cups',
                    unitLong: 'cups',
                    unitShort: 'cup',
                    aisle: 'Baking',
                    name: 'semi sweet chocolate chips',
                    original: '3 cups semi sweet chocolate chips melted',
                    originalString: '3 cups semi sweet chocolate chips melted',
                    originalName: 'semi sweet chocolate chips melted',
                    metaInformation: ['sweet', 'melted'],
                    meta: ['sweet', 'melted'],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/chocolate-chips.jpg',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
            likes: 2,
        },
        {
            id: 664089,
            title: 'Turkish Delight',
            image: 'https://spoonacular.com/recipeImages/664089-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    id: 19296,
                    amount: 1.0,
                    unit: 'cup',
                    unitLong: 'cup',
                    unitShort: 'cup',
                    aisle: 'Nut butters, Jams, and Honey',
                    name: 'honey',
                    original: '1 cup honey',
                    originalString: '1 cup honey',
                    originalName: 'honey',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/honey.png',
                },
                {
                    id: 1085,
                    amount: 2.0,
                    unit: 'cups',
                    unitLong: 'cups',
                    unitShort: 'cup',
                    aisle: 'Milk, Eggs, Other Dairy',
                    name: 'non-fat milk',
                    original: '2 cups non-fat dry milk',
                    originalString: '2 cups non-fat dry milk',
                    originalName: 'non-fat dry milk',
                    metaInformation: ['dry'],
                    meta: ['dry'],
                    extendedName: 'dry non-fat milk',
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/milk.jpg',
                },
                {
                    id: 16098,
                    amount: 1.0,
                    unit: 'cup',
                    unitLong: 'cup',
                    unitShort: 'cup',
                    aisle: 'Nut butters, Jams, and Honey',
                    name: 'peanut butter',
                    original: '1 cup peanut butter',
                    originalString: '1 cup peanut butter',
                    originalName: 'peanut butter',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/peanut-butter.png',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
            likes: 1,
        },
        {
            id: 635778,
            title: 'Boysenberry Syrup',
            image: 'https://spoonacular.com/recipeImages/635778-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    id: 9057,
                    amount: 1.0,
                    unit: 'pound',
                    unitLong: 'pound',
                    unitShort: 'lb',
                    aisle: 'Produce;Frozen',
                    name: 'boysenberries',
                    original: '1 pound Boysenberries',
                    originalString: '1 pound Boysenberries',
                    originalName: 'Boysenberries',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/blackberries.jpg',
                },
                {
                    id: 19296,
                    amount: 4.0,
                    unit: 'ounces',
                    unitLong: 'ounces',
                    unitShort: 'oz',
                    aisle: 'Nut butters, Jams, and Honey',
                    name: 'honey',
                    original: '4 ounces Honey',
                    originalString: '4 ounces Honey',
                    originalName: 'Honey',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/honey.png',
                },
                {
                    id: 1002068,
                    amount: 2.0,
                    unit: 'pints',
                    unitLong: 'pints',
                    unitShort: 'pts',
                    aisle: 'Oil, Vinegar, Salad Dressing',
                    name: 'white wine vinegar',
                    original: '2 pints White wine vinegar',
                    originalString: '2 pints White wine vinegar',
                    originalName: 'White wine vinegar',
                    metaInformation: ['white'],
                    meta: ['white'],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/vinegar-(white).jpg',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
            likes: 1,
        },
        {
            id: 660400,
            title: 'Smoky Baby Back Ribs',
            image: 'https://spoonacular.com/recipeImages/660400-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    id: 10192,
                    amount: 2.0,
                    unit: 'racks',
                    unitLong: 'racks',
                    unitShort: 'racks',
                    aisle: 'Meat',
                    name: 'baby back ribs',
                    original: '2 racks baby back ribs, whole but cracked',
                    originalString: '2 racks baby back ribs, whole but cracked',
                    originalName: 'baby back ribs, whole but cracked',
                    metaInformation: ['whole'],
                    meta: ['whole'],
                    extendedName: 'whole baby back ribs',
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/baby-back-ribs.jpg',
                },
                {
                    id: 27027,
                    amount: 2.0,
                    unit: 'cups',
                    unitLong: 'cups',
                    unitShort: 'cup',
                    aisle: 'Canned and Jarred;Ethnic Foods',
                    name: 'pico de gallo',
                    original: '2 cups pico de gallo (fresh vege salsa)',
                    originalString: '2 cups pico de gallo (fresh vege salsa)',
                    originalName: 'pico de gallo (fresh vege salsa)',
                    metaInformation: ['fresh', '( vege salsa)'],
                    meta: ['fresh', '( vege salsa)'],
                    extendedName: 'fresh pico de gallo',
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/pico-de-gallo.png',
                },
                {
                    id: 19003,
                    amount: 1.0,
                    unit: 'cup',
                    unitLong: 'cup',
                    unitShort: 'cup',
                    aisle: 'Savory Snacks',
                    name: 'corn chips',
                    original: '1 cup hickory chips',
                    originalString: '1 cup hickory chips',
                    originalName: 'hickory chips',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/fritos-or-corn-chips.jpg',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
            likes: 1,
        },
        {
            id: 665573,
            title: 'Yorkshire Pudding',
            image: 'https://spoonacular.com/recipeImages/665573-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 1,
            missedIngredientCount: 2,
            missedIngredients: [
                {
                    id: 1123,
                    amount: 3.0,
                    unit: '',
                    unitLong: '',
                    unitShort: '',
                    aisle: 'Milk, Eggs, Other Dairy',
                    name: 'eggs',
                    original: '3 eggs, slightly beaten',
                    originalString: '3 eggs, slightly beaten',
                    originalName: 'eggs, slightly beaten',
                    metaInformation: ['slightly beaten'],
                    meta: ['slightly beaten'],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/egg.png',
                },
                {
                    id: 1077,
                    amount: 1.0,
                    unit: 'cup',
                    unitLong: 'cup',
                    unitShort: 'cup',
                    aisle: 'Milk, Eggs, Other Dairy',
                    name: 'milk',
                    original: '1 cup milk',
                    originalString: '1 cup milk',
                    originalName: 'milk',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/milk.png',
                },
            ],
            usedIngredients: [
                {
                    id: 93713,
                    amount: 0.5,
                    unit: 'cup',
                    unitLong: 'cups',
                    unitShort: 'cup',
                    aisle: 'Meat',
                    name: 'roast beef',
                    original:
                        '1/2 cup pan drippings from roast beef preferably',
                    originalString:
                        '1/2 cup pan drippings from roast beef preferably',
                    originalName: 'pan drippings from roast beef preferably',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/roast-beef-slices.jpg',
                },
            ],
            unusedIngredients: [],
            likes: 11,
        },
        {
            id: 633338,
            title: 'Bacon Wrapped Filet Mignon',
            image: 'https://spoonacular.com/recipeImages/633338-312x231.jpg',
            imageType: 'jpg',
            usedIngredientCount: 1,
            missedIngredientCount: 2,
            missedIngredients: [
                {
                    id: 10123,
                    amount: 4.0,
                    unit: 'slices',
                    unitLong: 'slices',
                    unitShort: 'slice',
                    aisle: 'Meat',
                    name: 'bacon',
                    original: '4 slices of smoked bacon',
                    originalString: '4 slices of smoked bacon',
                    originalName: 'smoked bacon',
                    metaInformation: ['smoked'],
                    meta: ['smoked'],
                    extendedName: 'smoked bacon',
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/raw-bacon.png',
                },
                {
                    id: 11215,
                    amount: 2.0,
                    unit: 'large cloves',
                    unitLong: 'large cloves',
                    unitShort: 'large cloves',
                    aisle: 'Produce',
                    name: 'garlic',
                    original: '2 large cloves garlic',
                    originalString: '2 large cloves garlic',
                    originalName: 'garlic',
                    metaInformation: [],
                    meta: [],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/garlic.png',
                },
            ],
            usedIngredients: [
                {
                    id: 10023583,
                    amount: 4.0,
                    unit: 'inches',
                    unitLong: 'inches',
                    unitShort: 'inches',
                    aisle: 'Meat',
                    name: 'beef tenderloin steaks',
                    original: '4 inches beef tenderloin steaks, about 2 thick',
                    originalString:
                        '4 inches beef tenderloin steaks, about 2 thick',
                    originalName: 'beef tenderloin steaks, about 2 thick',
                    metaInformation: ['thick'],
                    meta: ['thick'],
                    image: 'https://spoonacular.com/cdn/ingredients_100x100/beef-tenderloin.jpg',
                },
            ],
            unusedIngredients: [],
            likes: 61,
        },
    ]);

    const user = useContext(UserContext);
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        try {
            const loadUserRecipes = async () => {
                const res = await fetch(
                    `http://localhost:5000/users/getRecipes/${user.id}`,
                    {
                        method: 'GET',
                    }
                );
                const data = await res.json();
                setSavedRecipes(data);
            };
            loadUserRecipes();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="filtered-recipes">
            <div className="arrow-to-pantry-container">
                <Link to="/home/pantry" className="arrow-to-pantry">
                    <i className="fa fa-arrow-left fa-lg"></i>
                </Link>
            </div>
            <div className="filtered-recipes-title">
                Recipes with <span>Selected Ingredients</span>
            </div>
            {filteredRecipes.length !== 0 && (
                <div className="filtered-recipes-container">
                    {filteredRecipes.map((recipe, index) => {
                        return (
                            <div className="filtered-recipe" key={index}>
                                <RecipeCard
                                    recipe={recipe}
                                    inSavedRecipe={
                                        savedRecipes.length !== 0
                                            ? savedRecipes.includes(recipe.id)
                                            : false
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="btn-to-pantry-container">
                <Link to="/home/pantry" className="btn-to-pantry">
                    Go Back
                </Link>
            </div>
        </div>
    );
};

export default FilteredRecipes;
