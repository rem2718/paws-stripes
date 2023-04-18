const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('/index.html');
});

router.get('/meet-our-pets', (req, res) => {
    res.render('meet-our-pets');
});

router.get('/requests', (req, res) => {
    res.render('requests');
});

router.get('/adoption-experiences', (req, res) => {
    res.render('adoption-experiences');
});

router.get('/rescue-form', (req, res) => {
    res.render('rescue-form');
});

module.exports = router;