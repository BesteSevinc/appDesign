// Anjileen's Code

import express from 'express';
import Listing from '../models/listingSchema.js';

// create new router
const commentRouter = express.Router();

// get comments on listing
commentRouter.get('/slug/:slug', async (req, res) => {
    const comment = await Listing.findOne({ _id: req.params.slug });
    if (comment) {
        res.send(comment);
    } else {
        res.status(404).send({ message: 'No listing exists' });
    }
});

// update comments on listing
commentRouter.patch('/postcomment/:slug', async (req, res) => {
    const id = await Listing.findById(req.params.slug);

    const toUpdate = await Listing.findById(req.body._id);

    const result = await Listing.updateOne(
        {
            _id: toUpdate,
        },
        { $push: { comments: { user: req.body.user, comment: req.body.theComment } } }
    );

    res.status(201).send({ message: 'Comment Updated' });
});

export default commentRouter;
