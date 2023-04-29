const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const multer = require('../utils/multerMiddleware');
const controller = require('../controllers/petsController');
const router = express.Router({ mergeParams: true });


router.post('/', [auth, admin, multer], controller.createPet);
router.get('/', controller.getPets);
router.get('/image/:id', controller.getPetImage);
router.put('/:id', [auth, admin, multer], controller.updatePet);
router.delete('/:id', [auth, admin], controller.deletePet);

module.exports = router;