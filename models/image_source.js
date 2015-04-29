var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSourceSchema = new Schema({
    url: String,
    datetime: Date,
    total: Number,
    domains: [{
        domain: String,
        total: Number,
        size: Number,
        transfer: Number,
        fromCache: Number,
        r304: Number
    }]
});

var ImageSource = mongoose.model('ImageSource', imageSourceSchema);

module.exports = ImageSource;