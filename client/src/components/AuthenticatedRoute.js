import { Route, Switch } from 'react-router-dom';
import { Home, GeneralSearch } from './Home';
import { Pantry } from './Pantry';
import { FilteredRecipes, RecipePage, SavedRecipes } from './Recipe';
import { Shopping } from './Shopping';
import { Footer, Registration, RouteNotFound } from './BasicComponents';

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
