const express = require('express');
const adoptionExperienceController = require('../controllers/adoptionExperienceController');
const router = express.Router();

router.get('/', adoptionExperienceController.getExperiences);
router.post('/', adoptionExperienceController.submitExperience);

module.exports = router;