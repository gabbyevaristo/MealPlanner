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
            <div className="feature-title">Make the most of your pantry!</div>
            <div className="feature-cards">
                <div className="feature-card-container">
                    <div className="feature-card" data-aos="zoom-in">
                        <div className="feature-card-content">
                            <h4>Breakfast, Lunch, or Dinner?</h4>
                            By planning out your meals ahead of time, you'll
                            spend less time going to the store. Less time at the
                            store means less money you're.
                        </div>
                    </div>
                </div>
                <div className="feature-card-container">
                    <div className="feature-card" data-aos="zoom-in">
                        <div className="feature-card-content">
                            <h4>On a Budget?</h4>
                            By planning out your meals ahead of time, you'll
                            spend less time going to the store. Less time at the
                            store means less money you're.
                        </div>
                    </div>
                </div>
                <div className="feature-card-container">
                    <div className="feature-card" data-aos="zoom-in">
                        <div className="feature-card-content">
                            <h4>Dietary Restrictions? No Problem!</h4>
                            By planning out your meals ahead of time, you'll
                            spend less time going to the store. Less time at the
                            store means less money you're.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
