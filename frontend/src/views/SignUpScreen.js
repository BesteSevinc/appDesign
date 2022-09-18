// Anjileen's Code

import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faMagnifyingGlass, faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';

function SignUpScreen() {
    const navigate = useNavigate();

    // set states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwMatch, setPwMatch] = useState(true);

    const { state, dispatch: ctxDispatch } = useContext(Store);

    // function to check passwords match
    const confirmPasswordChecker = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value === password) {
            setPwMatch(true);
        } else {
            setPwMatch(false);
        }
    };

    // function to create a new user account
    const submitHandler = async (e) => {
        e.preventDefault();
        if (confirmPassword !== password) {
            return;
        }

        try {
            setPwMatch(true);
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/profile');
        } catch (err) {
            console.log('Error trying to signup');
        }
    };
    return (
        <main>
            {/* signup form */}
            <h3 className="center">Sign Up</h3>
            <div className="signupContainer">
                <form id="signup" onSubmit={submitHandler}>
                    <div className="signupLeft">
                        <label>Name:</label>
                        <input type="text" name="name" required onChange={(e) => setName(e.target.value)} />
                        <label>Email address:</label>
                        <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                        <label>Password:</label>
                        <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                        <label>Confirm password:</label>
                        <input type="password" name="confirmpassword" required onChange={confirmPasswordChecker} />
                        {!pwMatch && <p className="error">Passwords do not match</p>}
                        <button className="blue" style={{ width: '120px' }}>
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="signupRight">
                    <p className="center">
                        <strong>Why Join Us?</strong>
                    </p>
                    <div className="lightBlueBox">
                        <FontAwesomeIcon icon={faMedal} size="xl" style={{ color: '#465095', paddingRight: '8px' }} />
                        NZ's #1 Board Games Marketplace
                    </div>
                    <div className="lightBlueBox">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: '#465095', paddingRight: '8px' }} />
                        Find fun games to play
                    </div>
                    <div className="lightBlueBox">
                        <FontAwesomeIcon icon={faCheck} size="xl" style={{ color: '#465095', paddingRight: '8px' }} />
                        Plenty of affordable options
                    </div>
                    <div className="lightBlueBox">
                        <FontAwesomeIcon icon={faDollarSign} size="xl" style={{ color: '#465095', paddingRight: '8px' }} />
                        Sell your pre-loved games
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUpScreen;
