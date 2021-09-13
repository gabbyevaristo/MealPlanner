import { useState, createContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/BasicComponents/Header';
import LandingPage from './components/LandingPage/LandingPage';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import RouteNotFound from './components/BasicComponents/RouteNotFound';
import './App.css';

export const IngredientContext = createContext();
export const UserContext = createContext();

function App() {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        try {
            const loadIngredients = async () => {
                const res = await fetch(
                    'http://localhost:5000/recipe/getAllIngredients',
                    {
                        method: 'GET',
                    }
                );
                const data = await res.json();
                setIngredients(data);
            };
            loadIngredients();
        } catch (err) {
            console.log(err);
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
        <IngredientContext.Provider value={ingredients}>
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
        </IngredientContext.Provider>
    );
}

export default App;
