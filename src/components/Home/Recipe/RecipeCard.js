import { useState, useEffect } from 'react';

const RecipeCard = ({ recipe: recipeMeta }) => {
    const [recipe, setRecipe] = useState(null);

    /*
    from recipeMeta:
        - missedIngredients (ingredients in recipe you did not select / shopping list)
        - usedIngredients (ingredients in recipe you did select - pantry)
        - unusedIngredients (ingredients you selected that are not in recipe)
    from recipe:
        - vegetarian, vegan, glutenFree, dairyFree
        - title, image
        - servings, readyInMinutes, summary, instructions, analyzedInstructions
        - extendedIngredients -> original (for list of ingredients)
        - cuisines, dishTypes
    */

    useEffect(() => {
        try {
            const loadRecipe = async () => {
                const res = await fetch(
                    `http://localhost:5000/recipe/${recipeMeta.id}`,
                    {
                        method: 'GET',
                    }
                );
                const data = await res.json();
                setRecipe(data);
            };
            loadRecipe();
        } catch (err) {
            console.log(err);
        }
    }, []);

    console.log(recipe);

    return <div className="recipe-card">{recipe && recipe.title}</div>;
};

export default RecipeCard;
