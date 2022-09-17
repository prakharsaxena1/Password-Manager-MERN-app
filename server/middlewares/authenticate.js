const jwt = require('jsonwebtoken');
const { decryptData } = require('../controllers/crypto.controller');

function authenticate(req, res, next) {
    const authHeader = req.headers.cookie
    const token = authHeader && authHeader.split('bearer%20')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, value) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        // console.log("user authenticated");
        req.user = JSON.parse(decryptData(value.tokenData, process.env.SERVER_ENCRYPTION_KEY))
        next()
    })
}

module.exports = {
    authenticate
}