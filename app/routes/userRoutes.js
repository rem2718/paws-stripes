const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router({mergeParams: true});

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);

router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;