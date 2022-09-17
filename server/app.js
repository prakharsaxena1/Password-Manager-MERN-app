require("./db/connection");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

// Middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use(require('./routes'));

// Invalid request handler
app.use('*', (req, res) => {
    res.json({
        message: `INVALID REQUEST AT: ${req.originalUrl}`
    })
})

module.exports = app;
