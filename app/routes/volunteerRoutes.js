const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const controller = require('../controllers/volunteerController');
const router = express.Router({ mergeParams: true });

router.post('/', [auth], controller.volunteer);
router.get('/status', [auth], controller.getStatus);
router.get('/statuses', [auth, admin], controller.getStatuses);
router.put('/status/:id', [auth, admin], controller.updateStatus);

module.exports = router;