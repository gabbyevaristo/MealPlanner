import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ handleSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/users/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                const data = await res.json();
                const signedInUser = data.msg;
                localStorage.setItem('user', signedInUser);
                handleSignIn(signedInUser);
                history.push('/home');
            } else {
                setIsValid(false);
                setPassword('');
            }
        } catch (err) {
            console.log('Server error');
        }
    };

    return (
        <div>
            <div className="sign-in">
                <div className="sign-in-card">
                    <div className="sign-in-title">Sign In</div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-info">
                            <div className="user-info-box">
                                <span className="sign-in-labels">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="user-info-box">
                                <span className="sign-in-labels">Password</span>
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
                        {!isValid && (
                            <div className="error-sign-in">
                                Incorrect email and/or password. Please try
                                again.
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
        </div>
    );
};

export default SignIn;
