const express = require('express');
const controller = require('../controllers/experienceController');
const router = express.Router({ mergeParams: true });

router.post('/', controller.createExperience);
router.get('/', controller.getExperiences);
router.get('/:id', controller.getExperience);
router.delete('/', controller.deleteExperience);

module.exports = router;