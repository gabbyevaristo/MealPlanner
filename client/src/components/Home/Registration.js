import { Link } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
    return (
        <div className="registration-container">
            <div className="registration-content">
                <div className="registration-title">
                    <strong>Thanks for registering!</strong>
                </div>
                <div className="registration-links">
                    Search for recipes on your {''}
                    <Link to="/home" className="registration-link">
                        home page
                    </Link>
                    {''} or start adding ingredients to your {''}
                    <Link to="/home/pantry" className="registration-link">
                        pantry
                    </Link>
                    .
                </div>
            </div>
        </div>
    );
};

export default Registration;
