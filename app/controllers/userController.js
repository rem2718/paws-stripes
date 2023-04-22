const debug = require('debug')('app:api');
const path = require('path');
const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// post request
// take the attribute names from ward
const createUser = async (req, res) => {
    debug('create user');
    res.cookie("token", token, att).cookie("isAuthenticated", true, att).cookie("userID", userID, att).redirect('/');
};

// ignore it for now
const loginUser = async (req, res) => {
    const userType = req.body.userType
    debug('login user');
    const userID = "1234";
    const token = jwt.sign({ _id: "643ef5bc40e0e89ba7958f02", userType }, process.env.PRIVATE_KEY);
    const att = {
        maxAge: 24 * 60 * 60 * 1000, //24h
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }
    res.cookie("token", token, att).cookie("isAuthenticated", true, att).cookie("userType", userType, att).cookie("userID", userID, att).redirect('/');
};

// post request
const logoutUser = async (req, res) => {
    debug('logout user');
    res.clearCookie('token').clearCookie('isAuthenticated').clearCookie('userID').clearCookie('userType').redirect('/');
}

//get request 
const getUser = async (req, res) => {
    const userID = req.params.id;
    debug('get user');
    res.send({ userID: "1234", username: "lamia", email: "rewbd@gmail.com" });
};

// put request
// all data will be sent so you need to check whether the value changed or not
const updateUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    debug(username);
    debug('update user');
    res.send({ username: username, email: email });
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