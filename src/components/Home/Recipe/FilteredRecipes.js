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
            usedIngredientCount: 0,
            missedIngredientCount: 2,
            missedIngredients: [
                {
                    amount: 12.0,
                    name: 'plums',
                    original: '12 Italian plums, halved and pitted',
                },
                {
                    amount: 4.0,
                    name: 'egg yolks',
                    original: '4 large egg yolks',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
        },
        {
            id: 635315,
            title: 'Blood Orange Margarita',
            image: 'https://spoonacular.com/recipeImages/635315-312x231.jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    amount: 1.0,
                    name: 'blood orange juice',
                    original: '1 cup fresh-squeezed blood orange juice',
                },
                {
                    amount: 8.0,
                    name: 'tequila',
                    original: '8 ounces premium tequila-reposada',
                },
                {
                    amount: 7.0,
                    name: 'triple sec',
                    original: '7 ounces triple sec',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
        },
        {
            id: 635260,
            title: 'Blackcurrant Sauce',
            image: 'https://spoonacular.com/recipeImages/635260-312x231.jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    amount: 0.5,
                    name: 'creme soda',
                    original: '1/2 cup Creme de Cassis',
                },
                {
                    amount: 100.0,
                    name: 'jelly',
                    original: '100 grams redcurrant jelly',
                },
                {
                    amount: 1.0,
                    name: 'lemon juice',
                    original: '1 tablespoon lemon juice',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
        },
        {
            id: 1155776,
            title: 'Easy Homemade Chocolate Truffles',
            image: 'https://spoonacular.com/recipeImages/1155776-312x231.jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    amount: 1.5,
                    name: 'vanilla',
                    original: '1 1/2 tsp vanilla',
                },
                {
                    amount: 8.0,
                    name: 'cream cheese',
                    original: '1 8 oz. package cream cheese',
                },
                {
                    amount: 3.0,
                    name: 'semi sweet chocolate chips',
                    original: '3 cups semi sweet chocolate chips melted',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
        },
        {
            id: 664089,
            title: 'Turkish Delight',
            image: 'https://spoonacular.com/recipeImages/664089-312x231.jpg',

            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    amount: 1.0,
                    name: 'honey',
                    original: '1 cup honey',
                },
                {
                    amount: 2.0,
                    name: 'non-fat milk',
                    original: '2 cups non-fat dry milk',
                },
                {
                    amount: 1.0,
                    name: 'peanut butter',
                    original: '1 cup peanut butter',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
        },
        {
            id: 635778,
            title: 'Boysenberry Syrup',
            image: 'https://spoonacular.com/recipeImages/635778-312x231.jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    amount: 1.0,
                    name: 'boysenberries',
                    original: '1 pound Boysenberries',
                },
                {
                    amount: 4.0,
                    name: 'honey',
                    original: '4 ounces Honey',
                },
                {
                    amount: 2.0,
                    name: 'white wine vinegar',
                    original: '2 pints White wine vinegar',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
        },
        {
            id: 660400,
            title: 'Smoky Baby Back Ribs',
            image: 'https://spoonacular.com/recipeImages/660400-312x231.jpg',
            usedIngredientCount: 0,
            missedIngredientCount: 3,
            missedIngredients: [
                {
                    amount: 2.0,
                    name: 'baby back ribs',
                    original: '2 racks baby back ribs, whole but cracked',
                },
                {
                    amount: 2.0,
                    name: 'pico de gallo',
                    original: '2 cups pico de gallo (fresh vege salsa)',
                },
                {
                    amount: 1.0,
                    name: 'corn chips',
                    original: '1 cup hickory chips',
                },
            ],
            usedIngredients: [],
            unusedIngredients: [],
        },
        {
            id: 665573,
            title: 'Yorkshire Pudding',
            image: 'https://spoonacular.com/recipeImages/665573-312x231.jpg',
            usedIngredientCount: 1,
            missedIngredientCount: 2,
            missedIngredients: [
                {
                    amount: 3.0,
                    name: 'eggs',
                    original: '3 eggs, slightly beaten',
                },
                {
                    amount: 1.0,
                    name: 'milk',
                    original: '1 cup milk',
                },
            ],
            usedIngredients: [
                {
                    amount: 0.5,
                    name: 'roast beef',
                    original:
                        '1/2 cup pan drippings from roast beef preferably',
                },
            ],
            unusedIngredients: [],
        },
        {
            id: 633338,
            title: 'Bacon Wrapped Filet Mignon',
            image: 'https://spoonacular.com/recipeImages/633338-312x231.jpg',
            usedIngredientCount: 1,
            missedIngredientCount: 2,
            missedIngredients: [
                {
                    amount: 4.0,
                    name: 'bacon',
                    original: '4 slices of smoked bacon',
                },
                {
                    amount: 2.0,
                    name: 'garlic',
                    original: '2 large cloves garlic',
                },
            ],
            usedIngredients: [
                {
                    amount: 4.0,
                    name: 'beef tenderloin steaks',
                    original: '4 inches beef tenderloin steaks, about 2 thick',
                },
            ],
            unusedIngredients: [],
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
