const express = require('express');
const controller = require('../controllers/volunteerController');
const router = express.Router({ mergeParams: true });

router.post('/', controller.volunteer);
router.put('/:id', controller.updateStatus);

module.exports = router;