const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const controller = require('../controllers/handoverController');
const router = express.Router({ mergeParams: true });

router.post('/', controller.handover);
router.get('/status', [auth], controller.getStatus)
router.get('/statuses', [auth, admin], controller.getStatuses);
router.put('/status/:id', [auth, admin], controller.updateStatus);

module.exports = router;