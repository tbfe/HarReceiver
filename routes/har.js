var express = require('express');
var router = express.Router();

var HarAnalyzer = require("../har-analyzer");
var ResourceSize = require("../models/resource_size");
var ImageResource = require("../models/image_source");
var CacheHit = require("../models/cache_hit");


var REPORT_TO_MODEL_MAP = {
    "ResourceSizeAnalyzer": ResourceSize,
    "ImageSourceAnalyzer": ImageResource,
    "CacheHitAnalyzer": CacheHit
};

var harAnalyzer = new HarAnalyzer();

/* POST users listing. */
router.post('/', function(req, res, next) {
    var report = harAnalyzer.execute(req.body);
    for (var p in report) {
        var Model = REPORT_TO_MODEL_MAP[p];
        if (Model) {
            Model.create(report[p], function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Data Persistence Error: ' + err);
                }
            });
        }
    }
    res.send('OK');
});

module.exports = router;
