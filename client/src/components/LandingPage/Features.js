import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './Features.css';

const Features = () => {
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    return (
        <div className="features">
            <div className="feature-title">The Benefits</div>
            <div className="feature-cards">
                <div className="feature-card" data-aos="zoom-in">
                    <div className="feature-card-text">
                        <h4>Keep everything organized!</h4>
                        Manage your pantry and shopping list.
                    </div>
                </div>
                <div className="feature-card" data-aos="zoom-in">
                    <div className="feature-card-text">
                        <h4>Want something new to make?</h4>
                        Search from thousands of different recipes.
                    </div>
                </div>
                <div className="feature-card" data-aos="zoom-in">
                    <div className="feature-card-text">
                        <h4>Dietary restrictions? No problem!</h4>
                        Filter recipes based off of your diet.
                    </div>
                </div>
                <div className="feature-card" data-aos="zoom-in">
                    <div className="feature-card-text">
                        <h4>Tired of takeout?</h4>
                        Find recipes based off of ingredients in your pantry.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
