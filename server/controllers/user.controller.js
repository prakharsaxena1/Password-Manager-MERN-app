const User = require('../models/user.model');
const { md5Hash, decryptData, encryptData } = require('../controllers/crypto.controller');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: md5Hash(req.body.username) })
        if (user === null) {
            return res.status(400).json({ status: 'failed', message: "Invalid username" });
        } else {
            const encPassword = user.password;
            // Test if password is correct or not by decrypting
            const tokenData = encryptData({
                username: req.body.username,
                password: decryptData(encPassword, req.body.password).replaceAll('"', '')
            }, process.env.SERVER_ENCRYPTION_KEY)
            const token = 'bearer ' + jwt.sign({ tokenData }, process.env.TOKEN_SECRET);
            return res
                .cookie('auth_token', token, { expires: new Date(Date.now() + 1800 * 1000) })
                .status(200)
                .json({ status: 'success', message: "Login success" });
        }
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: "Incorrect credentials" });
    }
}

const registerUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: md5Hash(req.body.username) })
        if (user === null) {
            const encPassword = encryptData(req.body.password, req.body.password)
            await User.create({ username: md5Hash(req.body.username), password: encPassword });
            const tokenData = encryptData({
                username: req.body.username,
                password: req.body.password
            }, process.env.SERVER_ENCRYPTION_KEY)
            const token = 'bearer ' + jwt.sign({ tokenData }, process.env.TOKEN_SECRET);
            return res
                .cookie('auth_token', token, { expires: new Date(Date.now() + 1800 * 1000) })
                .status(200).json({ status: 'success', message: "Registration success" });
        } else {
            return res.status(400).json({ status: 'failed', message: "Username taken" });
        }
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: "Registration failed" });
    }
}

module.exports = {
    registerUser,
    loginUser
}