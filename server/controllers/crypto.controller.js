const CryptoJS = require("crypto-js");

// Encrypts plaintest data
const encryptData = (plaintext, password) => CryptoJS.AES.encrypt(JSON.stringify(plaintext), password).toString();

// Decrypts ciphertext data
const decryptData = (ciphertext, password) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password)
    if (bytes.toString() === "") {
        throw new Error("Invalid password");
    }
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Creates a MD5 hash for the text provided
const md5Hash = (text) => CryptoJS.MD5(text).toString();

module.exports = {
    encryptData,
    decryptData,
    md5Hash
}