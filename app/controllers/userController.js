const debug = require('debug')('app:api');
const path = require('path');
const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

const createUser = async (req, res) => {
    debug('create user');
    res.redirect('/');
};

const loginUser = async (req, res) => {
    debug('login user');
    const token = jwt.sign({ _id: "643ef5bc40e0e89ba7958f02", isAdmin: false }, process.env.PRIVATE_KEY);
    const att = {
        // maxAge: 5000,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    }
    res.cookie("token", token, att).cookie("isLoggedIn", true, att).redirect('/');
};

const logoutUser = async (re, res) => {
    debug('logout user');
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
    getUser,
    updateUser,
    deleteUser
};