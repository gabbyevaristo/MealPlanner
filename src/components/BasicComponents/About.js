import Footer from './Footer';
import './About.css';

const About = () => {
    return (
        <div className="about">
            <div className="about-img-container">
                <img
                    src="https://i.pinimg.com/736x/93/3a/88/933a88539897ac96d71b65c27122b3ec.jpg"
                    alt="hero"
                />
                <div className="about-img-content">
                    <strong>About MealPlanner</strong>
                </div>
            </div>
            <div className="about-content-container">
                <div className="about-title">
                    An inside look to what dorm life is really like
                </div>
                <div className="about-content">
                    We have collected 3,428 reviews for over a thousand dorms,
                    making us the largest platform for college dorm reviews. We
                    offer access to real reviews so that students can make
                    well-informed decisions as they search for their next dorm.
                    We hope to revolutionize the housing decision process and
                    become the go to platform for college students in every
                    school. Want to share your story? Pay it forward to your
                    student community. <br />
                    <br /> RateMyDorm was founded and developed in 2020 by Jed
                    Caluag.
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
