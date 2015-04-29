var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceSizeSchema = new Schema({
    url: String,
    datetime: Date,
    header: Number,
    body: Number,
    document: { body: Number, header: Number, content: Number },
    js: { body: Number, header: Number, content: Number },
    css: { body: Number, header: Number, content: Number },
    image: { body: Number, header: Number, content: Number },
    other: { body: Number, header: Number, content: Number }
});

var ResourceSize = mongoose.model('ResourceSize', resourceSizeSchema);

module.exports = ResourceSize;