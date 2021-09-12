import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Hero.css';

const Hero = ({ closeMenu }) => {
    const user = useContext(UserContext);

    return (
        <div className="hero">
            <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                alt="hero"
            />
            <div className="hero-container">
                <div className="hero-content">
                    <div className="slogan">Make the most of your pantry!</div>
                    {!user && (
                        <Link
                            to="/auth/sign-up"
                            className="btn-get-started"
                            onClick={closeMenu}
                        >
                            Get Started Now
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
