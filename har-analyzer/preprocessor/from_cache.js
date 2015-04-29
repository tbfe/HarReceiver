/**
 * 优先级
 * @type {number}
 */
exports.priority = 100;

exports.process = function (entry, pageInfo, extra) {
    extra.fromCache = (entry.response.status === 200 && entry.response.bodySize === 0);
};
