// Anjileen's Code

import { Link } from 'react-router-dom';
import { useState } from 'react';
import SearchBox from './SearchBox';

// header
function Header() {
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
                    <img src="/images/logoicon.png" />
                    <Link to="/">BoardHoard</Link>
                </div>
                <div className="topContainer__right">
                    {/* search box */}
                    <SearchBox />
                    {/* signup and login links */}
                    <div className="userLinks">
                        <Link to="/signup">Signup</Link>
                        <Link to="/signin">Login</Link>
                    </div>
                </div>
            </div>
            <nav>
                {/* desktop navigation */}
                <Link to="/">Home</Link>
                <Link to="/aboutus">About Us</Link>
                <Link to="/browselistings">Browse</Link>
                <Link to="/postlisting">Sell</Link>
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
                    <Link to="/postlisting">Sell</Link>
                    <Link to="/manuals">Manuals</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
