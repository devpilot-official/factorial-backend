let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let metricSchema = new Schema({
    name: {type: String, required: true},
    value: {type: Number, default: 0},
    createdAt: Date,
    updatedAt: Date


}, { strict: true, timestamp: true });

metricSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model("Metric", metricSchema);
