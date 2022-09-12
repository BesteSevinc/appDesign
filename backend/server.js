// Anjileen's Code
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import listingRouter from './routes/listingRoutes.js';

// loads environment variables from our .env file
dotenv.config();

// connect to database
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to database');
}).catch(err => {
    console.log(err.message);
});

// call the express function and assign to app variable
const app = express();

// specifies which router to use for certain paths
app.use('/api/listings', listingRouter);

// error handling
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

// define port
const port = process.env.PORT || 5000;

// start the server
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});