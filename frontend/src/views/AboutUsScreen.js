import '../about.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFontAwesome, faDollarSign, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
// Richard's Code
// Was not able to get my .env file to work, hence taking this page instead.
function AboutUsScreen() {
    return (
        <main className='about-container'>
        <div className='column-one'>
            <h1>About Us</h1>
            <p className='aboutDescription'>We established BoardHoard in 2022 to help people experience the joy of playing board games.</p>
            <p className='aboutDescription'>Whether that be a two-player battle of wits or party games fun for all, BoardHoard has you covered.</p><br></br>
            <p className='aboutDescription'>Our site allows you to browse, buy, and sell board games to fellow board game enthusiasts.</p>
            <p className='aboutDescription'>Not sure what to look for? Our robust search engine will help you find something for a cozy or crazy night in.</p><br></br>
            <p className='aboutDescription'>Still not sure? Browse our listings to see how people like you have rated the games they've listed.</p>
            <p className='aboutDescription'>We take these ratings and aggregate them to help users like you have all the info they need to make the most informed choice.</p>
        </div>
        <div className='column-two'>
            <div><h4>Still not convinced?</h4></div>
            <div className="lightBlueBox">
                <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{ color: '#465095', paddingRight: '8px' }} />
                Leave reviews and ratings to help others find games suited to them.
            </div>
            <div className="lightBlueBox">
                <FontAwesomeIcon icon={faFontAwesome} size="xl" style={{ color: '#465095', paddingRight: '8px' }} />
                We're community-oriented.
            </div>
            <div className="lightBlueBox">
                <FontAwesomeIcon icon={faDollarSign} size="xl" style={{ color: '#465095', paddingRight: '8px' }} />
                We do this for the love of games, 100% of earnings go to you, the user!
            </div>
            <div className='about-cta'>
                <p><Link to="/signup">Sign up here</Link> to get started on BoardHoard!</p>
            </div>
        </div>
        </main>
    );
}

export default AboutUsScreen;