import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Logo />
            <div className="footer-links-container">
                <div className="footer-links">
                    <Link to="/about" className="footer-link">
                        About Us
                    </Link>
                </div>
                {/* <div className="footer-links">
                    <Link to="/contact" className="footer-link">
                        Contact
                    </Link>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;
