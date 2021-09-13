import { useState, useContext, useEffect, useRef } from 'react';
import { IngredientContext } from '../../App';
import './Pantry.css';

const Pantry = () => {
    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredientMatch, setIngredientMatch] = useState([]);
    const [areMatchesOpen, setAreMatchesOpen] = useState(false);
    const [pantry, setPantry] = useState(['broccoli', 'carrot', 'salad']);
    const ingredients = useContext(IngredientContext);

    const wrapperRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setAreMatchesOpen(false);
        }
    };

    const searchIngredients = (ingredientName) => {
        if (!ingredientName) {
            setIngredientMatch([]);
            return;
        }
        const matches = ingredients.filter((ingredient) => {
            const regex = new RegExp(`${ingredientName}`, 'gi');
            return ingredient.match(regex);
        });
        setIngredientMatch(matches);
    };

    const handleIngredientInputChange = (e) => {
        setIngredientInput(e.target.value);
        searchIngredients(e.target.value);
    };

    const setIngredientOnClick = (ingredient) => {
        setIngredientInput(ingredient);
        setAreMatchesOpen(false);
    };

    return (
        <div className="pantry">
            <div className="pantry-container">
                <div className="ingredient-search-section">
                    <div className="pantry-title">My Pantry</div>
                    <div ref={wrapperRef}>
                        <div
                            className={`ingredient-input ${
                                ingredientMatch.length !== 0
                                    ? 'ingredient-input-borders'
                                    : ''
                            }`}
                        >
                            <input
                                type="text"
                                name="ingredient"
                                value={ingredientInput}
                                onClick={() => setAreMatchesOpen(true)}
                                onChange={handleIngredientInputChange}
                                placeholder="Enter ingredient"
                                required
                            />
                        </div>
                        <div className="ingredient-matches-section">
                            {areMatchesOpen && (
                                <div
                                    className={`ingredient-matches-container ${
                                        ingredientMatch.length !== 0
                                            ? 'ingredient-matches-exist'
                                            : ''
                                    }`}
                                >
                                    {ingredientMatch.map(
                                        (ingredient, index) => {
                                            return (
                                                <div
                                                    className="ingredient-match"
                                                    onClick={() =>
                                                        setIngredientOnClick(
                                                            ingredient
                                                        )
                                                    }
                                                    key={index}
                                                >
                                                    <span className="ingredient-match-name">
                                                        {ingredient}
                                                    </span>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="pantry-items">
                    <div className="pantry-items-container">Salad</div>
                </div>
            </div>
        </div>
    );
};

export default Pantry;
