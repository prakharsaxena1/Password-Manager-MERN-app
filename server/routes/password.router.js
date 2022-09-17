const express = require("express");
const router = express.Router();
const passwordController = require('../controllers/password.controller');
const { authenticate } = require('../middlewares/authenticate');

router.route('/')
    .get(authenticate, passwordController.getPasswords)
    .post(authenticate, passwordController.addPassword)

router.route('/delete-account')
    .get(authenticate, passwordController.deleteAccount)
router.route('/:id')
    .get(authenticate, passwordController.getOnePassword)
    .patch(authenticate, passwordController.updatePassword)
    .delete(authenticate, passwordController.deletePassword)

router.route('/share')
    .post(authenticate, passwordController.sharePasswordSend)

router.route('/receive')
    .post(authenticate, passwordController.sharePasswordReceive)


module.exports = router;
