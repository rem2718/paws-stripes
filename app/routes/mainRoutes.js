const express = require('express');
const requests = require('./requestsRoutes');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('/index.html');
});

router.use('/requests', requests);

router.get('/rescue-form', (req, res) => {
    res.render('rescue-form');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;