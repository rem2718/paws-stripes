const express = require('express');
const auth = require('../utils/authMiddleware');
const debug = require('debug')('app:main');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    res.render('requests', { cookies: req.cookies || false });
});

router.get('/adoption-form', [auth], (req, res) => {
    res.render('adoption-form', { cookies: req.cookies || false });
});

router.get('/experience-form', [auth], (req, res) => {
    res.render('experience-form', { cookies: req.cookies || false });
});

router.get('/handover-form', [auth], (req, res) => {
    res.render('handover-form', { cookies: req.cookies || false });
});

router.get('/rescue-form', (req, res) => {
    res.render('rescue-form', { cookies: req.cookies || false });
});

router.get('/volunteer-form', [auth], (req, res) => {
    res.render('volunteer-form', { cookies: req.cookies || false });
});

router.get('/response', (req, res) => {
    res.render('response', { cookies: req.cookies || false });
});

module.exports = router;