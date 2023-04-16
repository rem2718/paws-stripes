const express = require('express');
const petsController = require('../controllers/petsController');
const router = express.Router();

router.post('/', petsController.createPet);
router.get('/', petsController.getPets);
router.put('/:id', petsController.updatePet);
router.delete('/:id', petsController.deletePet);

module.exports = router;