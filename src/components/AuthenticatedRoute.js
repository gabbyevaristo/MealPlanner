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
            <Route path="/home/pantry">
                <Pantry />
            </Route>
            <Route path="/home/explore">
                <Explore />
            </Route>
            <Route path="/home/savedRecipes">
                <SavedRecipes />
            </Route>
            <Route path="/home/shoppingList">
                <ShoppingList />
            </Route>
        </div>
    );
};

export default AuthenticatedRoute;
