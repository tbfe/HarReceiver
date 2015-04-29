var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cacheHitSchema = new Schema({
    url: String,
    datetime: Date,
    total: Number,
    r304: Number,
    fromCache: Number,
    r304Headers: Number,
    other: { total: Number, r304: Number, fromCache: Number, r304Header: Number },
    js: { total: Number, r304: Number, fromCache: Number, r304Header: Number },
    image: { total: Number, r304: Number, fromCache: Number, r304Header: Number },
    css: { total: Number, r304: Number, fromCache: Number, r304Header: Number }
});

var CacheHit = mongoose.model('CacheHit', cacheHitSchema);

module.exports = CacheHit;