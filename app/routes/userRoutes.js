const express = require('express');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');
const controller = require("../controllers/userController");
const router = express.Router({ mergeParams: true });

router.post('/signup', controller.createUser);
router.post('/login', controller.loginUser);

router.get('/:id', controller.getUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', [auth, admin], controller.deleteUser);

module.exports = router;