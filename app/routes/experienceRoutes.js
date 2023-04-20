const express = require('express');
const auth = require('../utils/authMiddleware');
const controller = require('../controllers/experienceController');
const router = express.Router({ mergeParams: true });

router.post('/', [auth], controller.createExperience);
router.put('/:id', [auth], controller.like);
router.get('/', controller.getExperiences);
router.get('/:id', controller.getExperience);
router.delete('/:id', [auth], controller.deleteExperience);

module.exports = router;