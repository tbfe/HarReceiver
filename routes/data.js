/**
 * @fileOverview 用于获取统计数据的接口
 * @module routes/data
 */

var express = require('express');
var router = express.Router();

var HarAnalyzer = require("../har-analyzer");
var ResourceSize = require("../models/resource_size");
var ImageResource = require("../models/image_source");
var CacheHit = require("../models/cache_hit");


/**
 * 数据库Model的Map
 */
var MODEL_MAP = {
    "ResourceSize": ResourceSize,
    "ImageResource": ImageResource,
    "CacheHit": CacheHit
};


/* POST users listing. */
router.get('/', function(req, res, next) {
    // 获取对应的数据库Model
    var model = MODEL_MAP[req.query.type];
    // 如果没有找到Model，那么认为请求参数不正确，返回400
    if (model && req.query.url) {
        var queryObject = {url: req.query.url};
        if (req.query.start || req.query.end) {
            var timeQuery = {};
            if (req.query.start) {
                timeQuery.$gte = new Date(req.query.start);
            }
            if (req.query.end) {
                timeQuery.$lte = new Date(req.query.end);
            }
            queryObject.datetime = timeQuery;
        }

        model.find(queryObject).exec(function (err, data) {
            res.status(200).json(data);
        });
    } else {
        res.status(400).render('error', {
            message: 'Bad Request',
            error: {}
        });
    }

});

module.exports = router;
