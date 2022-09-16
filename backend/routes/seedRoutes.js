// Anjileen's Code

import express from 'express';
import Listing from '../models/listingSchema.js';
import data from '../data.js';
import User from '../models/userSchema.js';

// create new router
const seedRouter = express.Router();

// remove all listings and users, and create new ones from seed data
seedRouter.get('/', async (req, res) => {
    await Listing.deleteMany();
    const createdListings = await Listing.insertMany(data.listings);
    await User.deleteMany();
    const createdUsers = await User.insertMany(data.users);
    res.send({createdListings, createdUsers});
});

export default seedRouter;