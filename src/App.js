import { useState, createContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/BasicComponents/Header';
import LandingPage from './components/LandingPage/LandingPage';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import RouteNotFound from './components/BasicComponents/RouteNotFound';
import './App.css';

export const UserContext = createContext();

function App() {
    const [user, setUser] = useState(localStorage.getItem('user'));

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
            <Switch>
                <Route path="/" exact>
                    <LandingPage />
                </Route>
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
                <Route component={RouteNotFound} />
            </Switch>
        </UserContext.Provider>
    );
}

export default App;
