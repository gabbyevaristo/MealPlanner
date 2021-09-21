import { useContext } from 'react';
import { UserContext } from '../../../App';
import GeneralSearchBox from './GeneralSearchBox';
import PopularRecipes from './PopularRecipes';
import './Home.css';

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="home">
            <div className="home-welcome">
                Welcome {user.name.split(' ')[0]}
            </div>
            <div className="home-general-search-container">
                <GeneralSearchBox />
            </div>
            <PopularRecipes />
        </div>
    );
};

export default Home;
