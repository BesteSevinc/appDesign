// Anjileen's Code

import { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, listing: action.payload, loading: false };
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

// delete listing
function DeleteListingScreen() {
    // use store context
    const { state } = useContext(Store);

    // get user info
    const { userInfo } = state;

    // use navigate
    const navigate = useNavigate();

    // use params to get listing slug
    const params = useParams();
    const { slug } = params;

    // use reducer
    const [{ listing, loading }, dispatch] = useReducer(reducer, {
        listing: [],
        loading: false,
    });

    // get data for listing
    useEffect(() => {
        const getData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/listings/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        getData();
    }, []);

    // function to delete listing
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'DELETE_REQUEST' });

            const data = await axios.post(
                '/api/listings/deletelisting',
                {
                    slug,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            dispatch({ type: 'DELETE_SUCCESS' });

            navigate('/profile');
        } catch (err) {
            dispatch({ type: 'DELETE_FAIL' });
        }
    };

    return (
        <main>
            {/* delete listing screen */}
            <h3 className="center">Delete Listing</h3>
            <div className="featuredCard3Col" style={{ margin: 'auto' }} key={listing._id}>
                <Link to={`/listing/${listing._id}`}>
                    <img src={listing.image} alt={listing.title} />
                </Link>
                <Link to={`/listing/${listing._id}`}>
                    <p className="bold">{listing.title}</p>
                </Link>
                <p>${listing.price?.toFixed(2)}</p>
            </div>
            <p className="bold center" style={{ marginTop: '10px' }}>
                Are you sure you want to delete this listing?
            </p>
            <form style={{ textAlign: 'center' }} onSubmit={submitHandler}>
                <button className="orange" style={{ marginTop: '20px', width: '180px' }} type="submit">
                    Yes, Delete Listing
                </button>
                {loading && <div className="loader" style={{margin: '15px auto'}}></div>}
            </form>
        </main>
    );
}

export default DeleteListingScreen;
