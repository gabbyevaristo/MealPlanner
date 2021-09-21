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
                <div className="feature-card" data-aos="zoom-in">
                    <div className="feature-card-img">
                        <img src="https://www.pngkit.com/png/detail/426-4265355_dinner-clipart-black-and-white-free-food-clip.png" />
                    </div>
                    <div className="feature-card-text">
                        <h4>Breakfast, Lunch, or Dinner?</h4>
                        Or steak, or fish, or plant protein.
                    </div>
                </div>
                <div className="feature-card" data-aos="zoom-in">
                    <div className="feature-card-img">
                        <img src="https://www.pngkit.com/png/detail/426-4265355_dinner-clipart-black-and-white-free-food-clip.png" />
                    </div>
                    <div className="feature-card-text">
                        <h4>On a Budget?</h4>
                        Skipping weeks or cancelling is super easy
                    </div>
                </div>
                <div className="feature-card" data-aos="zoom-in">
                    <div className="feature-card-img">
                        <img src="https://www.pngkit.com/png/detail/426-4265355_dinner-clipart-black-and-white-free-food-clip.png" />
                    </div>
                    <div className="feature-card-text">
                        <h4>Dietary Restrictions? No Problem!</h4>
                        Our huge recipe selection wows week after week.
                    </div>
                </div>
                <div className="feature-card" data-aos="zoom-in">
                    <div className="feature-card-img">
                        <img src="https://www.pngkit.com/png/detail/426-4265355_dinner-clipart-black-and-white-free-food-clip.png" />
                    </div>
                    <div className="feature-card-text">
                        <h4>Dietary Restrictions? No Problem!</h4>
                        Chef-created deliciousness from $7.49 per meal.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
