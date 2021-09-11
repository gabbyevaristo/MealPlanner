import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Logo from './Logo';
import { UserContext } from '../../App';
import './Header.css';

const Header = ({ handleSignOut }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useContext(UserContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const signOut = () => {
        toggleMenu();
        handleSignOut();
    };

    return (
        <nav className="navbar">
            <Logo closeMenu={closeMenu} />
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                {!user && (
                    <>
                        <li>
                            <Link
                                to="/auth/sign-in"
                                className="nav-link"
                                onClick={toggleMenu}
                            >
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/auth/sign-up"
                                className="nav-link"
                                onClick={toggleMenu}
                            >
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <Link
                                to="/home"
                                className="nav-link"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/home/pantry"
                                className="nav-link"
                                onClick={toggleMenu}
                            >
                                My Pantry
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/home/explore"
                                className="nav-link"
                                onClick={toggleMenu}
                            >
                                Explore
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/home/savedRecipes"
                                className="nav-link"
                                onClick={toggleMenu}
                            >
                                Saved Recipes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/home/shoppingList"
                                className="nav-link"
                                onClick={toggleMenu}
                            >
                                Shopping List
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-link" onClick={signOut}>
                                Sign Out
                            </Link>
                        </li>
                    </>
                )}
            </ul>
            <Link to="#" className="btn-dropdown" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </Link>
        </nav>
    );
};

export default Header;
