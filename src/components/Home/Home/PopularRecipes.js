import { useState, useEffect } from 'react';
import RecipeCard from '../Recipe/RecipeCard';
import { BASE_API_URL } from '../../../utils/constants';
import './PopularRecipes.css';

const PopularRecipes = () => {
    const [popularRecipes, setPopularRecipes] = useState([]);

    useEffect(() => {
        try {
            const loadPopularRecipes = async () => {
                const res = await fetch(`${BASE_API_URL}/recipe/random`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: 8, tags: '' }),
                });
                const data = await res.json();
                setPopularRecipes(data);
            };
            loadPopularRecipes();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="popular-recipes-container">
            <div className="popular-recipes-title">
                <span>Popular</span> Recipes
            </div>
            {popularRecipes && popularRecipes.length !== 0 && (
                <div className="popular-recipes">
                    {popularRecipes.map((recipe, index) => (
                        <div className="popular-recipe" key={index}>
                            <RecipeCard recipe={recipe} inSavedRecipe={false} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularRecipes;
