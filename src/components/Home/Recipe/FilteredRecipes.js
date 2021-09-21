import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import RecipeCard from './RecipeCard';
import Pagination from '../Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import './FilteredRecipes.css';

const FilteredRecipes = () => {
    const { user } = useContext(UserContext);
    const { selectedPantryItems: ingredients } = useParams();

    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    useEffect(() => {
        try {
            const loadFilteredRecipes = async () => {
                setLoading(true);
                const res = await fetch(
                    'http://localhost:5000/recipe/findByIngredients',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ingredients, amount: 18 }),
                    }
                );
                const data = await res.json();
                setFilteredRecipes(data);
                setLoading(false);
            };
            loadFilteredRecipes();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
            {loading && (
                <div className="loading-filtered-recipes">
                    <ClipLoader size={50} loading={loading} />
                    <div className="loading-filtered-recipes-message">
                        Loading recipes with selected ingredients...
                    </div>
                </div>
            )}
            {filteredRecipes.length !== 0 && (
                <div className="filtered-recipes-container">
                    {currentRecipes.map((recipe, index) => (
                        <div className="filtered-recipe" key={index}>
                            <RecipeCard
                                recipe={recipe}
                                inSavedRecipe={
                                    user.savedRecipes.length !== 0
                                        ? user.savedRecipes.includes(recipe.id)
                                        : false
                                }
                            />
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination-filtered-recipes-container">
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={filteredRecipes.length}
                    paginate={paginate}
                    scrollToTop={scrollToTop}
                />
            </div>
        </div>
    );
};

export default FilteredRecipes;
