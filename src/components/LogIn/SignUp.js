import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ handleSignUp }) => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [arePasswordsEqual, setArePasswordsEqual] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);

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

    const fetchRegister = async () => {
        const res = await fetch('http://localhost:5000/users/registerUser', {
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
        });
        return res;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetchRegister();
            const data = await res.json();

            if (res.ok) {
                const registeredUser = data.msg;
                handleSignUp(registeredUser);
                history.push('/home');
            } else {
                if (data.msg === 'EMAIL_EXISTS') {
                    setIsEmailValid(false);
                    setArePasswordsEqual(true);
                } else if (data.msg === 'MISMATCHED_PWDS') {
                    setIsEmailValid(true);
                    setArePasswordsEqual(false);
                }
                setPassword('');
                setConfirmedPassword('');
            }
        } catch (err) {
            console.log('SERVER ERROR', err);
        }
    };

    return (
        <div className="sign-up">
            <div className="sign-up-card">
                <div className="sign-up-title">Sign Up</div>
                <form onSubmit={handleSubmit}>
                    <div className="sign-up-info">
                        <div className="sign-up-info-box">
                            <span className="sign-up-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="sign-up-info-box">
                            <span className="sign-up-label">Email</span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="sign-up-info-box">
                            <span className="sign-up-label">Password</span>
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
                        <div className="sign-up-info-box">
                            <span className="sign-up-label">
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
                    {!isEmailValid ? (
                        <div className="error-sign-up">
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
    );
};

export default SignUp;
