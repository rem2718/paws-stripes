const debug = require('debug')('app:api');
const path = require('path');
const _ = require("lodash");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validate, validateLogin } = require('../models/userModel');

// post request, signup
// take the attribute names from ward
const createUser = async (req, res) => {
    debug('create user');
    let user = req.body;
    user.isAdmin = false;
    user.isVolunteer = false;

    const { error } = validate(user);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    let existingUser = await User.findOne({ email: user.email });
    if (existingUser) return res.status(400).render("err-response", { err: 400, msg: 'You already registered..' });

    user = new User(user);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();

    const token = jwt.sign({ _id: user._id.toString(), type: "user" }, process.env.PRIVATE_KEY);
    const att = {
        maxAge: 24 * 60 * 60 * 1000, //24h
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }

    res.cookie("token", token, att).redirect('/');
};

// ignore it for now
const loginUser = async (req, res) => {
    debug('login user');
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    const user = await User.findOne({ email: req.body.email, isAdmin: req.body.userType === 'admin' ? true : false });
    if (!user) return res.status(400).render("err-response", { err: 400, msg: 'Invalid email or password, try again!' });

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(400).render("err-response", { err: 400, msg: 'Invalid email or password, try again!' });

    const token = jwt.sign({ _id: user._id.toString(), type: req.body.userType }, process.env.PRIVATE_KEY);
    const att = {
        maxAge: 24 * 60 * 60 * 1000, //24h
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }

    res.cookie("token", token, att).redirect('/');
};

// post request
const logoutUser = async (req, res) => {
    debug('logout user');
    res.clearCookie('token').redirect('/');
}

//get request account details in account page
const getUser = async (req, res) => {
    const userID = req.params.id;
    debug('get user');
    res.send({ userID: "1234", firstName: "lamia", lastName: "ahmad", email: "rewbd@gmail.com", phoneNumber: "0123454675", age: "30", gender: "female", region: "Riyadh" });
};

// put request
// all data will be sent so you need to check whether the value changed or not
const updateUser = async (req, res) => {
    debug('update user');
    res.send(req.body);
};

// delete request
const deleteUser = async (req, res) => {
    const userID = req.params.id;
    debug('delete user');
    res.clearCookie('token').clearCookie('isAuthenticated').clearCookie('userID').send({ userID: userID });
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
};