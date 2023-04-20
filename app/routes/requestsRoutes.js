const express = require('express');
const auth = require('../utils/authMiddleware');
const debug = require('debug')('app:main');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    res.render('requests', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/adoption-form', [auth], (req, res) => {
    res.render('adoption-form', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/experience-form', [auth], (req, res) => {
    res.render('experience-form', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/handover-form', [auth], (req, res) => {
    res.render('handover-form', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/rescue-form', (req, res) => {
    res.render('rescue-form', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/volunteer-form', [auth], (req, res) => {
    res.render('volunteer-form', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/response', (req, res) => {
    res.render('response', { isLoggedIn: req.cookies.isLoggedIn || false });
});

module.exports = router;