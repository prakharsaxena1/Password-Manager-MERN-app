// Dependencies
const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')

// Routes
router.route('/register').post(userController.registerUser)
router.route('/login').post(userController.loginUser)

// Exports
module.exports = router;