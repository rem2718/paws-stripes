const express = require('express');
const adoptionController = require('../controllers/adoptionController');
const router = express.Router();

router.post('/', adoptionController.adopt);

module.exports = router;