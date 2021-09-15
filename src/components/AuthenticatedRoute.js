import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Pantry from './Home/Pantry/Pantry';
import SavedRecipes from './Home/SavedRecipes';
import ShoppingList from './Home/ShoppingList';
import FilteredRecipes from './Home/Recipe/FilteredRecipes';
import RecipePage from './Home/Recipe/RecipePage';
import RouteNotFound from './BasicComponents/RouteNotFound';
import Footer from './BasicComponents/Footer';

const AuthenticatedRoute = () => {
    return (
        <div>
            <Switch>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/home/pantry" exact>
                    <Pantry />
                </Route>
                <Route path="/home/saved-recipes" exact>
                    <SavedRecipes />
                </Route>
                <Route path="/home/shopping-list" exact>
                    <ShoppingList />
                </Route>
                <Route path="/home/filtered-recipes/:selectedPantryItems">
                    <FilteredRecipes />
                </Route>
                <Route path="/home/recipe/:recipeId">
                    <RecipePage />
                </Route>
                <Route component={RouteNotFound} />
            </Switch>
            <Footer />
        </div>
    );
};

export default AuthenticatedRoute;
