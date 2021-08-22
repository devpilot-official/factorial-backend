const Metric = require('mongoose').model('Metric');

exports.getMetrics = async (req, res) => {
    return res.send({
        status: "success",
        message: "returns all metrics"
    });
}

exports.addMetric = async (req, res) => {
    return res.send({
        status: "success",
        message: "adds new metric"
    });
}