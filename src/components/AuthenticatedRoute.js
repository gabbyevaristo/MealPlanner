import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Pantry from './Home/Pantry';
import SavedRecipes from './Home/SavedRecipes';
import ShoppingList from './Home/ShoppingList';
import RouteNotFound from './BasicComponents/RouteNotFound';

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
                <Route component={RouteNotFound} />
            </Switch>
        </div>
    );
};

export default AuthenticatedRoute;
