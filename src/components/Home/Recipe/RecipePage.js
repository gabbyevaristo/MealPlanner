import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './RecipePage.css';

const RecipePage = () => {
    // const [recipe, setRecipe] = useState(null);

    const recipe = {
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        extendedIngredients: [
            {
                name: 'beef tenderloin steaks',
                nameClean: 'tenderloin steak',
                original: '4 inches beef tenderloin steaks, about 2 thick',
            },
            {
                name: 'bacon',
                nameClean: 'applewood smoked bacon',
                original: '4 slices of smoked bacon',
            },
            {
                name: 'garlic',
                nameClean: 'garlic',
                original: '2 large cloves garlic',
            },
            {
                name: 'Salt & Pepper',
                nameClean: 'salt and pepper',
                original: 'Salt and pepper',
            },
        ],
        id: 633338,
        title: 'Bacon Wrapped Filet Mignon',
        readyInMinutes: 45,
        servings: 4,
        image: 'https://spoonacular.com/recipeImages/633338-556x370.jpg',
        analyzedInstructions: [
            {
                steps: [
                    {
                        number: 1,
                        step: 'Place the tenderloins on a large dish and wrap a slice of room temperature bacon around each filet, gently stretching the bacon if needed. Secure the ends of the bacon with a toothpick.',
                    },
                    {
                        number: 2,
                        step: 'Cut the garlic cloves in half and rub both sides of each filet with the cut ends of the garlic. Season well with salt and pepper on both sides.',
                    },
                    {
                        number: 3,
                        step: 'Pre-heat grill to very hot. With tongs, place each steak on the grill and for medium-rare cook for 3-4 minutes, rotating the steaks halfway through 90 degrees for nice grill marks.',
                    },
                    {
                        number: 4,
                        step: 'Turn the steaks over and cook another 3-4 minutes.',
                    },
                    {
                        number: 5,
                        step: 'Remove from the grill and let rest loosely covered for 5 minutes before removing toothpicks and serving.',
                    },
                    {
                        number: 6,
                        step: 'Serve as is or with sauted garlic mushrooms',
                    },
                ],
            },
        ],
    };

    const { recipeId } = useParams();

    // useEffect(() => {
    //     try {
    //         const loadRecipe = async () => {
    //             const res = await fetch(
    //                 `http://localhost:5000/recipe/${recipeId}`,
    //                 {
    //                     method: 'GET',
    //                 }
    //             );
    //             const data = await res.json();
    //             setRecipe(data);
    //         };
    //         loadRecipe();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, []);

    return (
        <div className="recipe-page">
            {recipe && (
                <div className="recipe-page-container">
                    <img src={recipe.image} alt={`${recipe.title}-page-img`} />
                    <div className="recipe-page-title">{recipe.title}</div>
                    <ul className="recipe-page-meta">
                        <li className="recipe-page-meta-info">
                            Time in minutes {recipe.readyInMinutes}
                        </li>
                        <li className="recipe-page-meta-info">
                            Serving size {recipe.servings}
                        </li>
                    </ul>
                    <ul className="recipe-page-filters">
                        <li className="recipe-page-filter">
                            Vegetarian
                            {recipe.vegetarian ? (
                                <i className="fa fa-check"></i>
                            ) : (
                                <i className="fa fa-times"></i>
                            )}
                        </li>
                        <li className="recipe-page-filter">
                            Vegan
                            {recipe.vegan ? (
                                <i className="fa fa-check"></i>
                            ) : (
                                <i className="fa fa-times"></i>
                            )}
                        </li>
                        <li className="recipe-page-filter">
                            Gluten Free
                            {recipe.glutenFree ? (
                                <i className="fa fa-check"></i>
                            ) : (
                                <i className="fa fa-times"></i>
                            )}
                        </li>
                        <li className="recipe-page-filter">
                            Dairy Free
                            {recipe.dairyFree ? (
                                <i className="fa fa-check"></i>
                            ) : (
                                <i className="fa fa-times"></i>
                            )}
                        </li>
                    </ul>
                    <ul className="recipe-page-ingredients">
                        {recipe.extendedIngredients.map((ingredient, index) => {
                            return (
                                <li
                                    className="recipe-page-ingredient"
                                    key={index}
                                >
                                    {ingredient.original}
                                </li>
                            );
                        })}
                    </ul>
                    <ol className="recipe-page-instructions" type="1">
                        {recipe.analyzedInstructions[0].steps.map(
                            (instruction, index) => {
                                return (
                                    <li
                                        className="recipe-page-instruction"
                                        key={index}
                                    >
                                        {instruction.step}
                                    </li>
                                );
                            }
                        )}
                    </ol>
                </div>
            )}
        </div>
    );
};

// analyzedInstructions: [
//     {
//         steps: [
//             {
//                 number: 1,
//                 step: 'Place the tenderloins on a large dish and wrap a slice of room temperature bacon around each filet, gently stretching the bacon if needed. Secure the ends of the bacon with a toothpick.',
//                 ingredients: [

export default RecipePage;
