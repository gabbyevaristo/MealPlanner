import './PantryListItem.css';

const PantryListItem = ({
    item,
    index,
    handleRemoveItem,
    handleCheckedItem,
}) => {
    return (
        <div className="pantry-list-item" key={index}>
            <div className="pantry-list-item-container">
                <span className="pantry-list-item-title">{item}</span>
                <div className="pantry-list-item-inputs">
                    <input
                        type="checkbox"
                        name={`pantry-list-item-${item}`}
                        className="pantry-list-item-btn"
                        onChange={() => handleCheckedItem(item)}
                    />
                    <button
                        className="pantry-list-item-btn"
                        onClick={() => handleRemoveItem(item)}
                    >
                        <i className="fa fa-trash fa-2x"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PantryListItem;
