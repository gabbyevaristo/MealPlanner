import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Logo from './Logo';
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
        closeMenu();
        handleSignOut();
    };

    return (
        <nav className="navbar">
            <Logo closeMenu={closeMenu} />
            <ul className={`nav-links ${isMenuOpen ? 'dropdown' : ''}`}>
                {!user && (
                    <>
                        <li>
                            <Link
                                to="/auth/sign-in"
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/auth/sign-up"
                                className="nav-link"
                                onClick={closeMenu}
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
                                onClick={closeMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/home/pantry"
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                My Pantry
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/home/saved-recipes"
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                Saved Recipes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/home/shopping-list"
                                className="nav-link"
                                onClick={closeMenu}
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
                <span
                    className={`dropdown-bar ${
                        isMenuOpen ? 'dropdown-clicked' : ''
                    }`}
                ></span>
                <span
                    className={`dropdown-bar ${
                        isMenuOpen ? 'dropdown-clicked' : ''
                    }`}
                ></span>
                <span
                    className={`dropdown-bar ${
                        isMenuOpen ? 'dropdown-clicked' : ''
                    }`}
                ></span>
            </Link>
        </nav>
    );
};

export default Header;
