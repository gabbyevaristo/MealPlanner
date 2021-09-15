import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import RecipeCard from './Recipe/RecipeCard';
import './SavedRecipes.css';

const SavedRecipes = () => {
    const user = useContext(UserContext);

    const [savedRecipes, setSavedRecipes] = useState([]);

    // If I add something, I never update savedRecipes

    useEffect(() => {
        if (user.savedRecipes.length !== 0) {
            try {
                const loadSavedRecipes = async () => {
                    const data = await Promise.all(
                        user.savedRecipes.map(async (recipeId) => {
                            const res = await fetch(
                                `http://localhost:5000/recipe/${recipeId}`,
                                {
                                    method: 'GET',
                                }
                            );
                            const recipe = await res.json();
                            return recipe;
                        })
                    );
                    console.log(user.savedRecipes);
                    setSavedRecipes(data);
                };
                loadSavedRecipes();
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    // console.log(savedRecipes);

    return (
        <div className="saved-recipes">
            <div className="saved-recipes-title">
                Saved <span>Recipes</span>
            </div>
            {savedRecipes.length !== 0 && (
                <div className="saved-recipes-container">
                    {savedRecipes.map((recipe, index) => {
                        return (
                            <div className="saved-recipe" key={index}>
                                <RecipeCard recipe={recipe} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SavedRecipes;
