const debug = require('debug')('app:api');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validate, validateLogin } = require('../models/userModel');

const createUser = async (req, res) => {
    let user = req.body;
    user.isAdmin = false;
    user.isVolunteer = false;

    const { error } = validate(user);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });

    let existingUser = await User.findOne({
        $or: [
            { email: user.email },
            { phoneNumber: user.phoneNumber }]
    });
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

const loginUser = async (req, res) => {
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

const logoutUser = async (req, res) => {
    debug('logout user');
    res.clearCookie('token').redirect('/');
}

const getUser = async (req, res) => {
    debug('get user');

    const userID = req.user._id;
    const user = await User.findOne({ _id: userID })
        .select({ firstName: 1, lastName: 1, email: 1, phoneNumber: 1, age: 1, gender: 1, region: 2 });

    res.send(user);
};

const updateUser = async (req, res) => {
    debug('update');
    const id = req.user._id;
    const updates = req.body;

    const user = await User.findById(id);
    updates.isAdmin = user.isAdmin;
    updates.isVolunteer = user.isVolunteer;

    const validPwd = await bcrypt.compare(updates.password, user.password);
    if (!validPwd) return res.status(400).render("err-response", { err: 400, msg: 'Invalid password, try again!' });

    updates.password = user.password;

    const { error } = validate(updates);
    if (error) return res.status(400).render("err-response", { err: 400, msg: 'Cat detected a bad request..' });
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    res.send(updatedUser);
};

const deleteUser = async (req, res) => {
    const id = req.user._id;

    const user = await User.findById(id);
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(400).render("err-response", { err: 400, msg: 'Invalid password, try again!' });

    const deletedUser = await User.findByIdAndDelete(id);
    res.clearCookie('token').send({ deletedUser });
};

const getHours = async (req, res) => {
    debug('get volunteer hours');

    const userID = req.user._id;
    let volunteer = await User.findOne({ _id: userID });
    //if here
    let hours = volunteer.volunteerHours;

    res.send({ hours: hours });
};


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
    getHours,
};