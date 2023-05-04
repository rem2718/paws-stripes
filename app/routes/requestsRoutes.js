const express = require('express');
const auth = require('../utils/authMiddleware');
const tokenDecode = require('../utils/tokenDecodeMiddleware');
const isVolunteer = require('../utils/volunteerMiddleware');
const pets = require('../utils/petMiddleware');
const debug = require('debug')('app:main');
const router = express.Router({ mergeParams: true });

router.get('/', [tokenDecode], (req, res) => {
    res.render('requests', { cookies: req.cookies.token, user: req.user });
});

router.get('/adoption-form', [auth], (req, res) => {
    res.render('adoption-form', { cookies: req.cookies.token, user: req.user });
});

router.get('/experience-form', [auth, pets], (req, res) => {
    res.render('experience-form', { cookies: req.cookies.token, user: req.user, pets: req.pets});
});

router.get('/handover-form', [auth], (req, res) => {
    res.render('handover-form', { cookies: req.cookies.token, user: req.user });
});

router.get('/rescue-form', [tokenDecode], (req, res) => {
    res.render('rescue-form', { cookies: req.cookies.token, user: req.user });
});

router.get('/volunteer-form', [auth, isVolunteer], (req, res) => {
    res.render('volunteer-form', { cookies: req.cookies.token, user: req.user });
});

router.get('/response', [tokenDecode], (req, res) => {
    res.render('response', { cookies: req.cookies.token, user: req.user });
});

module.exports = router;