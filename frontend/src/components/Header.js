// Anjileen's Code

import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Store } from '../Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// header
function Header() {
    // use context
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    // remove userInfo from local storage on signout
    const signOutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    // states for mobile menu toggle
    const [toggleMenu, setToggleMenu] = useState(false);
    const [displayStyle, setDisplayStyle] = useState({ display: 'none' });

    // function to show or hide toggle menu
    const hamburgerMenu = () => {
        setToggleMenu(!toggleMenu);

        if (toggleMenu === true) {
            setDisplayStyle({ display: 'block' });
        } else {
            setDisplayStyle({ display: 'none' });
        }
    };

    // function to close toggle menu
    const closeMenu = () => {
        setDisplayStyle({ display: 'none' });
    };

    return (
        <header>
            <div className="topContainer">
                {/* logo */}
                <div className="logo">
                    <img src="/images/logoicon.png" alt="logo"/>
                    <Link to="/">BoardHoard</Link>
                </div>
                <div className="topContainer__right">
                    {/* signup and login links */}
                    <div className="userLinks">
                        {userInfo ? (
                            <>
                                <Link to="/signout" onClick={signOutHandler}>
                                    Logout
                                </Link>
                                <span className="profile">
                                    <Link to="/profile">
                                        <FontAwesomeIcon icon={faUser} size="xs" className="profileIcon" />
                                    </Link>
                                    <Link to="/profile">Profile</Link>
                                </span>
                            </>
                        ) : (
                            <>
                                <Link to="/signup">Signup</Link>
                                <Link to="/signin">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <nav>
                {/* desktop navigation */}
                <Link to="/">Home</Link>
                <Link to="/aboutus">About Us</Link>
                <Link to="/browselistings">Browse</Link>
                {userInfo ? <Link to="/postlisting">Sell</Link> : <Link to="/signin">Sell</Link>}
                <Link to="/manuals">Manuals</Link>
            </nav>

            {/* mobile navigation */}
            <div className="mobileNav">
                <div onClick={hamburgerMenu} className="menuIcon">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
                <div style={displayStyle} onClick={closeMenu}>
                    <Link to="/">Home</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/browselistings">Browse</Link>
                    {userInfo ? <Link to="/postlisting">Sell</Link> : <Link to="/signin">Sell</Link>}
                    <Link to="/manuals">Manuals</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
