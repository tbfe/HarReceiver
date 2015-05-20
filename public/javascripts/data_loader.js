/**
 * @fileOverview 用于获取统计数据
 * @author clover_4l
 */
define(['jquery'], function ($) {

    /**
     * 获取数据
     * @param {Object} params
     * @params {String} params.url
     * @params {String} params.type
     * @params {Date} [params.start]
     * @params {Date} [params.end]
     * @returns {Promise}
     */
    function load(params) {
        if (!params) {
            throw new Error('missing arguments error.');
        }
        return new Promise(function (resolve, reject) {
            var query = Object.create(params);
            if (params.start) {
                query.start = params.start.toISOString();
            }
            if (params.end) {
                query.end = params.end.toISOString();
            }

            $.get("/data", query)
                .done(function (data) {
                    resolve(data);
                })
                .fail(function (xhr, status, err) {
                    reject(err);
                });
        });
    }

    return {
        load: load
    }
});