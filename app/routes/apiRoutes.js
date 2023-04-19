const express = require('express');
const user = require('./userRoutes');
const pets = require('./petsRoutes');
const rescue = require('./rescueRoutes');
const handover = require('./handoverRoutes');
const adopt = require('./adoptRoutes');
const volunteer = require('./volunteerRoutes');
const experience = require('./experienceRoutes');
const router = express.Router();

router.use('/user', user);
router.use('/pets', pets);
router.use('/rescue', rescue);
router.use('/handover', handover);
router.use('/adopt', adopt);
router.use('/volunteer', volunteer);
router.use('/experiences', experience);

module.exports = router;