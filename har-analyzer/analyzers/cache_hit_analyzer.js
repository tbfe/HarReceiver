var extend = require('util')._extend;

function CacheHitAnalyzer () {
    this.total = 0;
    this.r304 = 0;
    this.fromCache = 0;
    this.r304Header = 0;

    this.categories = {};
}

CacheHitAnalyzer.prototype = {
    getName: function () {
        return CacheHitAnalyzer.name;
    },

    process: function (entry, extra) {
        // 忽略文档
        if (extra.type == "document") {
            return;
        }

        var category = this.categories[extra.type];
        if (!category) {
            category = this.categories[extra.type] = {
                total: 0,
                r304: 0,
                fromCache: 0,
                r304Header: 0
            }
        }

        this.total++;
        category.total++;

        var requestHeader = entry.request.headersSize < 0 ? 0 : entry.request.headersSize;
        var headersSize = requestHeader + entry.response.headersSize;

        if (entry.response.status === 304) {
            this.r304++;
            category.r304++;
            this.r304Header += headersSize;
            category.r304Header += headersSize;

        } else if (extra.fromCache) {
            this.fromCache++;
            category.fromCache++;
        }
    },

    getResult: function () {
        return extend({
            total: this.total,
            r304: this.r304,
            fromCache: this.fromCache,
            r304Headers: this.r304Header
        }, this.categories);
    }
};

module.exports = CacheHitAnalyzer;