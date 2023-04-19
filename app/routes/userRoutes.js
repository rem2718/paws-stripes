const express = require('express');
const auth = require('../utils/authMiddleware');
const controller = require("../controllers/userController");
const router = express.Router({ mergeParams: true });

router.post('/signup', controller.createUser);
router.post('/login', controller.loginUser);

router.get('/:id', [auth], controller.getUser);
router.put('/:id', [auth], controller.updateUser);
router.delete('/:id', [auth], controller.deleteUser);

module.exports = router;