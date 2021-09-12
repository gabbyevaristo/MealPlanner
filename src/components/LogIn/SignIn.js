import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ handleSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInfoValid, setIsInfoValid] = useState(true);

    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const fetchLogin = async () => {
        const res = await fetch('http://localhost:5000/users/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return res;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetchLogin();

            if (res.ok) {
                const data = await res.json();
                const signedInUser = data.msg;
                handleSignIn(signedInUser);
                history.push('/home');
            } else {
                setIsInfoValid(false);
                setPassword('');
            }
        } catch (err) {
            console.log('SERVER ERROR', err);
        }
    };

    return (
        <div className="sign-in">
            <div className="sign-in-card">
                <div className="sign-in-title">Sign In</div>
                <form onSubmit={handleSubmit}>
                    <div className="sign-in-info">
                        <div className="sign-in-info-box">
                            <span className="sign-in-label">Email</span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="sign-in-info-box">
                            <span className="sign-in-label">Password</span>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>
                    {!isInfoValid && (
                        <div className="error-sign-in">
                            Incorrect email and/or password. Please try again.
                        </div>
                    )}
                    <div className="btn-sign-in">
                        <button type="submit" value="Sign In">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
