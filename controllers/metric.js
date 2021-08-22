const Metric = require('mongoose').model('Metric');

exports.getMetrics = async (req, res) => {
    await Metric.find({}, "-updatedAt -__v")
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
    }).then(function (q) {
         res.send({
             status: "success",
             message: "metric created",
             data: {
                 metricData,
             }
         });
     }).catch(e => {
        res.send({
            status: "error",
            message: e,
            data: null
        }); 
     });
}