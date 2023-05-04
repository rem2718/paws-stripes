const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const multer = require('../utils/multerMiddleware');
const controller = require('../controllers/experienceController');
const router = express.Router({ mergeParams: true });

router.post('/', [auth, multer], controller.createExperience);
router.put('/:id', [auth, multer], controller.like);
router.get('/', controller.getExperiences);
router.get('/user/:id', [auth], controller.getExperience);
router.get('/image/:id', controller.getExperienceImage);
router.delete('/:id', [auth], controller.deleteExperience);

module.exports = router;