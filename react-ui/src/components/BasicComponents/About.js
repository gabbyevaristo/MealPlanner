import { useEffect } from 'react';
import Footer from './Footer';
import './About.css';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about">
            <div className="about-img-container">
                <img
                    src="https://i.pinimg.com/736x/93/3a/88/933a88539897ac96d71b65c27122b3ec.jpg"
                    alt="hero"
                />
                <div className="about-img-content">
                    <strong>
                        About My<span>Kitchen</span>
                    </strong>
                </div>
            </div>
            <div className="about-content-container">
                <div className="about-title">
                    How meal planning is made easy
                </div>
                <div className="about-content">
                    MyKitchen provides users the ability to view popular
                    recipes, search through recipes of different cuisines, and
                    manage their pantry and shopping list. Want to find a recipe
                    based off of ingredients in your pantry? MyKitchen can do it
                    for you. See a recipe you like, but don't have all the
                    ingredients for? MyKitchen can add those missing ingredients
                    to your shopping list at the click of a button. Need a
                    recipe that prioritizes dietary restrictions? MyKitchen's
                    advanced search allows you to do that. With this, we aim to
                    make pantry organization, meal planning, and cooking as
                    simple as possible.
                    <br />
                    <br /> MyKitchen was founded and developed by Gabrielle
                    Evaristo.
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
