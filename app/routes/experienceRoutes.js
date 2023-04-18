const express = require('express');
const experienceController = require('../controllers/experienceController');
const router = express.Router({ mergeParams: true });

router.post('/', experienceController.createExperience);
router.get('/', experienceController.getExperiences);
router.get('/:id', experienceController.getExperience);
router.delete('/', experienceController.deleteExperience);

module.exports = router;