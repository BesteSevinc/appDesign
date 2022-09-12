// Anjileen's Code
import express from 'express';
import Listing from '../models/listingSchema.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

// loads environment variables from our .env file
dotenv.config();

// configuration for our image storage service cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// create new router
const listingRouter = express.Router();

// get listings from database
listingRouter.get('/', async (req, res) => {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.send(listings);
});

export default listingRouter;
