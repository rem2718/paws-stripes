const express = require('express');
const requests = require('./requestsRoutes');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { cookies: req.cookies || false });
});

router.use('/requests', requests);

router.get('/experiences', (req, res) => {
    res.render('adoption-experiences', { cookies: req.cookies || false });
});

router.get('/faqs', (req, res) => {
    res.render('faqs', { cookies: req.cookies || false });
});

router.get('/login', (req, res) => {
    res.render('login', { cookies: req.cookies || false });
});

router.get('/signup', (req, res) => {
    res.render('signup', { cookies: req.cookies || false });
});

router.get('/account', (req, res) => {
    res.render('account', { cookies: req.cookies || false });
})

router.get('/meet-our-pets', (req, res) => {
    res.render('meet-our-pets', { cookies: req.cookies || false });
});

router.get('/loading', (req, res) => {
    res.render('loading', { cookies: req.cookies || false });
});

router.get('/err-response/:err', (req, res) => {
    let err;
    let msg;
    switch (req.params.err) {
        case 'Bad Request':
            msg = 'Cat detected a bad request..';
            err = 400;
            break;
        case 'Unauthorized':
            msg = 'oh no! You have to login first';
            err = 401;
            break;
        case 'Forbidden':
            msg = 'access denied, forbidden';
            err = 403;
            break;
        case 'Not Found':
            msg = 'page not found :\( please check the URL and try again';
            err = 404;
        default:
            msg = req.params.err;
            err = 400;
            break;
    }

    res.status(err).render("err-response", { err, msg });
});

module.exports = router;