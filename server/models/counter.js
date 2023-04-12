const mongoose = require('mongoose');

const counterSchema =  new mongoose.Schema({
    _id: String,
    count: {type: Number, default: 1}
});

module.exports = mongoose.model('Counter', counterSchema);