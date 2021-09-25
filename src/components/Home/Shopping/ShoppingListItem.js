import './ShoppingListItem.css';

const ShoppingListItem = ({
    item,
    index,
    handleRemoveShoppingItem,
    handleAddPantryItem,
}) => {
    return (
        <div className="shopping-list-item" key={index}>
            <div className="shopping-list-item-container">
                <span className="shopping-list-item-title">{item}</span>
                <div className="shopping-list-item-inputs">
                    <button
                        className="shopping-list-item-btn"
                        title="Add to pantry"
                        onClick={() => handleAddPantryItem(item)}
                    >
                        <i className="fa fa-plus fa-lg"></i>
                    </button>
                    <button
                        className="shopping-list-item-btn"
                        title="Remove from shopping list"
                        onClick={() => handleRemoveShoppingItem(item)}
                    >
                        <i className="fa fa-trash fa-2x"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingListItem;
