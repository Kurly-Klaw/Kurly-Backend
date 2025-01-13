//importing modules
const express = require('express')
const userController = require('./userController')
const { signup, login, getUser, updateUser, deleteUser } = userController;
const checkUserMiddleware = require('../middlewares/checkUserMiddleware');

const router = express.Router();

router.post('/users/signup', checkUserMiddleware.check, signup);

//login route
router.post('/login', login);

// users?query=
router.get('/users', getUser);
router.put('/users/:email', updateUser);
router.delete('/users/:email', deleteUser);

module.exports = router;