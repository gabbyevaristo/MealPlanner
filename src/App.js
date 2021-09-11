import { Route, Switch } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import './App.css';
import Header from './components/BasicComponents/Header';
import LandingPage from './components/LandingPage/LandingPage';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';

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
        setUser(null);
        localStorage.clear();
    };

    return (
        <UserContext.Provider value={user}>
            <Header handleSignOut={handleSignOut} />
            <Route path="/" exact>
                <LandingPage />
            </Route>
            <Switch>
                <Route
                    path="/auth"
                    render={(props) => (
                        <UnauthenticatedRoute handleSignIn={handleSignIn} />
                    )}
                />
                <Route
                    path="/home"
                    render={(props) => <AuthenticatedRoute />}
                />
            </Switch>
        </UserContext.Provider>
    );
}

export default App;
