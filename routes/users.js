var express = require('express');
var router = express.Router();

var HarAnalyzer = require('../har-analyzer');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var harAnalyzer = new HarAnalyzer();
    console.log(harAnalyzer.preprocessors.length);
    console.log(harAnalyzer.analyzerModules.length);
    res.send('respond with a resource');
});

module.exports = router;
