import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header.js';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/users/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            history.push('/profile');
        } else {
            setShowError(true);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div>
            <Header />
            <div className="container-sign-in">
                <div className="card-sign-in">
                    <div className="title-sign-in">Sign In</div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-info">
                            <div className="user-info-box">
                                <span className="labels-sign-in">Email</span>
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
                                <span className="labels-sign-in">Password</span>
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
                        {showError && (
                            <div className="error">
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
