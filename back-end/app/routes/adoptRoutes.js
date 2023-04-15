const express = require('express');
const adoptController = require('../controllers/adoptController');
const router = express.Router();

router.post('/', adoptController.adopt);

module.exports = router;