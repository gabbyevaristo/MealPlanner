import { Route, Switch } from 'react-router-dom';
import SignIn from './LogIn/SignIn';
import SignUp from './LogIn/SignUp';
import RouteNotFound from './BasicComponents/RouteNotFound';

const UnauthenticatedRoute = ({ handleSignIn, handleSignUp }) => {
    return (
        <div>
            <Switch>
                <Route path="/auth/sign-in" exact>
                    <SignIn handleSignIn={handleSignIn} />
                </Route>
                <Route path="/auth/sign-up" exact>
                    <SignUp handleSignUp={handleSignUp} />
                </Route>
                <Route component={RouteNotFound} />
            </Switch>
        </div>
    );
};

export default UnauthenticatedRoute;
