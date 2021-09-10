import { Link } from 'react-router-dom';
import Logo from './Logo.js';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Logo />
            <div>
                <div className="links">
                    <Link to="/about" className="link">
                        About
                    </Link>
                </div>
                <div className="links">
                    <Link to="/contact" className="link">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
