let express = require('express');
let router = express.Router();

router.use('/metric', require('./metric.js'));
module.exports = router;