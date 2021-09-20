import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import RecipeCard from './Recipe/RecipeCard';
import './Home.css';

const Home = () => {
    const { user } = useContext(UserContext);

    const [popularRecipes, setPopularRecipes] = useState([
        {
            id: 665620,
            title: 'Zabaglione with Roasted Plums',
            image: 'https://spoonacular.com/recipeImages/665620-312x231.jpg',
        },
        {
            id: 635315,
            title: 'Blood Orange Margarita',
            image: 'https://spoonacular.com/recipeImages/635315-312x231.jpg',
        },
        {
            id: 635260,
            title: 'Blackcurrant Sauce',
            image: 'https://spoonacular.com/recipeImages/635260-312x231.jpg',
        },
        {
            id: 1155776,
            title: 'Easy Homemade Chocolate Truffles',
            image: 'https://spoonacular.com/recipeImages/1155776-312x231.jpg',
        },
        {
            id: 664089,
            title: 'Turkish Delight',
            image: 'https://spoonacular.com/recipeImages/664089-312x231.jpg',
        },
        {
            id: 635778,
            title: 'Boysenberry Syrup',
            image: 'https://spoonacular.com/recipeImages/635778-312x231.jpg',
        },
        {
            id: 660400,
            title: 'Smoky Baby Back Ribs',
            image: 'https://spoonacular.com/recipeImages/660400-312x231.jpg',
        },
        {
            id: 665573,
            title: 'Yorkshire Pudding',
            image: 'https://spoonacular.com/recipeImages/665573-312x231.jpg',
        },
        {
            id: 633338,
            title: 'Bacon Wrapped Filet Mignon',
            image: 'https://spoonacular.com/recipeImages/633338-312x231.jpg',
        },
    ]);

    // const [popularRecipes, setPopularRecipes] = useState([]);

    // useEffect(() => {
    //     try {
    //         const loadPopularRecipes = async () => {
    //             const res = await fetch(`http://localhost:5000/recipe/random`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ amount: 8, tags: '' }),
    //             });
    //             const data = await res.json();
    //             setPopularRecipes(data);
    //         };
    //         loadPopularRecipes();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, []);

    return (
        <div className="home">
            <div className="home-welcome">Welcome {user.name}</div>
            <div className="complex-search-container">
                <div className="complex-search-title"></div>
            </div>
            <div className="popular-recipes-container">
                <div className="popular-recipes-title">Popular Recipes</div>
                {popularRecipes && popularRecipes.length !== 0 && (
                    <div className="popular-recipes">
                        {popularRecipes.map((recipe, index) => (
                            <div className="popular-recipe" key={index}>
                                <RecipeCard
                                    recipe={recipe}
                                    inSavedRecipe={false}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
