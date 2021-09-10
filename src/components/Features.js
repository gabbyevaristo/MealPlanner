import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './Features.css';

const Features = () => {
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    return (
        <div className="cards">
            <div className="card-container">
                <div className="card" data-aos="zoom-in">
                    <div className="card-content">
                        <h4>Breakfast, Lunch, or Dinner?</h4>
                        Plan meals by dish types. Are you looking for breakfast,
                        lunch or dinner? All of the above? We've got your
                        covered!
                    </div>
                </div>
            </div>
            <div className="card-container">
                <div className="card" data-aos="zoom-in">
                    <div className="card-content">
                        <h4>On a Budget?</h4>
                        By planning out your meals ahead of time, you'll spend
                        less time going to the store. Less time at the store
                        means less money you're.
                    </div>
                </div>
            </div>
            <div className="card-container">
                <div className="card" data-aos="zoom-in">
                    <div className="card-content">
                        <h4>Dietary Restrictions? No Problem!</h4>
                        Tailor your recipes to your dietary needs.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
