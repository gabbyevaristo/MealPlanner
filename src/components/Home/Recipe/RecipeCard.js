import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './RecipeCard.css';

const RecipeCard = ({ recipe, inSavedRecipe }) => {
    const user = useContext(UserContext);

    return (
        <Link to={`/home/recipe/${recipe.id}`} className="recipe-card-link">
            <div className="recipe-card">
                {recipe && (
                    <div className="recipe-card-container">
                        {user && inSavedRecipe && (
                            <div className="recipe-card-heart">
                                <i className="fa fa-heart fa-3x"></i>
                            </div>
                        )}
                        <div className="recipe-card-img">
                            <img
                                src={`${recipe.image}`}
                                alt={`${recipe.title}-card-img`}
                            />
                        </div>
                        <div className="recipe-card-title">
                            <strong>{recipe.title}</strong>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default RecipeCard;
