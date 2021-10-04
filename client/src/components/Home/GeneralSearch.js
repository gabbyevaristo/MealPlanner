import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import RecipeCard from '../Recipe/RecipeCard';
import Pagination from '../BasicComponents/Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import './GeneralSearch.css';

const GeneralSearch = () => {
    const params = useParams();
    const [query, cuisine, type, diet] = params.queries.split(',');

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    useEffect(() => {
        try {
            const loadRecipes = async () => {
                setLoading(true);
                const res = await fetch(`/recipe`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        cuisine,
                        type,
                        diet,
                        amount: 24,
                    }),
                });
                const data = await res.json();
                setRecipes(data.results);
                setLoading(false);
            };
            loadRecipes();
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
        <div className="general-recipes">
            <div className="arrow-to-home-container">
                <Link to="/home/" className="arrow-to-home">
                    <i className="fa fa-arrow-left fa-lg"></i>
                </Link>
            </div>
            {loading && (
                <div className="loading-general-recipes">
                    <ClipLoader size={50} loading={loading} />
                    <div className="loading-general-recipes-message">
                        Loading recipes...
                    </div>
                </div>
            )}
            {recipes.length !== 0 && (
                <div className="general-recipes-container">
                    {currentRecipes.map((recipe, index) => (
                        <div className="general-recipe" key={index}>
                            <RecipeCard recipe={recipe} inSavedRecipe={false} />
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination-general-recipes-container">
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={recipes.length}
                    paginate={paginate}
                    scrollToTop={scrollToTop}
                />
            </div>
        </div>
    );
};

export default GeneralSearch;
