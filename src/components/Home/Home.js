import { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../App';

const Home = () => {
    const user = useContext(UserContext);

    return <div className="sign-in">HOME</div>;
};

export default Home;
