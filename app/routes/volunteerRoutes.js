const express = require('express');
const volunteerController = require('../controllers/volunteerController');
const router = express.Router();

router.post('/', volunteerController.createVolunteer);
router.put('/:id', volunteerController.updateStatus);

module.exports = router;