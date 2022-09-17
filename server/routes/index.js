const express = require('express');
const router = express.Router();

router.use('', require("./user.router"))
router.use('/api/password', require("./password.router"))
router.use('/api/logout', require("./logout.router"))

module.exports = router;
