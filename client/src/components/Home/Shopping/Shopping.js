import ShoppingList from './ShoppingList';
import './Shopping.css';

const Shopping = () => {
    return (
        <div className="shopping">
            <div className="shopping-container">
                <div className="shopping-title">
                    My <span>Shopping List</span>
                </div>
                <ShoppingList />
            </div>
        </div>
    );
};

export default Shopping;
