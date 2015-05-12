var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var baseSchema = {
    total     : Number,
    r304      : Number,
    fromCache : Number,
    r304Header: Number
};

var cacheHitSchema = new Schema({
    url        : String,
    datetime   : Date,
    total      : Number,
    r304       : Number,
    fromCache  : Number,
    r304Headers: Number,
    other      : baseSchema,
    js         : baseSchema,
    image      : baseSchema,
    css        : baseSchema
});

var CacheHit = mongoose.model('CacheHit', cacheHitSchema);

module.exports = CacheHit;