// Anjileen's Code

import { useParams } from 'react-router-dom';
import { useReducer, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

// function to edit listing
function EditListingScreen() {
    // use store context
    const { state } = useContext(Store);

    // get user info
    const { userInfo } = state;

    // use navigate
    const navigate = useNavigate();

    // get slug from params
    const params = useParams();
    const { slug } = params;

    // use reducer
    const [{ loading, listing }, dispatch] = useReducer(reducer, {
        listing: [],
        loading: true
    });

    // fetch the listing
    useEffect(() => {
        const getData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/listings/edit/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        getData();
    }, []);

    // set states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [minPlayers, setMinPlayers] = useState('');
    const [playingTime, setPlayingTime] = useState('');
    const [missingPieces, setMissingPieces] = useState(`${listing.missingPieces}`);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState([]);
    const [previewImage, setPreviewImage] = useState('');

    // when file uploaded, set the file
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    // function to set and change preview image of user's selected image
    useEffect(() => {
        let fileReader;
        if (fileName !== '') {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                setPreviewImage(result);
            };
            fileReader.readAsDataURL(file);
        }
    }, [file]);

    // function to edit listing in database
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            dispatch({ type: 'UPDATE_REQUEST' });

            const { data } = await axios.put(
                `/api/listings/editlisting/${slug}`,
                {
                    _id: slug,
                    title,
                    description,
                    price,
                    genre,
                    difficulty,
                    minPlayers,
                    playingTime,
                    missingPieces,
                    file,
                    fileName,
                    formData,
                    phone,
                    email
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userInfo.token}`
                    },
                }
            );
            dispatch({ type: 'UPDATE_SUCCESS' });

            navigate('/profile');
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL' });
            console.log('Update listing failed');
        }
    };

    return (
        <main>
            {/* create listing input fields */}
            <h3 className="center">Edit Your Listing</h3>
            <form className="sellContainer" name="postListing" onSubmit={submitHandler} encType="multipart/form-data">
                {/* left column */}
                <div className="formGroup">
                    <label>Title</label>
                    <input type="text" name="title" placeholder={listing.title} value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="hidden" name="user" value={userInfo && userInfo._id} />
                    <input type="hidden" name="userName" value={userInfo && userInfo.name} />
                    <label>Description</label>
                    <textarea rows="5" name="description" placeholder={listing.description} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>Price</label>
                    <input type="number" name="price" placeholder={listing.price} value={price} onChange={(e) => setPrice(e.target.value)} />
                    <label>Genre</label>
                    <select
                        defaultValue={genre}
                        onChange={(e) => {
                            setGenre(e.target.value);
                        }}>
                        <option disabled value="">
                            {listing.genre}
                        </option>
                        <option value="Card">Card</option>
                        <option value="Family">Family</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Party">Strategy</option>
                        <option value="Trivia">Trivia</option>
                    </select>
                    <label>Difficulty</label>
                    <select
                        defaultValue={difficulty}
                        onChange={(e) => {
                            setDifficulty(e.target.value);
                        }}>
                        <option disabled value="">
                            {listing.difficulty}
                        </option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <label>Min Players</label>
                    <select
                        defaultValue={minPlayers}
                        onChange={(e) => {
                            setMinPlayers(e.target.value);
                        }}>
                        <option disabled value="">
                            {listing.minPlayers}
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label>Playing Time</label>
                    <select
                        defaultValue={playingTime}
                        onChange={(e) => {
                            setPlayingTime(e.target.value);
                        }}>
                        <option disabled value="">
                            {listing.playingTime}
                        </option>
                        <option value="15 mins">15 mins</option>
                        <option value="20 mins">20 mins</option>
                        <option value="30 mins">30 mins</option>
                        <option value="40 mins">40 mins</option>
                        <option value="1+ hour">1+ hour</option>
                    </select>
                    <label>Any game pieces missing?</label>
                    <div className="radioOptions">
                        <input
                            type="radio"
                            checked={listing.missingPieces === 'yes' || missingPieces === 'yes'}
                            name="missingpieces"
                            value="yes"
                            onChange={(e) => setMissingPieces(e.target.value)}
                        />{' '}
                        Yes
                        <input
                            type="radio"
                            checked={listing.missingPieces === 'no' || missingPieces === 'no'}
                            name="missingpieces"
                            value="no"
                            onChange={(e) => setMissingPieces(e.target.value)}
                        />{' '}
                        No
                    </div>
                </div>
                {/* right column */}
                <div className="formGroup">
                    <label className="fileLabel" htmlFor="file">
                        Select Image
                        <input type="file" accept="image/jpg, image/jpeg, image/png, image/gif" name="file" onChange={onFileChange} />
                    </label>
                    <div className="displayImage">
                        <img src={previewImage ? previewImage : listing.image} alt="preview" />
                    </div>
                    <p className="bold underline" style={{ marginBottom: '25px' }}>
                        Contact Details
                    </p>
                    <label className="bold">Email</label>
                    <input type="text" name="email" placeholder={listing.email} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="bold">Phone</label>
                    <input type="text" name="phone" placeholder={listing.phone} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <button className="blue" style={{ width: '200px' }} type="submit">
                        Update Listing
                    </button>
                    <div>{loading && <div className="loader"></div>}</div>
                </div>
            </form>
        </main>
    );
}

export default EditListingScreen;
