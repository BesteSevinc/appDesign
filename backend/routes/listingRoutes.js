// Anjileen's Code

import express from 'express';
import Listing from '../models/listingSchema.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import multer from 'multer';
import path from 'path';

// loads environment variables from our .env file
dotenv.config();

// configuration for our image storage service cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// for file upload
const storage = multer.diskStorage({
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error('File type not supported'), false);
            return;
        }
        cb(null, true);
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// create new router
const listingRouter = express.Router();

// get all listings from database
listingRouter.get('/', async (req, res) => {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.send(listings);
});

// get single listing from database
listingRouter.get('/slug/:slug', async (req, res) => {
    const listing = await Listing.findOne({ _id: req.params.slug });
    if (listing) {
        res.send(listing);
    } else {
        res.status(404).send({ message: 'Listing not found' });
    }
});

// post listing to database
listingRouter.post('/postlisting', upload.single('file'), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);

    const newListing = new Listing({
        user: req.body.user,
        userName: req.body.userName,
        title: req.body.title,
        slug: req.body.title,
        description: req.body.description,
        price: req.body.price,
        genre: req.body.genre,
        difficulty: req.body.difficulty,
        minPlayers: req.body.minPlayers,
        playingTime: req.body.playingTime,
        missingPieces: req.body.missingPieces,
        image: result.secure_url,
        imageid: result.public_id,
        phone: req.body.phone,
        email: req.body.email
    });

    const listing = await newListing.save();
    res.status(201).send({ message: 'Listing Posted', listing });
});

// edit listing
listingRouter.get('/edit/:slug', async (req, res) => {
    const listing = await Listing.findOne({ _id: req.params.slug });

    if (listing) {
        res.send(listing);
    } else {
        res.status(404).send({ message: 'Listing not found' });
    }
});

listingRouter.put('/editlisting/:slug', upload.single('file'), async (req, res) => {
    const id = await Listing.findById(req.params.slug);

    const listingToUpdate = await Listing.findById(req.body._id);
    listingToUpdate.title = req.body.title || listingToUpdate.title;
    listingToUpdate.description = req.body.description || listingToUpdate.description;
    listingToUpdate.price = req.body.price || listingToUpdate.price;
    listingToUpdate.genre = req.body.genre || listingToUpdate.genre;
    listingToUpdate.difficulty = req.body.difficulty || listingToUpdate.difficulty;
    listingToUpdate.minPlayers = req.body.minPlayers || listingToUpdate.minPlayers;
    listingToUpdate.playingTime = req.body.playingTime || listingToUpdate.playingTime;
    listingToUpdate.missingPieces = req.body.missingPieces || listingToUpdate.missingPieces;
    listingToUpdate.phone = req.body.phone || listingToUpdate.phone;
    listingToUpdate.email = req.body.email || listingToUpdate.email;

    if (req.body.fileName !== '') {
        const image = await cloudinary.uploader.destroy(id.imageid);
        const result = await cloudinary.uploader.upload(req.file.path);

        listingToUpdate.image = result.secure_url;
        listingToUpdate.imageid = result.public_id;
    } else {
        listingToUpdate.image = listingToUpdate.image;
        listingToUpdate.imageid = listingToUpdate.imageid;
    }

    const updatedListing = await listingToUpdate.save();

    res.status(201).send({ message: 'Listing Updated', updatedListing });
});

// delete listing
listingRouter.post('/deletelisting', async (req, res) => {
    const id = await Listing.findById(req.body.slug);
    const result = await cloudinary.uploader.destroy(id.imageid);
    const listing = await Listing.deleteOne({ _id: req.body.slug });

    res.status(201).send({ message: 'Listing Deleted', listing });
});

export default listingRouter;
