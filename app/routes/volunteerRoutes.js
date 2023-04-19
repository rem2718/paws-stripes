const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const controller = require('../controllers/volunteerController');
const router = express.Router({ mergeParams: true });

router.post('/', [auth, admin], controller.volunteer);
router.put('/:id', [auth, admin], controller.updateStatus);

module.exports = router;