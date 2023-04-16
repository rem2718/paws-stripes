const express = require('express');
const requestController = require('../controllers/requestController');
const router = express.Router();

router.post('/', requestController.request);
router.put('/:id', requestController.updateStatus);

module.exports = router;