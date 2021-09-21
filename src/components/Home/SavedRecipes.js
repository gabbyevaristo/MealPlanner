import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import RecipeCard from './Recipe/RecipeCard';
import Pagination from './Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import './SavedRecipes.css';

const SavedRecipes = () => {
    const { user } = useContext(UserContext);

    const [savedRecipesObject, setSavedRecipesObject] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = savedRecipesObject.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    useEffect(() => {
        if (user.savedRecipes.length !== 0) {
            try {
                const loadSavedRecipes = async () => {
                    setLoading(true);
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
                    setSavedRecipesObject(data);
                    setLoading(false);
                };
                loadSavedRecipes();
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="saved-recipes">
            <div className="saved-recipes-title">
                <span>Saved</span> Recipes
            </div>
            {loading && (
                <div className="loading-saved-recipes">
                    <ClipLoader size={50} loading={loading} />
                    <div className="loading-saved-recipes-message">
                        Loading saved recipes...
                    </div>
                </div>
            )}
            {savedRecipesObject.length !== 0 ? (
                <div className="saved-recipes-container">
                    {currentRecipes.map((recipe, index) => (
                        <div className="saved-recipe" key={index}>
                            <RecipeCard recipe={recipe} inSavedRecipe={false} />
                        </div>
                    ))}
                </div>
            ) : (
                !loading && (
                    <div className="no-recipes-container">No recipes saved</div>
                )
            )}
            <div className="pagination-saved-recipes-container">
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={savedRecipesObject.length}
                    paginate={paginate}
                    scrollToTop={scrollToTop}
                />
            </div>
        </div>
    );
};

export default SavedRecipes;
