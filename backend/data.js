// Anjileen's Code

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// sample data to populate app
const data = {
    users: [
        {
            _id: mongoose.Types.ObjectId('62f9ab7fd165e2174d5d285c'),
            name: 'Test User',
            email: 'test@email.com',
            password: bcrypt.hashSync('test'),
        },
    ],
    listings: [
        {
            user: '62f9ab7fd165e2174d5d285c',
            title: 'Exploding Kittens',
            slug: 'exploding-kittens',
            description:
                'Pre-owned game in great condition. Had many fun times playing this with our family. Kids are grown now so the game is not being used anymore. Would love it to go to a new home. This game is suitable for those aged seven and up.',
            price: 25.0,
            genre: 'Family',
            difficulty: 'Easy',
            minPlayers: '2',
            playingTime: '15 mins',
            missingPieces: 'no',
            image: '/images/explodingkittens.jpg',
            imageid: 'explodingkittens',
        },
    ],
};

export default data;
