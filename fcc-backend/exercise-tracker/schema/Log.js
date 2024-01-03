const { default: mongoose } = require("mongoose");

const exerciseLogSchema = mongoose.Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
});

const logSchema = mongoose.Schema({
    username: { type: String, required: true },
    count: { type: Number, required: true },
    _id: { type: String, required: true },
    log: [exerciseLogSchema]
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;