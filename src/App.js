import { Route } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import './App.css';
import Header from './components/BasicComponents/Header';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/LogIn/SignIn';
import SignUp from './components/LogIn/SignUp';
import Home from './components/Home/Home';

export const UserContext = createContext();

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleSignIn = (user) => {
        setUser(user);
    };

    const handleSignOut = (user) => {
        window.location.reload(true);
        setUser(null);
        localStorage.clear();
    };

    return (
        <UserContext.Provider value={user}>
            <Header handleSignOut={handleSignOut} />
            <Route path="/" exact>
                <LandingPage />
            </Route>
            <Route path="/sign-in">
                <SignIn handleSignIn={handleSignIn} />
            </Route>
            <Route path="/sign-up">
                <SignUp handleSignIn={handleSignIn} />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
        </UserContext.Provider>
    );
}

export default App;
