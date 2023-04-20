const express = require('express');
const requests = require('./requestsRoutes');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.use('/requests', requests);

router.get('/experiences', (req, res) => {
    res.render('adoption-experiences', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/faqs', (req, res) => {
    res.render('faqs', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/login', (req, res) => {
    res.render('login', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/signup', (req, res) => {
    res.render('signup', { isLoggedIn: req.cookies.isLoggedIn || false });
});

router.get('/account', (req, res) => {
    res.render('account', { isLoggedIn: req.cookies.isLoggedIn || false });
})

module.exports = router;