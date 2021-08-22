let mongoose=require('mongoose')    ;
mongoose.Promise = require('bluebird');

require('./models/metrics.js');

module.exports = function (config) {

    mongoose.connect(config.db,{
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    );

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log("📦  MongoDB Connected!")
    });
};