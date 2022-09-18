// Anjileen's Code

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// sample data to populate app
const data = {
    users: [
        {
            _id: mongoose.Types.ObjectId('62f9ab7fd165e2174d5d285c'),
            name: 'Test User',
            email: 'test@email.com',
            password: bcrypt.hashSync('test')
        },
    ],
    listings: [
        {
            user: '62f9ab7fd165e2174d5d285c',
            userName: 'Test User',
            title: 'Exploding Kittens',
            slug: 'exploding-kittens',
            description:
                'Pre-owned game in great condition. Had many fun times playing this with our family. Kids are grown now so the game is not being used anymore. Would love it to go to a new home. This game is suitable for those aged seven and up.',
            price: 25.0,
            genre: 'Card',
            difficulty: 'Easy',
            minPlayers: '2',
            playingTime: '15 mins',
            missingPieces: 'no',
            image: '/images/explodingkittens.jpg',
            imageid: 'explodingkittens',
            phone: '021 321 5678',
            email: 'johndoe@email.com'
        },
        {
            user: '62f9ab7fd165e2174d5d285c',
            userName: 'Test User',
            title: 'Monopoly Classic',
            slug: 'monopoly-classic',
            description:
                'Pre-loved game in fair condition. Kids no longer play this so thought we would list it. This is a great family game - hours of fun to be had! A few pieces missing but mostly intact.',
            price: 15.0,
            genre: 'Family',
            difficulty: 'Medium',
            minPlayers: '2',
            playingTime: '40 mins',
            missingPieces: 'yes',
            image: '/images/monopoly.jpg',
            imageid: 'monopoly',
            phone: '021 321 5678',
            email: 'johndoe@email.com'
        },
        {
            user: '62f9ab7fd165e2174d5d285c',
            userName: 'Test User',
            title: 'The Lord of the Rings',
            slug: 'lord-of-the-rings',
            description:
                'Brand-new game. Bought this as a gift for my nephew, only to find out that he already owns one! Great gift for The Lord of the Rings fans. Suitable for ages 14+',
            price: 70.0,
            genre: 'Fantasy',
            difficulty: 'Hard',
            minPlayers: '1',
            playingTime: '1+ hours',
            missingPieces: 'no',
            image: '/images/lordoftherings.jpg',
            imageid: 'lordoftherings',
            phone: '021 321 5678',
            email: 'johndoe@email.com'
        },
        {
            user: '62f9ab7fd165e2174d5d285c',
            userName: 'Test User',
            title: 'Herd Mentality',
            slug: 'herd-mentality',
            description: 'Great party game! Used only a handful of times - in great condition.',
            price: 15.0,
            genre: 'Party',
            difficulty: 'Medium',
            minPlayers: '4',
            playingTime: '30 mins',
            missingPieces: 'no',
            image: '/images/herdmentality.jpg',
            imageid: 'herdmentality',
            phone: '021 321 5678',
            email: 'johndoe@email.com'
        },
    ],
};

export default data;
