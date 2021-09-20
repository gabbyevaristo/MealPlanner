import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import './RecipePage.css';

toast.configure();

const RecipePage = () => {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortCont = new AbortController();

        try {
            const loadRecipe = async () => {
                setLoading(true);
                const res = await fetch(
                    `http://localhost:5000/recipe/${recipeId}`,
                    {
                        method: 'GET',
                        signal: abortCont.signal,
                    }
                );
                const data = await res.json();
                setRecipe(data);
                setLoading(false);
            };
            loadRecipe();
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.log(err);
            }
        }
        return () => abortCont.abort();
    }, []);

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

    const addRecipeToDb = async (recipeId) => {
        try {
            await fetch(`http://localhost:5000/users/addRecipe/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId }),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteRecipeFromDb = async (recipeId) => {
        try {
            await fetch(`http://localhost:5000/users/deleteRecipe/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId }),
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleSavedRecipe = async (recipe) => {
        if (!user.savedRecipes.includes(recipe.id)) {
            notifySuccess(`${recipe.title} saved`);
            const localUser = JSON.parse(localStorage.getItem('user'));
            localUser.savedRecipes.push(recipe.id);
            localStorage.setItem('user', JSON.stringify(localUser));
            setUser(localUser);
            await addRecipeToDb(recipe.id);
        } else {
            notifyError(`${recipe.title} unsaved`);
            const localUser = JSON.parse(localStorage.getItem('user'));
            localUser.savedRecipes = localUser.savedRecipes.filter(
                (savedRecipe) => savedRecipe !== recipe.id
            );
            localStorage.setItem('user', JSON.stringify(localUser));
            setUser(localUser);
            await deleteRecipeFromDb(recipe.id);
        }
    };

    const addShoppingItemToDb = async (item) => {
        try {
            await fetch(
                `http://localhost:5000/users/addShoppingList/${user.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ item }),
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddShoppingItems = async (items) => {
        const localUser = JSON.parse(localStorage.getItem('user'));
        for (const item of items) {
            localUser.shoppingList.push(item);
        }
        localStorage.setItem('user', JSON.stringify(localUser));
        console.log(localUser);
        setUser(localUser);
        await Promise.all(items.map(async (item) => addShoppingItemToDb(item)));
    };

    const handleAddMissingIngredients = async () => {
        const ingredients = recipe.extendedIngredients.map(
            (ingredient) =>
                ingredient.name.charAt(0).toUpperCase() +
                ingredient.name.slice(1)
        );
        const missingIngredients = ingredients.filter(
            (ingredient) =>
                !user.ownedIngredients.includes(ingredient) &&
                !user.shoppingList.includes(ingredient)
        );
        await handleAddShoppingItems(missingIngredients);
        notifySuccess('Missing ingredients added to shopping list');
    };

    return (
        <div className={`recipe-page ${loading ? 'recipe-page-loading' : ''}`}>
            <ToastContainer limit={1} icon={false} />
            <div className="recipe-page-header">
                <div className="btn-to-back-container">
                    <button
                        className="btn-to-back"
                        onClick={() => history.goBack()}
                    >
                        <i className="fa fa-arrow-left fa-2x"></i>
                    </button>
                </div>
                <button
                    className={`btn-handle-saved-recipe ${
                        recipe && !user.savedRecipes.includes(recipe.id)
                            ? 'not-saved'
                            : 'saved'
                    }`}
                    title={`${
                        recipe && !user.savedRecipes.includes(recipe.id)
                            ? 'Save'
                            : 'Unsave'
                    }`}
                    onClick={() => handleSavedRecipe(recipe)}
                >
                    {recipe && !user.savedRecipes.includes(recipe.id) ? (
                        <i className="fa fa-heart fa-3x"></i>
                    ) : (
                        <i className="fa fa-heart fa-3x"></i>
                    )}
                </button>
            </div>
            {loading && (
                <div className="loading-recipe-page">
                    <ClipLoader size={50} loading={loading} />
                    <div className="loading-recipe-page-message">
                        Loading recipe...
                    </div>
                </div>
            )}
            {recipe && (
                <div className="recipe-page-container">
                    <img src={recipe.image} alt={`${recipe.title}-page-img`} />
                    <div className="recipe-page-title">{recipe.title}</div>
                    <ul className="recipe-page-meta">
                        <li className="recipe-page-meta-info">
                            Time in minutes{' '}
                            <span>
                                <strong>{recipe.readyInMinutes}</strong>
                            </span>
                        </li>
                        <li className="recipe-page-meta-info">
                            Serving size{' '}
                            <span>
                                <strong>{recipe.servings}</strong>
                            </span>
                        </li>
                    </ul>
                    <ul className="recipe-page-filters">
                        <li className="recipe-page-filter">
                            Vegetarian
                            <span>
                                {recipe.vegetarian ? (
                                    <i className="fa fa-check"></i>
                                ) : (
                                    <i className="fa fa-times"></i>
                                )}
                            </span>
                        </li>
                        <li className="recipe-page-filter">
                            Vegan
                            <span>
                                {recipe.vegan ? (
                                    <i className="fa fa-check"></i>
                                ) : (
                                    <i className="fa fa-times"></i>
                                )}
                            </span>
                        </li>
                        <li className="recipe-page-filter">
                            Gluten Free
                            <span>
                                {recipe.glutenFree ? (
                                    <i className="fa fa-check"></i>
                                ) : (
                                    <i className="fa fa-times"></i>
                                )}
                            </span>
                        </li>
                        <li className="recipe-page-filter">
                            Dairy Free
                            <span>
                                {recipe.dairyFree ? (
                                    <i className="fa fa-check"></i>
                                ) : (
                                    <i className="fa fa-times"></i>
                                )}
                            </span>
                        </li>
                    </ul>
                    <ul className="recipe-page-ingredients">
                        <div className="recipe-page-ingredients-title">
                            <strong>Ingredients</strong>
                        </div>
                        <div className="recipe-page-ingredients-list">
                            {recipe.extendedIngredients.map(
                                (ingredient, index) => (
                                    <li
                                        className="recipe-page-ingredient"
                                        key={index}
                                    >
                                        {ingredient.original}
                                    </li>
                                )
                            )}
                        </div>
                        <button
                            className="btn-recipe-page-ingredients"
                            title="Add missing ingredients to shopping list"
                            onClick={handleAddMissingIngredients}
                        >
                            Add missing ingredients to shopping list
                        </button>
                    </ul>
                    <ol className="recipe-page-directions" type="1">
                        <div className="recipe-page-directions-title">
                            <strong>Directions</strong>
                        </div>
                        {recipe.analyzedInstructions[0].steps.map(
                            (instruction, index) => (
                                <li
                                    className="recipe-page-direction"
                                    key={index}
                                >
                                    <div className="recipe-page-direction-step">
                                        <strong>Step {index + 1}</strong>
                                    </div>
                                    {instruction.step}
                                </li>
                            )
                        )}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default RecipePage;

// import { useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { UserContext } from '../../../App';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './RecipePage.css';

// toast.configure();

// const RecipePage = () => {
//     const user = useContext(UserContext);
//     const history = useHistory();

//     const [savedRecipes, setSavedRecipes] = useState([633338]);

//     const recipe = {
//         vegetarian: false,
//         vegan: false,
//         glutenFree: true,
//         dairyFree: true,
//         extendedIngredients: [
//             {
//                 name: 'beef tenderloin steaks',
//                 nameClean: 'tenderloin steak',
//                 original: '4 inches beef tenderloin steaks, about 2 thick',
//             },
//             {
//                 name: 'bacon',
//                 nameClean: 'applewood smoked bacon',
//                 original: '4 slices of smoked bacon',
//             },
//             {
//                 name: 'garlic',
//                 nameClean: 'garlic',
//                 original: '2 large cloves garlic',
//             },
//             {
//                 name: 'Salt & Pepper',
//                 nameClean: 'salt and pepper',
//                 original: 'Salt and pepper',
//             },
//         ],
//         id: 633338,
//         title: 'Bacon Wrapped Filet Mignon',
//         readyInMinutes: 45,
//         servings: 4,
//         image: 'https://spoonacular.com/recipeImages/633338-556x370.jpg',
//         analyzedInstructions: [
//             {
//                 steps: [
//                     {
//                         number: 1,
//                         step: 'Place the tenderloins on a large dish and wrap a slice of room temperature bacon around each filet, gently stretching the bacon if needed. Secure the ends of the bacon with a toothpick.',
//                     },
//                     {
//                         number: 2,
//                         step: 'Cut the garlic cloves in half and rub both sides of each filet with the cut ends of the garlic. Season well with salt and pepper on both sides.',
//                     },
//                     {
//                         number: 3,
//                         step: 'Pre-heat grill to very hot. With tongs, place each steak on the grill and for medium-rare cook for 3-4 minutes, rotating the steaks halfway through 90 degrees for nice grill marks.',
//                     },
//                     {
//                         number: 4,
//                         step: 'Turn the steaks over and cook another 3-4 minutes.',
//                     },
//                     {
//                         number: 5,
//                         step: 'Remove from the grill and let rest loosely covered for 5 minutes before removing toothpicks and serving.',
//                     },
//                     {
//                         number: 6,
//                         step: 'Serve as is or with sauted garlic mushrooms',
//                     },
//                 ],
//             },
//         ],
//     };

//     const toastConfiguration = {
//         autoClose: 1000,
//         pauseOnFocusLoss: false,
//     };

//     const notifySuccess = (message) => {
//         toast.success(message, toastConfiguration);
//     };

//     const notifyError = (message) => {
//         toast.error(message, toastConfiguration);
//     };

//     const handleSavedRecipe = async (recipe) => {
//         if (!savedRecipes.includes(recipe.id)) {
//             notifySuccess(`${recipe.title} saved`);
//             setSavedRecipes([recipe.id]);
//         } else {
//             notifyError(`${recipe.title} unsaved`);
//             setSavedRecipes([]);
//         }
//     };

//     return (
//         <div className="recipe-page">
//             <ToastContainer limit={1} icon={false} />
//             <div className="recipe-page-header">
//                 <div className="btn-to-back-container">
//                     <button
//                         className="btn-to-back"
//                         onClick={() => history.goBack()}
//                     >
//                         <i className="fa fa-arrow-left fa-2x"></i>
//                     </button>
//                 </div>
//                 <button
//                     className={`btn-handle-saved-recipe ${
//                         recipe && !savedRecipes.includes(recipe.id)
//                             ? 'not-saved'
//                             : 'saved'
//                     }`}
//                     onClick={() => handleSavedRecipe(recipe)}
//                 >
//                     {recipe && !savedRecipes.includes(recipe.id) ? (
//                         <i className="fa fa-heart fa-3x"></i>
//                     ) : (
//                         <i className="fa fa-heart fa-3x"></i>
//                     )}
//                 </button>
//             </div>
//             {recipe && (
//                 <div className="recipe-page-container">
//                     <img src={recipe.image} alt={`${recipe.title}-page-img`} />
//                     <div className="recipe-page-title">{recipe.title}</div>
//                     <ul className="recipe-page-meta">
//                         <li className="recipe-page-meta-info">
//                             Time in minutes{' '}
//                             <span>
//                                 <strong>{recipe.readyInMinutes}</strong>
//                             </span>
//                         </li>
//                         <li className="recipe-page-meta-info">
//                             Serving size{' '}
//                             <span>
//                                 <strong>{recipe.servings}</strong>
//                             </span>
//                         </li>
//                     </ul>
//                     <ul className="recipe-page-filters">
//                         <li className="recipe-page-filter">
//                             Vegetarian
//                             <span>
//                                 {recipe.vegetarian ? (
//                                     <i className="fa fa-check"></i>
//                                 ) : (
//                                     <i className="fa fa-times"></i>
//                                 )}
//                             </span>
//                         </li>
//                         <li className="recipe-page-filter">
//                             Vegan
//                             <span>
//                                 {recipe.vegan ? (
//                                     <i className="fa fa-check"></i>
//                                 ) : (
//                                     <i className="fa fa-times"></i>
//                                 )}
//                             </span>
//                         </li>
//                         <li className="recipe-page-filter">
//                             Gluten Free
//                             <span>
//                                 {recipe.glutenFree ? (
//                                     <i className="fa fa-check"></i>
//                                 ) : (
//                                     <i className="fa fa-times"></i>
//                                 )}
//                             </span>
//                         </li>
//                         <li className="recipe-page-filter">
//                             Dairy Free
//                             <span>
//                                 {recipe.dairyFree ? (
//                                     <i className="fa fa-check"></i>
//                                 ) : (
//                                     <i className="fa fa-times"></i>
//                                 )}
//                             </span>
//                         </li>
//                     </ul>
//                     <ul className="recipe-page-ingredients">
//                         <div className="recipe-page-ingredients-title">
//                             <strong>Ingredients</strong>
//                         </div>
//                         <div className="recipe-page-ingredients-list">
//                             {recipe.extendedIngredients.map(
//                                 (ingredient, index) => (
//                                         <li
//                                             className="recipe-page-ingredient"
//                                             key={index}
//                                         >
//                                             {ingredient.original}
//                                         </li>
//                                     )
//                             )}
//                         </div>
//                     </ul>
//                     <ol className="recipe-page-directions" type="1">
//                         <div className="recipe-page-directions-title">
//                             <strong>Directions</strong>
//                         </div>
//                         {recipe.analyzedInstructions[0].steps.map(
//                             (instruction, index) => (
//                                     <li
//                                         className="recipe-page-direction"
//                                         key={index}
//                                     >
//                                         <div className="recipe-page-direction-step">
//                                             <strong>Step {index + 1}</strong>
//                                         </div>
//                                         {instruction.step}
//                                     </li>
//                                 )
//                         )}
//                     </ol>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RecipePage;
