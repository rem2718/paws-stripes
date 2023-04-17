const express = require('express');
const experienceController = require('../controllers/experienceController');
const router = express.Router();

router.get('/', experienceController.getExperiences);
router.post('/', experienceController.submitExperience);

module.exports = router;