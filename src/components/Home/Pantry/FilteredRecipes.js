import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../Recipe/RecipeCard';
import './FilteredRecipes.css';

const FilteredRecipes = ({ checkedPantryItems, clearPantryItems }) => {
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        try {
            const loadFilteredRecipes = async () => {
                const ingredients = checkedPantryItems.join().toLowerCase();
                const res = await fetch(
                    'http://localhost:5000/recipe/findByIngredients',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ingredients, amount: 1 }),
                    }
                );
                const data = await res.json();
                setFilteredRecipes(data);
            };
            loadFilteredRecipes();
        } catch (err) {
            console.log(err);
        }
    }, []);

    console.log(checkedPantryItems);

    return (
        <div className="filtered-recipes">
            {filteredRecipes.length !== 0 && (
                <div className="filtered-recipes-container">
                    {filteredRecipes.map((recipe, index) => {
                        return (
                            <div className="filtered-recipe" key={index}>
                                <RecipeCard recipe={recipe} />
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="btn-filtered-recipes-container">
                <Link
                    to="/home/pantry"
                    className="btn-filtered-recipes"
                    onClick={clearPantryItems}
                >
                    Go Back
                </Link>
            </div>
        </div>
    );
};

export default FilteredRecipes;
