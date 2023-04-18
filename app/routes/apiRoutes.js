const express = require('express');
const user = require('./userRoutes');
const pets = require('./petsRoutes');
const request = require('./requestRoutes');
const experience = require('./experienceRoutes');
const volunteer = require('./volunteerRoutes');
const router = express.Router();

router.use('/user', user);
router.use('/pets', pets);
router.use('/request', request);
router.use('/experiences', experience);
router.use('/volunteer', volunteer);

module.exports = router;