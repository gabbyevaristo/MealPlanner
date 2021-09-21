import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './GeneralSearchBox.css';

const GeneralSearchBox = () => {
    const history = useHistory();

    const [recipeSearch, setRecipeSearch] = useState('');
    const [cuisineValue, setCuisineValue] = useState('');
    const [mealTypeValue, setMealTypeValue] = useState('');
    const [dietValue, setDietValue] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const cuisines = [
        'African',
        'American',
        'British',
        'Cajun',
        'Caribbean',
        'Chinese',
        'Eastern European',
        'European',
        'French',
        'German',
        'Greek',
        'Indian',
        'Irish',
        'Italian',
        'Japanese',
        'Korean',
        'Latin American',
        'Mediterranean',
        'Mexican',
        'Middle Eastern',
        'Southern',
        'Spanish',
        'Thai',
        'Vietnamese',
    ];

    const mealType = [
        'Appetizer',
        'Beverage',
        'Breakfast',
        'Dessert',
        'Main course',
        'Salad',
        'Side dish',
        'Soup',
    ];

    const diets = [
        'Gluten Free',
        'Ketogenic',
        'Paleo',
        'Pescetarian',
        'Vegan',
        'Vegetarian',
    ];

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleRecipeSearchChange = (e) => {
        setRecipeSearch(e.target.value);
    };

    const handleCuisineChange = (e) => {
        setCuisineValue(e.target.value);
    };

    const handleMealTypeChange = (e) => {
        setMealTypeValue(e.target.value);
    };

    const handleDietChange = (e) => {
        setDietValue(e.target.value);
    };

    return (
        <div className="general-search-container">
            <div className="general-search-header">
                <div className="general-search-title">
                    <strong>Search for a dish</strong>
                </div>
                <button onClick={toggleFilter}>
                    {isFilterOpen ? 'Close' : 'Open'} Filter
                </button>
            </div>

            <div className="recipe-search-container">
                <div className="recipe-search-input">
                    <input
                        type="text"
                        name="recipeSearch"
                        value={recipeSearch}
                        onChange={handleRecipeSearchChange}
                        placeholder=">"
                        required
                    />
                </div>
                <Link
                    to={`/home/general-search/${[
                        recipeSearch,
                        cuisineValue,
                        mealTypeValue,
                        dietValue,
                    ].join()}`}
                    className="btn-to-general-recipes"
                >
                    Search
                </Link>
            </div>
            {isFilterOpen && (
                <div className="filter-container">
                    <div className="filter-title">
                        <strong>Filters</strong>
                    </div>
                    <div className="filter-boxes">
                        <div className="filter-box">
                            <span className="filter-label">Cuisine</span>
                            <select
                                name="cuisines"
                                id="cuisines"
                                onChange={handleCuisineChange}
                            >
                                <option label=" "></option>
                                {cuisines.map((cuisine, index) => (
                                    <option value={cuisine} key={index}>
                                        {cuisine}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-box">
                            <span className="filter-label">Type</span>
                            <select
                                name="mealType"
                                id="mealType"
                                onChange={handleMealTypeChange}
                            >
                                <option label=" "></option>
                                {mealType.map((type, index) => (
                                    <option value={type} key={index}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-box">
                            <span className="filter-label">Diet</span>
                            <select
                                name="diets"
                                id="diets"
                                onChange={handleDietChange}
                            >
                                <option label=" "></option>
                                {diets.map((diet, index) => (
                                    <option value={diet} key={index}>
                                        {diet}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneralSearchBox;
