import { useState, createContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { About, Header, RouteNotFound } from 'components/BasicComponents';
import { LandingPage } from 'components/LandingPage';
import { AuthenticatedRoute, UnauthenticatedRoute } from 'components';
import './App.css';

export const IngredientContext = createContext();
export const UserContext = createContext();

function App() {
    const localUser = JSON.parse(localStorage.getItem('user')) || null;
    const [user, setUser] = useState(localUser);
    const contextValue = { user, setUser };
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        try {
            const loadIngredients = async () => {
                const res = await fetch(`/recipe/getAllIngredients`, {
                    method: 'GET',
                });

                const data = await res.json();
                setIngredients(data);
            };
            loadIngredients();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleSignIn = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const handleSignUp = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const handleSignOut = (user) => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <IngredientContext.Provider value={ingredients}>
            <UserContext.Provider value={contextValue}>
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
                    <Route path="/about" exact>
                        <About />
                    </Route>
                    <Route component={RouteNotFound} />
                </Switch>
            </UserContext.Provider>
        </IngredientContext.Provider>
    );
}

export default App;
