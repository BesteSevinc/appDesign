// Anjileen's Code

import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Accordion from '../components/Accordion';
import Card from '../components/Card';

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, listings: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// function for browse listings
function BrowseListingsScreen() {
    // set states
    const [genre, setGenre] = useState('All');
    const [genreActive, setGenreActive] = useState(false);
    const [difficulty, setDifficulty] = useState('All');
    const [difficultyActive, setDifficultyActive] = useState(false);
    const [minPlayers, setMinPlayers] = useState('All');
    const [minPlayersActive, setMinPlayersActive] = useState(false);
    const [playingTime, setPlayingTime] = useState('All');
    const [playingTimeActive, setPlayingTimeActive] = useState(false);

    const [{ listings }, dispatch] = useReducer(reducer, {
        listings: []
    });

    // fetch listings
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

    // return listings based on filters
    let filteredGenre = listings.filter((item) => {
        return item.genre === genre;
    });

    let filteredDifficulty = listings.filter((item) => {
        return item.difficulty === difficulty;
    });

    let filteredPlayers = listings.filter((item) => {
        return item.minPlayers === minPlayers;
    });

    let filteredTime = listings.filter((item) => {
        return item.playingTime === playingTime;
    });

    // data for dropdowns
    const genreData = [
        {
            title: 'Genre',
            content: [['All'], ['Card'], ['Family'], ['Fantasy'], ['Party'], ['Trivia']]
        }
    ];

    const difficultyData = [
        {
            title: 'Difficulty',
            content: [['All'], ['Easy'], ['Medium'], ['Hard']]
        }
    ];

    const minPlayersData = [
        {
            title: 'Min Players',
            content: [['All'], ['1'], ['2'], ['3'], ['4'], ['5']]
        }
    ];

    const playingTimeData = [
        {
            title: 'Playing Time',
            content: [['All'], ['15 mins'], ['20 mins'], ['30 mins'], ['40 mins'], ['1+ hour']]
        }
    ];

    return (
        <main>
            {/* filter dropdowns */}
            <div className="featuredContainer">
                <div className="filterMenus">
                    <h3>Browse By</h3>
                    <Accordion filterData={genreData} filter={genre} filterIsActive={setGenre} isActive={genreActive} setIsActive={setGenreActive} />
                    <Accordion filterData={difficultyData} filter={difficulty} filterIsActive={setDifficulty} isActive={difficultyActive} setIsActive={setDifficultyActive} />
                    <Accordion filterData={minPlayersData} filter={minPlayers} filterIsActive={setMinPlayers} isActive={minPlayersActive} setIsActive={setMinPlayersActive} />
                    <Accordion filterData={playingTimeData} filter={playingTime} filterIsActive={setPlayingTime} isActive={playingTimeActive} setIsActive={setPlayingTimeActive} />
                </div>

                {/* display listings */}
                <div className="listingsContainer">
                    <div className="sortBy">
                        <select name="genre" defaultValue={'newest'}>
                            <option disabled value="All">
                                Sort By
                            </option>
                            <option value="newest">Sort By: Newest</option>
                        </select>
                    </div>
                    {genre !== 'All'
                        ? filteredGenre.map((listing) => {
                              return <Card listing={listing} key={listing._id} />;
                          })
                        : difficulty !== 'All'
                        ? filteredDifficulty.map((listing) => {
                              return <Card listing={listing} key={listing._id} />;
                          })
                        : minPlayers !== 'All'
                        ? filteredPlayers.map((listing) => {
                              return <Card listing={listing} key={listing._id} />;
                          })
                        : playingTime !== 'All'
                        ? filteredTime.map((listing) => {
                              return <Card listing={listing} key={listing._id} />;
                          })
                        : listings.map((listing) => <Card listing={listing} key={listing._id} />)}
                </div>
            </div>
        </main>
    );
}

export default BrowseListingsScreen;
