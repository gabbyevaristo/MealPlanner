import { Link } from 'react-router-dom';
import Logo from './Logo.js';
import './Header.css';

const Header = () => {
    return (
        <nav className="navbar">
            <Logo />
            <ul className="nav-links">
                <li>
                    <Link to="/sign-in" className="nav-link">
                        Sign In
                    </Link>
                </li>
                <li>
                    <Link to="/sign-up" className="nav-link">
                        Sign Up
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
