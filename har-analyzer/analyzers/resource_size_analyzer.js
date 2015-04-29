var extend = require('util')._extend;

function ResourceSizeAnalyzer () {
    this.result = {
        header: 0,
        body: 0
    };

    this.categories = {};
}

ResourceSizeAnalyzer.prototype = {
    getName: function () {
        return ResourceSizeAnalyzer.name;
    },

    process: function (entry, extra) {
        // 如果请求fromCache，说明没有发请求，那么整个header大小应该视作为0
        var headersSize = extra.fromCache ? 0 : entry.request.headersSize + entry.response.headersSize;
        headersSize = headersSize < 0 ? 0 : headersSize;

        this.result.header += headersSize;

        var bodySize = entry.request.bodySize + entry.response.bodySize;
        this.result.body += bodySize;

        var category = this.categories[extra.type];
        if (!category) {
            category = this.categories[extra.type] = {
                body: 0,
                header: 0,
                content: 0
            }
        }
        category.header += headersSize;
        category.body += bodySize;
        category.content += entry.response.content.size;

    },

    getResult: function () {
        return extend(this.result, this.categories);
    }

};

module.exports = ResourceSizeAnalyzer;