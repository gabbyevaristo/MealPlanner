import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Hero.css';

const Hero = ({ closeMenu }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="hero">
            <img
                src="https://format-com-cld-res.cloudinary.com/image/private/s--yU5hjwQS--/c_limit,g_center,h_1200,w_65535/fl_keep_iptc.progressive,q_95/v1/1a734fc5206bed55cf9be93c30ed8e52/RamenFeatured-1.jpg"
                alt="hero"
            />
            <div className="hero-container">
                <div className="hero-content">
                    <div className="slogan">
                        <strong>Make the most of your pantry!</strong>
                    </div>
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
