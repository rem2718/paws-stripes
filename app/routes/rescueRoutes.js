const express = require('express');
const controller = require('../controllers/rescueController');
const router = express.Router({ mergeParams: true });

router.post('/', controller.rescue);
router.put('/:id', controller.updateStatus);

module.exports = router;