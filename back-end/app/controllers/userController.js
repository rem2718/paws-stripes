const debug = require('debug')('app:api');
// const User = require('../models/userModel');

const createUser = async (req, res) => {
    debug('create user');
};

const loginUser = async (req, res) => {
    debug('login user');
};

const getUser = async (req, res) => {
    debug('get user');
};

const updateUser = async (req, res) => {
    debug('update user');
};

const deleteUser = async (req, res) => {
    debug('delete user');
};



exports = {
    createUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
}