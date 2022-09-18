// Anjileen's Code

import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Link } from 'react-router-dom';

function SignInScreen() {
    const navigate = useNavigate();

    // set states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwMatch, setPwMatch] = useState(true);

    const { state, dispatch: ctxDispatch } = useContext(Store);

    // function to sign user in
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/users/signin', {
                email,
                password
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/profile');
        } catch (err) {
            console.log('Invalid email or password');
            setPwMatch(false);
        }
    };
    return (
        <div>
            {/* signin form */}
            <h3 className="center">Login</h3>
            <form id="login" onSubmit={submitHandler}>
                <label className="center">Email address:</label>
                <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                <label className="center">Password:</label>
                <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                {!pwMatch && <p className="error">Incorrect password. Try again.</p>}
                <button className="blue">Log In</button>
            </form>
            <p className="small center">
                Don't have an account?{' '}
                <span className="underline">
                    <Link to="/signup">Sign Up</Link>
                </span>
            </p>
        </div>
    );
}

export default SignInScreen;
