const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const tokenDecode = require('../utils/tokenDecodeMiddleware');
const multer = require('../utils/multerMiddleware');
const controller = require('../controllers/rescueController');
const router = express.Router({ mergeParams: true });

router.post('/', [tokenDecode, multer], controller.rescue);
router.get('/status', [auth], controller.getStatus);
router.get('/statuses', [auth, admin], controller.getStatuses);
router.get('/image/:id', [auth], controller.getPetImage);
router.put('/status/:id', [auth, admin], controller.updateStatus);

module.exports = router;