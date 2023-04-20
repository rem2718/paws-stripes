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
    debug('login user');
    const userID = "1234";
    const token = jwt.sign({ _id: "643ef5bc40e0e89ba7958f02", isAdmin: false }, process.env.PRIVATE_KEY);
    const att = {
        maxAge: 24 * 60 * 60 * 1000, //24h
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }
    res.cookie("token", token, att).cookie("isAuthenticated", true, att).cookie("userID", userID, att).redirect('/');
};

const logoutUser = async (re, res) => {
    debug('logout user');
    res.clearCookie('token').clearCookie('isAuthenticated').clearCookie('userID').redirect('/');
}

// const getPets;

const getUser = async (req, res) => {
    debug('get user');
};

const updateUser = async (req, res) => {
    debug('update user');
};

const deleteUser = async (req, res) => {
    debug('delete user');
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
};