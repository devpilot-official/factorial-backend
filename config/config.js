let path = require('path');
const dotenv = require("dotenv");
let rootPath = path.normalize(__dirname + '');

dotenv.config();

module.exports = {
    development: {
        db: process.env.MONGODB_URL,
        dbUser:process.env.DB_USER,
        dbPass:process.env.DB_PASS,
        rootPath: rootPath,
        port: process.env.PORT || 3073,
    },
    production: {
        db: process.env.MONGODB_URL,
        dbUser:process.env.DB_USER,
        dbPass:process.env.DB_PASS,
        rootPath: rootPath,
        port: process.env.PORT || 3073,
    }
};