import { Route, Switch } from 'react-router-dom';
import SignIn from './LogIn/SignIn';
import SignUp from './LogIn/SignUp';

const UnauthenticatedRoute = ({ handleSignIn }) => {
    return (
        <div>
            <Switch>
                <Route path="/auth/sign-in" exact>
                    <SignIn handleSignIn={handleSignIn} />
                </Route>
                <Route path="/auth/sign-up">
                    <SignUp handleSignIn={handleSignIn} />
                </Route>
            </Switch>
        </div>
    );
};

export default UnauthenticatedRoute;
