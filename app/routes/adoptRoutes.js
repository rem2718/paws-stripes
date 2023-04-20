const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const controller = require('../controllers/adoptController');
const router = express.Router({ mergeParams: true });

router.post('/', [auth], controller.recommend);
router.get('/:id', [auth], controller.adopt);
router.put('/:id', [auth, admin], controller.updateStatus);

module.exports = router;