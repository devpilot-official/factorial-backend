const date = require("date.js");
const Metric = require('mongoose').model('Metric');

exports.getMetrics = async (req, res) => {
    await Metric.find({}, "-updatedAt -__v").sort({ createdAt: "descending" })
    .then((metrics) => {
        res.send({
            status: "success",
            message: "all metrics",
            data: metrics
        });
    }).catch((e) => {
        res.send({
            status: "error",
            message: e,
            data: null
        });  
    })
}

exports.filterMetrics = async (req, res) => {
    const filter = req.query.filter;
    let queryDate, metrics;

    try {
        switch (filter) {
            case "minute":
                queryDate = date("1 minute ago");
                metrics = await Metric.find({ $and: [
                    { createdAt: { $gte: queryDate } },
                    { createdAt: { $lte: new Date() } }
                ]}, "-updatedAt -__v").sort({ createdAt: "descending" }).exec();
                break;
            case "hour":
                queryDate = date("1 hour ago");
                metrics = await Metric.find({ $and: [
                    { createdAt: { $gte: queryDate } },
                    { createdAt: { $lte: new Date() } }
                ]}, "-updatedAt -__v").sort({ createdAt: "descending" }).exec();
                break; 
            case "day":
                queryDate = date("1 day ago");
                metrics = await Metric.find({ $and: [
                    { createdAt: { $gte: queryDate } },
                    { createdAt: { $lte: new Date() } }
                ]}, "-updatedAt -__v").sort({ createdAt: "descending" }).exec();
                break;
            
            default:
                metrics = await Metric.find({}).sort({ createdAt: "descending" });
                break;
        }
        
        res.send({
            status: "success",
            message: `last ${filter} metrics`,
            data: metrics
        });
    } catch (error) {
        res.send({
            status: "error",
            message: error,
            data: null
        });
    }

}

exports.addMetric = async (req, res) => {
    let metricData = req.body;
    const required_request_keys = [
        "name",
        "value"
    ];
    
    if (!required_request_keys.every(arg => arg in metricData && metricData[arg])) {
        return res.status(400).send({
            status: "error",
            message: "invalid request parameters",
            data: null
        });
    }

    const metric = Metric.create({
        name: metricData.name,
        value: metricData.value
    }).then(function (metric) {
        res.send({
             status: "success",
             message: "metric created",
             data: metric
        });
     }).catch(e => {
        res.send({
            status: "error",
            message: e,
            data: null
        }); 
     });
}