// Anjileen's Code

import { Link } from 'react-router-dom';
import { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import { Store } from '../Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, listings: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'DELETE_REQUEST':
            return { ...state, loading: true };
        case 'DELETE_SUCCESS':
            return { ...state, loading: false };
        case 'DELETE_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function ProfileScreen() {
    // use context
    const { state } = useContext(Store);
    // get user info
    const { userInfo } = state;
    const user = userInfo._id;

    // use reducer
    const [{ listings }, dispatch] = useReducer(reducer, {
        listings: []
    });

    // fetch data
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

    // Filter listings to only show products belonging to logged in user
    let filteredListings = listings.filter((item) => {
        return item.user === user;
    });

    return (
        <main>
            <div className="profileTopBar">
                <h1>
                    <FontAwesomeIcon icon={faUser} className="profilePageIcon" />
                    {userInfo.name}
                </h1>
                <Link to="/postlisting">
                    <button className="orange">Create Listing</button>
                </Link>
            </div>
            <div className="profileSubNav">
                <Link to="/profile">
                    <div className="profileSubNavBtn">Listings</div>
                </Link>
            </div>
            <div className="dashboardContainer">
                {filteredListings.map((listing) => (
                    <div className="featuredCard5Col" key={listing._id}>
                        <Link to={`/listing/${listing._id}`}>
                            <img src={listing.image} alt={listing.title} />
                        </Link>
                        <Link to={`/listing/${listing._id}`}>
                            <p>{listing.title}</p>
                        </Link>
                        <div className="editDelBtns">
                            <Link to={`/editlisting/${listing._id}`}>
                                <button className="blue">Edit</button>
                            </Link>
                            <Link to={`/deletelisting/${listing._id}`}>
                                <button className="blue">Delete</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default ProfileScreen;
