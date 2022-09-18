// Anjileen's Code

import { useParams } from 'react-router-dom';
import { useReducer, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faChartColumn, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, listing: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'FETCH_REQUEST_COMMENTS':
            return { ...state, loadingComments: true };
        case 'FETCH_SUCCESS_COMMENTS':
            return { ...state, comment: action.payload, loading: false };
        case 'FETCH_FAIL_COMMENTS':
            return { ...state, loadingComments: false, error: action.payload };
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
};

function SingleListingScreen() {
    // get listing id from params
    const params = useParams();
    const { slug } = params;

    // get user info from store context
    const { state } = useContext(Store);
    const { userInfo } = state;

    // set states
    const [comments, setComments] = useState();
    const [contactInfo, setShowContactInfo] = useState(false);
    let user;

    // set user
    if (userInfo !== null) {
        user = userInfo.name;
    }

    // user's comment
    const theComment = comments;

    // reducer
    const [{ loading, error, listing, comment, loadingComments }, dispatch] = useReducer(reducer, {
        listing: [],
        comment: [{}],
        loadingComments: true,
        loading: true,
        error: ''
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

    // get comments for listing
    const getComments = async () => {
        dispatch({ type: 'FETCH_REQUEST_COMMENTS' });
        try {
            const comments = await axios.get(`/api/comments/slug/${slug}`);
            dispatch({
                type: 'FETCH_SUCCESS_COMMENTS',
                payload: comments.data
            });
        } catch (err) {
            dispatch({ type: 'FETCH_FAIL_COMMENTS', payload: err.message });
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    // function to show contact info
    const showContactInfo = (e) => {
        e.preventDefault();

        setShowContactInfo(true);
    };

    // function to post comment
    const postCommentHandler = async (e) => {
        e.preventDefault();

        // if comment is not blank, set comment
        if (comments !== '') {
            setComments(comments);
        }

        try {
            dispatch({ type: 'UPDATE_REQUEST' });

            if (userInfo && comments) {
                const { data } = await axios.patch(
                    `/api/comments/postcomment/${slug}`,
                    {
                        _id: slug,
                        user,
                        theComment
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    }
                );
                dispatch({ type: 'UPDATE_SUCCESS' });
                getComments();
            }
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL' });
            console.log('Update listing failed');
        }
    };

    return (
        <main>
            <div className="singleListingContainer">
                {/* display listing */}
                <div className="singleListingCol">
                    <img src={listing.image} alt={listing.title} />
                    <p className="bold">Description</p>
                    <br />
                    <p>{listing.description}</p>
                </div>

                <div className="singleListingCol">
                    <p className="listingTitle">{listing.title}</p>
                    {userInfo && String(listing.user) === userInfo._id ? (
                        <Link to={`/editlisting/${listing._id}`}>
                            <p className="editLink">Edit Listing</p>
                        </Link>
                    ) : (
                        <></>
                    )}
                    <p className="listingPrice">${listing.price?.toFixed(2)}</p>

                    {/* display categories */}
                    <div className="categoriesBox">
                        <div className="flexRow">
                            <div>
                                <FontAwesomeIcon icon={faGear} className="icon" style={{ color: '#465095' }} />
                                {listing.genre}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faChartColumn} className="icon" style={{ color: '#ea6464' }} />
                                {listing.difficulty}
                            </div>
                        </div>
                        <div className="flexRow">
                            <div>
                                <FontAwesomeIcon icon={faUser} className="icon" style={{ color: '#f3ac4f' }} />
                                {listing.minPlayers}+ Players
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faClock} className="icon" style={{ color: '#3a9a37' }} />
                                {listing.playingTime}
                            </div>
                        </div>
                    </div>

                    {/* complete set badge */}
                    {listing.missingPieces === 'no' && <div className="completeSet">Complete Set</div>}

                    {/* seller name */}
                    <div className="userName">Seller: {listing.userName}</div>

                    {/* contact button */}
                    <button className="orange" onClick={showContactInfo} style={{ display: 'block', marginBottom: '20px' }}>
                        Contact Seller
                    </button>

                    {/* contact info */}
                    {contactInfo && (
                        <div className="contactDetails">
                            <p>Phone: {listing.phone}</p>
                            <p>Email: {listing.email}</p>
                        </div>
                    )}

                    {/* post comment section */}
                    {comment.comments && userInfo && (
                        <p className="bold" style={{ marginBottom: '10px' }}>
                            Comments
                        </p>
                    )}
                    {userInfo && (
                        <>
                            <textarea rows="4" name="comment" onChange={(e) => setComments(e.target.value)} />
                            <button
                                className="blue"
                                style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginTop: '10px', marginBottom: '20px' }}
                                onClick={postCommentHandler}>
                                Post Comment
                            </button>
                        </>
                    )}

                    {/* if there are comments, display them */}
                    <div>
                        {comment.comments &&
                            comment.comments.map((comment) => {
                                return (
                                    <div className="comment" key={Date.now() + Math.random() * 100}>
                                        <div className="commentBox">
                                            <p>{comment.comment}</p>
                                        </div>
                                        <div className="commentName">{comment.user}</div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SingleListingScreen;
