// Anjileen's Code

import axios from 'axios';
import { useState, useEffect, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
};

// function to create a listing
function PostListingScreen() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const user = userInfo._id;
    const userName = userInfo.name;

    // use reducer
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false
    });

    // use navigate
    const navigate = useNavigate();

    // set states
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [minPlayers, setMinPlayers] = useState('');
    const [playingTime, setPlayingTime] = useState('');
    const [missingPieces, setMissingPieces] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState([]);
    const [previewImage, setPreviewImage] = useState('/images/placeholder-image.png');

    // when file uploaded, set the file
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    // function to set name and slug
    const nameAndSlug = (e) => {
        setTitle(e.target.value);
        let unix = Math.round(+new Date() / 1000);
        let newSlug = title + String(unix);
        setSlug(newSlug);
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

    // function to send the listing to database
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            dispatch({ type: 'CREATE_REQUEST' });

            const data = await axios.post(
                '/api/listings/postlisting',
                {
                    user,
                    userName,
                    title,
                    slug,
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
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            dispatch({ type: 'CREATE_SUCCESS' });

            navigate('/');
        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
        }
    };

    return (
        <main>
            {/* create listing input fields */}
            <h3 className="center">Sell Your Item</h3>
            <form className="sellContainer" name="postListing" onSubmit={submitHandler} encType="multipart/form-data">
                {/* left column */}
                <div className="formGroup">
                    <label>Title</label>
                    <input required type="text" name="title" value={title} onChange={nameAndSlug} />
                    <input type="hidden" name="slug" placeholder="slug" value={slug} />
                    <input type="hidden" name="user" value={userInfo && userInfo._id} />
                    <input type="hidden" name="userName" value={userInfo && userInfo.name} />
                    <label>Description</label>
                    <textarea required rows="5" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label>Price</label>
                    <input required type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <label>Genre</label>
                    <select
                        required
                        value={genre}
                        onChange={(e) => {
                            setGenre(e.target.value);
                        }}>
                        <option value=""></option>
                        <option value="Card">Card</option>
                        <option value="Family">Family</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Party">Strategy</option>
                        <option value="Trivia">Trivia</option>
                    </select>
                    <label>Difficulty</label>
                    <select
                        required
                        value={difficulty}
                        onChange={(e) => {
                            setDifficulty(e.target.value);
                        }}>
                        <option value=""></option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <label>Min Players</label>
                    <select
                        required
                        value={minPlayers}
                        onChange={(e) => {
                            setMinPlayers(e.target.value);
                        }}>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label>Playing Time</label>
                    <select
                        required
                        value={playingTime}
                        onChange={(e) => {
                            setPlayingTime(e.target.value);
                        }}>
                        <option value=""></option>
                        <option value="15 mins">15 mins</option>
                        <option value="20 mins">20 mins</option>
                        <option value="30 mins">30 mins</option>
                        <option value="40 mins">40 mins</option>
                        <option value="1+ hour">1+ hour</option>
                    </select>
                    <label>Any game pieces missing?</label>
                    <div className="radioOptions">
                        <input type="radio" name="missingpieces" value="yes" onChange={(e) => setMissingPieces(e.target.value)} /> Yes
                        <input required type="radio" name="missingpieces" value="no" onChange={(e) => setMissingPieces(e.target.value)} /> No
                    </div>
                </div>
                {/* right column */}
                <div className="formGroup">
                    <label className="fileLabel" htmlFor="file">
                        Select Image
                        <input required type="file" accept="image/jpg, image/jpeg, image/png, image/gif" name="file" onChange={onFileChange} />
                    </label>
                    <div className="displayImage">
                        <img src={previewImage} alt="preview" />
                    </div>
                    <p className="bold underline" style={{ marginBottom: '25px' }}>
                        Contact Details
                    </p>
                    <label className="bold">Email</label>
                    <input required type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="bold">Phone</label>
                    <input required type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <button className="blue" style={{ width: '200px' }} type="submit">
                        Post Listing
                    </button>
                    <div>{loading && <div className="loader"></div>}</div>
                </div>
            </form>
        </main>
    );
}

export default PostListingScreen;
