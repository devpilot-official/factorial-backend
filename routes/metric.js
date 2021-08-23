let router = require('express').Router();
let controllers = require("../controllers/metric.js");

router.get('/', controllers.getMetrics);
router.get('/filter', controllers.filterMetrics)
router.post('/', controllers.addMetric);

module.exports = router;