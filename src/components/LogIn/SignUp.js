import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ handleSignIn }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [arePasswordsEqual, setArePasswordsEqual] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const history = useHistory();

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
        try {
            const res = await fetch(
                'http://localhost:5000/users/registerUser',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        confirmedPassword,
                    }),
                }
            );
            const data = await res.json();
            if (res.ok) {
                const signedInUser = data.msg;
                localStorage.setItem('user', signedInUser);
                handleSignIn(signedInUser);
                history.push('/home');
            } else {
                if (data.msg === 'EMAIL_EXISTS') {
                    setIsValidEmail(false);
                    setArePasswordsEqual(true);
                    setPassword('');
                    setConfirmedPassword('');
                } else if (data.msg === 'MISMATCHED_PWDS') {
                    setIsValidEmail(true);
                    setArePasswordsEqual(false);
                    setPassword('');
                    setConfirmedPassword('');
                }
            }
        } catch (err) {
            console.log('Server error');
        }
    };

    return (
        <div>
            <div className="sign-up">
                <div className="sign-up-card">
                    <div className="sign-up-title">Sign Up</div>
                    <form onSubmit={handleSubmit}>
                        <div className="user-details">
                            <div className="user-details-box">
                                <span className="sign-up-labels">
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
                            <div className="user-details-box">
                                <span className="sign-up-labels">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="user-details-box">
                                <span className="sign-up-labels">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your password"
                                    minLength="8"
                                    required
                                />
                            </div>
                            <div className="user-details-box">
                                <span className="sign-up-labels">
                                    Confirm Password
                                </span>
                                <input
                                    type="password"
                                    name="confirmedPassword"
                                    value={confirmedPassword}
                                    onChange={handleConfirmedPasswordChange}
                                    placeholder="Enter confirmed password"
                                    required
                                />
                            </div>
                        </div>
                        {!isValidEmail ? (
                            <div className="error-signup">
                                Email already taken. Please try again.
                            </div>
                        ) : !arePasswordsEqual ? (
                            <div className="error-sign-up">
                                Passwords are not the same. Please try again.
                            </div>
                        ) : (
                            <></>
                        )}
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
