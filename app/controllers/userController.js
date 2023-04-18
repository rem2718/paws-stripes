const debug = require('debug')('app:api');
const path = require('path');
// const User = require('../models/userModel');

const createUser = async (req, res) => {
    debug('create user');
    res.render('index');
};

const loginUser = async (req, res) => {
    debug('login user');
    res.render('index');
};

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