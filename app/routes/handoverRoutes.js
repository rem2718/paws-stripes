const express = require('express');
const controller = require('../controllers/handoverController');
const router = express.Router({ mergeParams: true });

router.post('/', controller.handover);
router.put('/:id', controller.updateStatus);

module.exports = router;