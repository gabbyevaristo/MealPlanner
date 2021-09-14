import PantryList from './PantryList';
import './Pantry.css';

const Pantry = ({ handleCheckedItem, checkedPantryItems }) => {
    return (
        <div className="pantry">
            <div className="pantry-container">
                <div className="pantry-title">
                    My <span>Pantry</span>
                </div>
                <PantryList
                    handleCheckedItem={handleCheckedItem}
                    checkedPantryItems={checkedPantryItems}
                />
            </div>
        </div>
    );
};

export default Pantry;
