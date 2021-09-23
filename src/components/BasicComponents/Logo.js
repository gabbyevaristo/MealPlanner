import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ closeMenu }) => {
    return (
        <div className="logo">
            <img
                src="https://i.pinimg.com/736x/a8/d1/9b/a8d19bfb6d5172adc87d65908c69137a.jpg"
                alt="logo"
            />
            <Link to="/" className="logo-link" onClick={closeMenu}>
                My<span>Kitchen</span>
            </Link>
        </div>
    );
};

export default Logo;
