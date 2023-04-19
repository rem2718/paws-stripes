const express = require('express');
const requests = require('./requestsRoutes');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.use('/requests', requests);

router.get('/faqs', (req, res) => {
    res.render('faqs');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;