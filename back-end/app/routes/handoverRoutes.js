const express = require('express');
const handoverController = require('../controllers/handoverController');
const router = express.Router();

router.post('/', handoverController.handover);

module.exports = router;