import { useState } from 'react';
import Header from './Header.js';
import './SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmedPasswordChange = (e) => {
        setConfirmedPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/users/registerUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (res.ok) {
            console.log('User registered!');
        } else {
            console.log('User not registered');
        }
    };

    return (
        <div>
            <Header />
            <div className="container-sign-up">
                <div className="card-sign-up">
                    <div className="title-sign-up">Sign Up</div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="labels-sign-up">
                                    Full Name
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="labels-sign-up">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="labels-sign-up">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your password"
                                    minlength="8"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="labels-sign-up">
                                    Confirm Password
                                </span>
                                <input
                                    type="password"
                                    name="confirmedPassword"
                                    value={confirmedPassword}
                                    onChange={handleConfirmedPasswordChange}
                                    placeholder="Enter confirmed password"
                                    minlength="8"
                                    required
                                />
                            </div>
                        </div>
                        <div className="btn-sign-up">
                            <button type="submit" value="Register">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
