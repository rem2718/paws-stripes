const express = require('express');
const auth = require('../utils/authMiddleware');
const controller = require("../controllers/userController");
const router = express.Router({ mergeParams: true });

router.post('/signup', controller.createUser);
router.post('/login', controller.loginUser);
router.post('/logout', controller.logoutUser);

router.get('/', [auth], controller.getUser);
router.put('/', [auth], controller.updateUser);
router.delete('/', [auth], controller.deleteUser);
router.get('/hours/', [auth], controller.getHours);

module.exports = router;