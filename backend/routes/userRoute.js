const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')


router.route('/register').get(userController.getRegister).post(userController.postRegister);
router.route('/login').get(userController.getLogin).post(userController.postLogin);
router.route('/home').get(protect, userController.getHome)
module.exports = router;
