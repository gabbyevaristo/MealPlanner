import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import RecipeCard from './Recipe/RecipeCard';
import './SavedRecipes.css';

const SavedRecipes = () => {
    const user = useContext(UserContext);

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [savedRecipesObject, setSavedRecipesObject] = useState([]);

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

    // useEffect(() => {
    //     if (savedRecipes.length !== 0) {
    //         try {
    //             const loadSavedRecipes = async () => {
    //                 const data = await Promise.all(
    //                     savedRecipes.map(async (recipeId) => {
    //                         const res = await fetch(
    //                             `http://localhost:5000/recipe/${recipeId}`,
    //                             {
    //                                 method: 'GET',
    //                             }
    //                         );
    //                         const recipe = await res.json();
    //                         return recipe;
    //                     })
    //                 );
    //                 setSavedRecipesObject(data);
    //             };
    //             loadSavedRecipes();
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    // }, [savedRecipes]);

    return (
        <div className="saved-recipes">
            <div className="saved-recipes-title">
                Saved <span>Recipes</span>
            </div>
            {savedRecipesObject.length !== 0 && (
                <div className="saved-recipes-container">
                    {savedRecipesObject.map((recipe, index) => {
                        return (
                            <div className="saved-recipe" key={index}>
                                <RecipeCard
                                    recipe={recipe}
                                    inSavedRecipe={false}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SavedRecipes;
