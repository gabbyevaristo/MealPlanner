import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IngredientContext, UserContext } from '../../../App';
import PantryListItem from './PantryListItem';
import './PantryList.css';

toast.configure();

const PantryList = () => {
    const ingredients = useContext(IngredientContext);
    const user = useContext(UserContext);
    const wrapperRef = useRef(null);

    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredientMatch, setIngredientMatch] = useState([]);
    const [areMatchesOpen, setAreMatchesOpen] = useState(false);
    const [checkedPantryItems, setCheckedPantryItems] = useState([]);
    const [pantry, setPantry] = useState([]);

    useEffect(() => {
        try {
            const loadUserIngredients = async () => {
                const res = await fetch(
                    `http://localhost:5000/users/getIngredients/${user.id}`,
                    {
                        method: 'GET',
                    }
                );
                const data = await res.json();
                setPantry(data);
            };
            loadUserIngredients();
        } catch (err) {
            console.log(err);
        }
    }, []);

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

    const toastConfiguration = {
        autoClose: 1000,
        pauseOnFocusLoss: false,
    };

    const notifySuccess = (message) => {
        toast.success(message, toastConfiguration);
    };

    const notifyError = (message) => {
        toast.error(message, toastConfiguration);
    };

    const handleInputClick = () => {
        if (ingredientInput) {
            setAreMatchesOpen(true);
        }
    };

    const searchIngredients = (ingredientName) => {
        if (!ingredientName) {
            setIngredientMatch([]);
            return;
        }
        const matches = ingredients.filter((ingredient) => {
            RegExp.quote = (str) => {
                return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
            };
            const regex = new RegExp(RegExp.quote(`${ingredientName}`), 'gi');
            return ingredient.match(regex);
        });
        setIngredientMatch(matches);
    };

    const handleIngredientInputChange = (e) => {
        setAreMatchesOpen(true);
        setIngredientInput(e.target.value);
        searchIngredients(e.target.value);
    };

    const addIngredientToDb = async (ingredient) => {
        try {
            await fetch(
                `http://localhost:5000/users/addIngredient/${user.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ingredient }),
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddItem = async (item) => {
        if (!pantry.includes(item)) {
            setPantry([...pantry, item]);
            notifySuccess(`${item} added to pantry`);
            await addIngredientToDb(item);
        } else {
            notifyError(`${item} already in pantry`);
        }
        setIngredientInput('');
        setIngredientMatch([]);
        setAreMatchesOpen(false);
    };

    const removeIngredientFromDb = async (ingredient) => {
        try {
            await fetch(
                `http://localhost:5000/users/deleteIngredient/${user.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ingredient }),
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveItem = async (item) => {
        const items = pantry.filter((pantryItem) => pantryItem !== item);
        setPantry(items);
        notifyError(`${item} deleted from pantry`);
        await removeIngredientFromDb(item);
    };

    const handleCheckedItem = (item) => {
        if (checkedPantryItems.includes(item)) {
            const items = checkedPantryItems.filter(
                (pantryItem) => pantryItem !== item
            );
            setCheckedPantryItems(items);
        } else {
            setCheckedPantryItems([...checkedPantryItems, item]);
        }
    };

    return (
        <div className="pantry-list-section">
            <ToastContainer limit={1} icon={false} />
            <div
                className={`pantry-search ${
                    pantry.length !== 0 ? 'pantry-search-border-active' : ''
                }`}
                ref={wrapperRef}
            >
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
                        onClick={handleInputClick}
                        onChange={handleIngredientInputChange}
                        placeholder="Add ingredient from pantry"
                        required
                    />
                </div>
                <div className="ingredient-matches-container">
                    {areMatchesOpen && (
                        <div
                            className={`ingredient-matches ${
                                ingredientMatch.length !== 0
                                    ? 'ingredient-matches-exist'
                                    : ''
                            }`}
                        >
                            {ingredientMatch.map((ingredient, index) => {
                                return (
                                    <div
                                        className="ingredient-match"
                                        onClick={() =>
                                            handleAddItem(ingredient)
                                        }
                                        key={index}
                                    >
                                        <span className="ingredient-match-name">
                                            {ingredient}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            {checkedPantryItems.length !== 0 && (
                <div className="btn-to-filtered-recipes-container">
                    <Link
                        to={`/home/filtered-recipes/${checkedPantryItems.join()}`}
                        className="btn-to-filtered-recipes"
                    >
                        Find Recipes With Selected Ingredients
                    </Link>
                </div>
            )}
            <div className="pantry-list">
                <div
                    className={`pantry-list-container ${
                        pantry.length !== 0
                            ? 'pantry-list-container-active'
                            : ''
                    }`}
                >
                    {pantry &&
                        pantry.length !== 0 &&
                        pantry.map((item, index) => {
                            return (
                                <PantryListItem
                                    item={item}
                                    key={index}
                                    handleRemoveItem={handleRemoveItem}
                                    handleCheckedItem={handleCheckedItem}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default PantryList;
