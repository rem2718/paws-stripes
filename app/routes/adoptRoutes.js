const express = require('express');
const controller = require('../controllers/adoptController');
const router = express.Router({ mergeParams: true });

router.post('/', controller.recommend);
router.get('/:id', controller.adopt);
router.put('/:id', controller.updateStatus);

module.exports = router;