import { useState, useContext, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IngredientContext, UserContext } from '../../App';
import ShoppingListItem from './ShoppingListItem';
import './ShoppingList.css';

toast.configure();

const ShoppingList = () => {
    const ingredients = useContext(IngredientContext);
    const { user, setUser } = useContext(UserContext);
    const wrapperRef = useRef(null);

    const [ingredientInput, setIngredientInput] = useState('');
    const [ingredientMatch, setIngredientMatch] = useState([]);
    const [areMatchesOpen, setAreMatchesOpen] = useState(false);
    const [shoppingList, setShoppingList] = useState(
        user.userData.shoppingList
    );

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
        autoClose: 2000,
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

    // Get ingredients that match the prefix of the input
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

    const addShoppingItemToDb = async (item) => {
        try {
            await fetch(`/users/addShoppingList`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': user.token,
                },
                body: JSON.stringify({ item }),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddShoppingItem = async (item) => {
        if (!shoppingList.includes(item)) {
            setShoppingList([...shoppingList, item]);
            notifySuccess(`${item} added to shopping list`);

            // Modify shopping list on local storage
            const localUser = JSON.parse(localStorage.getItem('user'));
            localUser.userData.shoppingList.push(item);
            localStorage.setItem('user', JSON.stringify(localUser));
            setUser(localUser);

            await addShoppingItemToDb(item);
        } else {
            notifyError(`${item} already in shopping list`);
        }

        setIngredientInput('');
        setIngredientMatch([]);
        setAreMatchesOpen(false);
    };

    const removeShoppingItemFromDb = async (item) => {
        try {
            await fetch(`/users/deleteShoppingList`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': user.token,
                },
                body: JSON.stringify({ item }),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveShoppingItem = async (item) => {
        const items = shoppingList.filter(
            (shoppingListItem) => shoppingListItem !== item
        );
        setShoppingList(items);
        notifyError(`${item} deleted from shopping list`);

        // Modify shopping list on local storage
        const localUser = JSON.parse(localStorage.getItem('user'));
        localUser.userData.shoppingList =
            localUser.userData.shoppingList.filter(
                (shoppingListItem) => shoppingListItem !== item
            );
        localStorage.setItem('user', JSON.stringify(localUser));
        setUser(localUser);

        await removeShoppingItemFromDb(item);
    };

    const addPantryItemToDb = async (ingredient) => {
        try {
            await fetch(`/users/addIngredient`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': user.token,
                },
                body: JSON.stringify({ ingredient }),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddPantryItem = async (item) => {
        if (!user.userData.ownedIngredients.includes(item)) {
            // Modify pantry list on local storage
            const localUser = JSON.parse(localStorage.getItem('user'));
            localUser.userData.ownedIngredients.push(item);
            localStorage.setItem('user', JSON.stringify(localUser));
            setUser(localUser);

            await addPantryItemToDb(item);
        }

        await handleRemoveShoppingItem(item);
        notifySuccess(`${item} added to pantry`);

        setIngredientInput('');
        setIngredientMatch([]);
        setAreMatchesOpen(false);
    };

    return (
        <div className="shopping-section">
            <ToastContainer limit={2} icon={false} />
            <div
                className={`shopping-search ${
                    shoppingList && shoppingList.length !== 0
                        ? 'shopping-search-border-active'
                        : ''
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
                        placeholder="Add item to shopping list"
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
                            {ingredientMatch.length !== 0 &&
                                ingredientMatch.map((ingredient, index) => (
                                    <div
                                        className="ingredient-match"
                                        onClick={() =>
                                            handleAddShoppingItem(ingredient)
                                        }
                                        key={index}
                                    >
                                        <span className="ingredient-match-name">
                                            {ingredient}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="shopping-list">
                <div
                    className={`shopping-list-container ${
                        shoppingList && shoppingList.length !== 0
                            ? 'shopping-list-container-active'
                            : ''
                    }`}
                >
                    {shoppingList && shoppingList.length !== 0 ? (
                        shoppingList.map((item, index) => (
                            <ShoppingListItem
                                item={item}
                                key={index}
                                handleRemoveShoppingItem={
                                    handleRemoveShoppingItem
                                }
                                handleAddPantryItem={handleAddPantryItem}
                            />
                        ))
                    ) : (
                        <div className="no-items">
                            No items in shopping list
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;
