const express = require('express');
const petsController = require('../controllers/petsController');
const router = express.Router();

router.get('/', petsController.getPets);

module.exports = router;