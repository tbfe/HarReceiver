/**
 * 优先级
 * @type {number}
 */
exports.priority = 50;

/**
 * 预处理
 * @param {Object} entry
 * @param pageInfo
 * @param extra
 */
exports.process = function (entry, pageInfo, extra) {
    if (/javascript/.test(entry.response.content.mimeType)) {
        extra.type = "js";
    } else if (entry.response.content.mimeType === "text/css") {
        extra.type = "css";
    } else if (/^image\//.test(entry.response.content.mimeType)) {
        extra.type = "image";
    } else if (entry.request.url == pageInfo.url) {
        extra.type = "document";
    } else {
        extra.type = "other";
    }
};
