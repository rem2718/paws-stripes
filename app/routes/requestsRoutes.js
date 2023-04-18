const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('requests');
});

router.get('/adoption-form', (req, res) => {
    res.render('adoption-form');
});

router.get('/experience-form', (req, res) => {
    res.render('experience-form');
});

router.get('/handover-form', (req, res) => {
    res.render('handover-form');
});

router.get('/rescue-form', (req, res) => {
    res.render('rescue-form');
});

router.get('/volunteer-form', (req, res) => {
    res.render('volunteer-form');
});

module.exports = router;