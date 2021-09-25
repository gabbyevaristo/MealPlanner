import PantryList from './PantryList';
import './Pantry.css';

const Pantry = () => {
    return (
        <div className="pantry">
            <div className="pantry-container">
                <div className="pantry-title">
                    My <span>Pantry</span>
                </div>
                <PantryList />
            </div>
        </div>
    );
};

export default Pantry;
