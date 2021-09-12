import { useState, useEffect, createContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/BasicComponents/Header';
import LandingPage from './components/LandingPage/LandingPage';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import './App.css';

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
        localStorage.setItem('user', user);
        setUser(user);
    };

    const handleSignUp = (user) => {
        localStorage.setItem('user', user);
        setUser(user);
    };

    const handleSignOut = (user) => {
        localStorage.clear();
        setUser(null);
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
                    render={(props) =>
                        !user ? (
                            <UnauthenticatedRoute
                                handleSignIn={handleSignIn}
                                handleSignUp={handleSignUp}
                            />
                        ) : (
                            <Redirect to="/home" />
                        )
                    }
                />
                <Route
                    path="/home"
                    render={(props) =>
                        user ? <AuthenticatedRoute /> : <Redirect to="/" />
                    }
                />
            </Switch>
        </UserContext.Provider>
    );
}

export default App;
