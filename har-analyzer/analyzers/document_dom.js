//var cheerio = require("cheerio");

function DocumentAnalyzer () {
    this.dom = 0;
    this.domDeep = 0;
    this.scriptPercent = 0;
}

DocumentAnalyzer.prototype = {

    getName: function () {
        return DocumentAnalyzer.name;
    },

    process: function (entry, extra) {
        //if (extra.type === "document") {
        //    var content = entry.response.content.text;
        //    var $ = cheerio.load(content);
        //    this.dom = $("*").length;
        //    this.domDeep = calcDepth($("body"));
        //
        //    var contentLength = content.length;
        //    var scriptLength = 0;
        //    $("script").each(function () {
        //        var inner = this.children[0];
        //        if (inner) {
        //            scriptLength += inner.data.length;
        //        }
        //    });
        //    this.scriptPercent = scriptLength / contentLength;
        //}
    },

    getResult: function () {
        return {dom: this.dom,
            domDeep: this.domDeep,
            scriptPercent: this.scriptPercent
        };
    }
};

var calcDepth = function ($node) {
    var $children = $node.children();
    var depth = 0;

    while ( $children.length > 0 ) {
        $children = $children.children();
        depth += 1;
    }

    return depth;
};

module.exports = DocumentAnalyzer;