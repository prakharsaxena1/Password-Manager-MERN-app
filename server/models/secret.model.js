const mongoose = require("mongoose");

const secret = new mongoose.Schema({
    username: { type: String, required: true },
    secretDetails: { type: String, required: true }
},
    { timestamps: true });

const Secret = mongoose.model("Secret", secret);
module.exports = Secret;
