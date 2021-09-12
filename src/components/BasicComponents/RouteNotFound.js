import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Footer from './Footer';
import './RouteNotFound.css';

const RouteNotFound = () => {
    const user = useContext(UserContext);

    return (
        <div>
            <div className="not-found-container">
                <img
                    src="https://i.pinimg.com/736x/a8/d1/9b/a8d19bfb6d5172adc87d65908c69137a.jpg"
                    alt="logo"
                />
                <div className="not-found-text">
                    <h1>404</h1>
                    <h4>Page Not Found</h4>
                    <p>
                        The requested URL you are looking for doesn't exist on
                        this server.
                    </p>
                    <Link to={user ? '/home' : '/'} className="btn-go-home">
                        Go to Home
                    </Link>
                </div>
            </div>
            <div className="not-found-footer">
                <Footer />
            </div>
        </div>
    );
};

export default RouteNotFound;
