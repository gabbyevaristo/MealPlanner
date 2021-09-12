import { Route } from 'react-router-dom';
import Home from './Home/Home';
import Pantry from './Home/Pantry';
import Explore from './Home/Explore';
import SavedRecipes from './Home/SavedRecipes';
import ShoppingList from './Home/ShoppingList';

const AuthenticatedRoute = () => {
    return (
        <div>
            <Route path="/home" exact>
                <Home />
            </Route>
            <Route path="/home/pantry" exact>
                <Pantry />
            </Route>
            <Route path="/home/explore" exact>
                <Explore />
            </Route>
            <Route path="/home/saved-recipes" exact>
                <SavedRecipes />
            </Route>
            <Route path="/home/shopping-list" exact>
                <ShoppingList />
            </Route>
        </div>
    );
};

export default AuthenticatedRoute;
