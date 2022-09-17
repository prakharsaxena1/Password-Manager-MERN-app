const { decryptData, encryptData, md5Hash } = require('./crypto.controller');
const nodemailer = require("nodemailer");
const Secret = require('../models/secret.model');
const User = require('../models/user.model');

// Adds 1 password th db
const addPassword = async (req, res) => {
    const details = encryptData({
        site_name: req.body.site_name,
        url: req.body.url,
        login: req.body.login,
        site_password: req.body.site_password
    }, req.user.password)
    try {
        const secret = await Secret.create({
            username: md5Hash(req.user.username),
            secretDetails: details
        })
        const data = {
            site_name: req.body.site_name,
            url: req.body.url,
            login: req.body.login,
            site_password: req.body.site_password,
            id: secret._id,
            updatedAt: secret.updatedAt
        }
        return res.status(200).json({ status: 'success', message: `Secret created`, data });
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: 'Error creating secret' });
    }
}

// Gets 1 password from db for a user
const getOnePassword = async (req, res) => {
    try {
        const secret = await Secret.findById(req.params.id);
        if (secret == null) {
            return res.status(404).json({ status: 'failed', message: `Contains 0 password` });
        }
        const secretDecrypted = JSON.parse(decryptData(secret.secretDetails, req.user.password))
        const data = {
            ...secretDecrypted
        }
        return res.status(200).json({ status: 'success', message: `Contains 1 password`, data });
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: err.message });
    }
}
// Gets all passwords from db for a user
const getPasswords = async (req, res) => {
    try {
        const secrets = await Secret.find({ username: md5Hash(req.user.username) })
        if (secrets.length === 0) {
            return res.status(200).json({ status: 'success', message: "No passwords found", data: [] });
        } else {
            const data = [];
            secrets.forEach((secret) => {
                const tempSecret = JSON.parse(decryptData(secret.secretDetails, req.user.password))
                tempSecret.id = secret._id;
                tempSecret.updatedAt = secret.updatedAt;
                data.push(tempSecret)
            })
            return res.status(200).json({ status: 'success', message: `Contains ${data.length} passwords`, data });
        }
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: "Incorrect credentials" });
    }
}

// Updates 1 password for user in the db
const updatePassword = async (req, res) => {
    try {
        const secret = await Secret.findOneAndUpdate(
            { _id: req.params.id },
            { secretDetails: encryptData(req.body.update, req.user.password) },
            { new: true }
        );
        if (secret === null) {
            return res.status(400).json({ status: 'failed', message: "invalid id" });
        } else {
            const data = {
                id: secret._id,
                updatedAt: secret.updatedAt,
                ...req.body.update
            }
            return res.status(200).json({ status: 'success', message: `updated secret`, data });
        }
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: "Incorrect credentials" });
    }
}

// Deletes 1 password for user in the db
const deletePassword = async (req, res) => {
    try {
        const secret = await Secret.findByIdAndDelete(req.params.id);
        if (secret === null) {
            return res.status(400).json({ status: 'failed', message: "invalid id" });
        } else {
            return res.status(200).json({ status: 'success', message: `deleted secret` });
        }
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: "Incorrect credentials 1" });
    }

}

// Shares password in encrypted form along with the key in encrypted form
const sharePasswordSend = async (req, res) => {
    const { sharedEmail, sharedPassword, id } = req.body;
    try {
        const secret = await Secret.findById(id);
        if (secret == null) {
            return res.status(404).json({ status: 'failed', message: `password not found` });
        }
        const secretDecrypted = JSON.parse(decryptData(secret.secretDetails, req.user.password))
        console.log(secretDecrypted);
        const message = encryptData(secretDecrypted, sharedPassword);
        const key = encryptData(sharedPassword, process.env.SERVER_ENCRYPTION_KEY)
        emailHandler(req, sharedEmail, message, key);
        return res.status(200).json({ status: 'success', message: `1 password shared` });
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: err.message });
    }
}

// Receives the encrypted password and key, decrypts them and store in db
const sharePasswordReceive = async (req, res) => {
    const { sharedMessage, sharedPassword } = req.body;
    try {
        const dec_sharedPassword = decryptData(sharedPassword, process.env.SERVER_ENCRYPTION_KEY).replaceAll('"', '');
        const message = JSON.parse(decryptData(sharedMessage, dec_sharedPassword));
        const details = encryptData(message, req.user.password)
        const secret = await Secret.create({
            username: md5Hash(req.user.username),
            secretDetails: details
        })
        const data = {
            ...message,
            id: secret._id,
            updatedAt: secret.updatedAt
        }
        return res.status(200).json({ status: 'success', message: `Secret created`, data });
    } catch (err) {
        return res.status(400).json({ status: 'failed', message: 'Error creating secret' });
    }
}

// Used for sending emails to user [share password]
const emailHandler = async (req, email, message, key) => {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
    let info = await transporter.sendMail({
        from: `Password Manager Team <support@passwordmanager.com>`, // sender address
        to: `${email}`,
        subject: `Hi, ${req.user.username} just shared a password with you`, // Subject line
        text: `Hi, \nHere is your shared password: \n ${message}\nOpen this with the following key:\n${key}`, // plain text body
        html: `<div>
        <strong>Hi,</strong><br />
        <p>Here is your shared password:</p>
        <code>${message}</code><br />
        <p>Open this with the following key:</p>
        <code>${key}</code><br />
        </div > `, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// DELETES ACCOUNT OF THE USER AND REMOVES ALL PASSWORDS
const deleteAccount = async (req, res) => {
    try {
        await User.deleteMany({ username: md5Hash(req.user.username) });
        await Secret.deleteMany({ username: md5Hash(req.user.username) });
        return res.status(200).json({ status: 'success', message: "Account removed" });
    } catch (err) {
        return res.status(404).json({ status: 'failed', message: "Account not found" });
    }
}

module.exports = {
    getPasswords,
    addPassword,
    updatePassword,
    deletePassword,
    getOnePassword,
    sharePasswordSend,
    sharePasswordReceive,
    deleteAccount
}