// Anjileen's Code

import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import { generateToken } from '../utils.js';

// create new router
const userRouter = express.Router();

// post sign in data, check if user exists and if valid password
userRouter.post('/signin', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
});

// post signup data, create new user in database
userRouter.post('/signup', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    const user = await newUser.save();
    res.send({
        name: user.name,
        email: user.email,
        password: user.password,
        token: generateToken(user)
    });
});

export default userRouter;
