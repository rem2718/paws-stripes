const express = require('express');
const requestController = require('../controllers/requestController');
const router = express.Router({ mergeParams: true });

router.post('/adopt', requestController.recommend);
router.post('/handover', requestController.handover);
router.post('/rescue', requestController.rescue);
router.post('/experience', requestController.experience);

router.get('adopt/:id', requestController.adopt);
router.put('/:id', requestController.updateStatus);

module.exports = router;