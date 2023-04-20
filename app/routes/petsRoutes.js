const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const controller = require('../controllers/petsController');
const router = express.Router({ mergeParams: true });

router.post('/', [auth, admin], controller.createPet);
router.get('/', controller.getPets);
router.put('/:id', [auth, admin], controller.updatePet);
router.delete('/:id', [auth, admin], controller.deletePet);

module.exports = router;