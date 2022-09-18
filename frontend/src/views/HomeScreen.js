// Anjileen's Code

import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state };
        case 'FETCH_SUCCESS':
            return { ...state, listings: action.payload };
        case 'FETCH_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

function HomeScreen() {
    const [{ listings }, dispatch] = useReducer(reducer, {
        listings: []
    });

    useEffect(() => {
        const getData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/listings');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        getData();
    }, []);

    return (
        <main>
            <h1>Welcome to BoardHoard - Your hub for buying and selling board games!</h1>
            <div className="featuredContainer">
                <div className="featured__left">
                    <Link to="/browselistings">
                        <p id="orangeBox" className="orangeBox">
                            Find fun games to play
                        </p>
                    </Link>
                    <Link to="/postlisting">
                        <p id="orangeBox" className="orangeBox">
                            Sell your pre-loved games
                        </p>
                    </Link>
                    <p id="orangeBox" className="orangeBox">
                        Variety of games available
                    </p>
                </div>
                <div className="featured__right">
                    <img src="./images/heroimage.jpg" alt="people playing board games" />
                </div>
            </div>

            <h2 className="center">Featured Listings</h2>
            <div className="featuredGamesContainer">
                {listings.slice(0, 4).map((listing) => (
                    <div className="featuredCard4Col" key={listing._id}>
                        <Link to={`/listing/${listing._id}`}>
                            <img src={listing.image} alt={listing.title} />
                        </Link>
                        <Link to={`/listing/${listing._id}`}>
                            <p className="bold">{listing.title}</p>
                        </Link>
                        <p className="price">${listing.price?.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default HomeScreen;
