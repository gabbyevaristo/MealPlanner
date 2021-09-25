import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home/Home';
import GeneralSearch from './Home/Home/GeneralSearch';
import Pantry from './Home/Pantry/Pantry';
import SavedRecipes from './Home/SavedRecipes';
import Shopping from './Home/Shopping/Shopping';
import FilteredRecipes from './Home/Recipe/FilteredRecipes';
import RecipePage from './Home/Recipe/RecipePage';
import Registration from './Home/Registration';
import RouteNotFound from './BasicComponents/RouteNotFound';
import Footer from './BasicComponents/Footer';

const AuthenticatedRoute = () => {
    return (
        <div>
            <Switch>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/home/registration" exact>
                    <Registration />
                </Route>
                <Route path="/home/general-search/:queries" exact>
                    <GeneralSearch />
                </Route>
                <Route path="/home/pantry" exact>
                    <Pantry />
                </Route>
                <Route path="/home/saved-recipes" exact>
                    <SavedRecipes />
                </Route>
                <Route path="/home/shopping-list" exact>
                    <Shopping />
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
