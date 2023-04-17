const express = require('express');
const rescueController = require('../controllers/rescueController');
const router = express.Router();

router.post('/', rescueController.rescue);

module.exports = router;