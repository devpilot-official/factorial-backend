const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const env = process.env.node_env;
const config = require('./config/config')[env];
require('./data/connect.js')(config);

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes/index.js'));

app.get('/', (req, res) => {
    return res.send({
        status: "success",
        message: `Welcome to ${process.env.service_name}`
    })
})

module.exports = app;
