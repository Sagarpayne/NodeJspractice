const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');

const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();

router.get('/me',auth,async (req, res) => {
    const users = await User.findById(req.user._id);
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let userValid = await User.findOne({ email: req.body.email });

    if (userValid) return res.status(400).send('User is already registerd');

    // let user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // });

    let user = new User(_.pick(req.body, ['name', 'email', 'password']))
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token =user.generateAuthToken();

    res.header('x-auth-token',token).send(_.pick(user, ['_id', 'name']));
});



module.exports = router; 