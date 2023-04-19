const express = require('express');
const controller = require('../controllers/petsController');
const router = express.Router({ mergeParams: true });

router.post('/', controller.createPet);
router.get('/', controller.getPets);
router.put('/:id', controller.updatePet);
router.delete('/:id', controller.deletePet);

module.exports = router;