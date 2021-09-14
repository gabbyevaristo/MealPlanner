import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Pantry from './Home/Pantry/Pantry';
import SavedRecipes from './Home/SavedRecipes';
import ShoppingList from './Home/ShoppingList';
import FilteredRecipes from './Home/Pantry/FilteredRecipes';
import RouteNotFound from './BasicComponents/RouteNotFound';
import Footer from './BasicComponents/Footer';

const AuthenticatedRoute = () => {
    const [checkedPantryItems, setCheckedPantryItems] = useState([]);

    const handleCheckedItem = (item) => {
        if (checkedPantryItems.includes(item)) {
            const items = checkedPantryItems.filter(
                (pantryItem) => pantryItem !== item
            );
            setCheckedPantryItems(items);
        } else {
            setCheckedPantryItems([...checkedPantryItems, item]);
        }
    };

    const clearPantryItems = () => {
        setCheckedPantryItems([]);
    };

    return (
        <div>
            <Switch>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/home/pantry" exact>
                    <Pantry
                        handleCheckedItem={handleCheckedItem}
                        checkedPantryItems={checkedPantryItems}
                    />
                </Route>
                <Route path="/home/saved-recipes" exact>
                    <SavedRecipes />
                </Route>
                <Route path="/home/shopping-list" exact>
                    <ShoppingList />
                </Route>
                <Route path="/home/filtered-recipes" exact>
                    <FilteredRecipes
                        checkedPantryItems={checkedPantryItems}
                        clearPantryItems={clearPantryItems}
                    />
                </Route>
                <Route component={RouteNotFound} />
            </Switch>
            <Footer />
        </div>
    );
};

export default AuthenticatedRoute;
