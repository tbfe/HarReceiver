var url = require("url");

/**
 * 获取域名
 * @param {String} string
 * @returns {String}
 */
function getDomain(string) {
    return url.parse(string).hostname;
}

function ImageSourceAnalyzer () {
    this.total = 0;
    this.domains = {};
}

ImageSourceAnalyzer.prototype = {

    getName: function () {
        return ImageSourceAnalyzer.name;
    },

    process: function (entry, extra) {
        if (extra.type === "image") {
            this.total++;
            var domainName = getDomain(entry.request.url);
            var domain = this.domains[domainName];
            if (!domain) {
                domain = this.domains[domainName] = {
                    total: 0,
                    size: 0,
                    transfer: 0,
                    fromCache: 0,
                    r304: 0
                };
            }
            domain.total++;
            domain.size += entry.response.content.size;
            domain.transfer += entry.response._transferSize;
            if (extra.fromCache) { domain.fromCache++; }
            else if (entry.request.status == 304) { domain.r304++; }
        }
    },

    getResult: function () {
        var domainsResult = [];
        for (var domain in this.domains) {
            var result = this.domains[domain];
            result.domain = domain;
            domainsResult.push(result);
        }
        return {
            total: this.total,
            domains: domainsResult
        };
    }
};

module.exports = ImageSourceAnalyzer;