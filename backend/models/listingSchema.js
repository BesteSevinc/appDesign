// Anjileen's Code
import mongoose from 'mongoose';

// schema for listings in our database
const listingSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        minPlayers: {
            type: String,
            required: true
        },
        playingTime: {
            type: String,
            required: true
        },
        missingPieces: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        imageid: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        comments: [
            {
                user: String,
                comment: String
            },
        ],
    },
    {
        timestamps: true
    }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
