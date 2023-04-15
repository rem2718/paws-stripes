const express = require('express');
const router = express.Router();
// const { createUser, loginUser } = require('../controllers/user');

router.post('/signup', () => { console.log('signing up') });


router.post('/login', () => { console.log('logging in') });

module.exports = router;