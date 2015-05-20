/**
 * @fileOverview 用于获取图表对应的eCharts Option
 * @module echart_data_loader
 */
define(['lodash', 'data_loader'], function (_, loader) {
    var DEFAULT_OPTION = {
        tooltip : {
            trigger: 'item'
        },
        toolbox: {
            show : true,
            feature : {
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataZoom: {
            show: true,
            start : 70
        },
        xAxis  : [{type: 'time'}],
        yAxis  : [{type: 'value'}]
    };


    /**
     *
     * @param {string} property
     * @param data
     * @returns {{name: string, type: string, showAllSymbol: boolean, data: Array}}
     */
    function generateSeries(property, data) {
        var getProperty = _.property(property);
        return {
            name         : property,
            type         : "line",
            showAllSymbol: true,
            data         : _.map(data, function (item) {
                return [
                    new Date(item.datetime),
                    getProperty(item)
                ];
            })
        };
    }

    /**
     *
     * @param seriesList
     * @param data
     * @returns {Object}
     */
    function generateOption(seriesList, data) {
        var option = _.extend({}, DEFAULT_OPTION);
        option.legend = {
            data: seriesList
        };
        option.series = [];
        seriesList.forEach(function (series) {
            option.series.push(generateSeries(series, data));
        });
        return option;
    }

    var optionsParsers = {
        ResourceSize : function (data) {

            var option = generateOption([
                'body',
                'header',
                'js.body',
                'js.header',
                'js.content',
                'css.body',
                'css.header',
                'css.content',
                'image.body',
                'image.header'
            ], data);
            option.tooltip.formatter = function (params) {
                var date = params.value[0];
                return date.toLocaleString() + '<br/>'
                    + (params.value[1] / 1000).toFixed(2) + "KB"
            };
            return option;
        },
        ImageResource: function (data) {
            var domainStatics = {};
            var legendData = [];
            data.forEach(function (item, index) {
                 item.domains.forEach(function (domainData) {
                     var domainName = domainData.domain;
                     if (domainStatics[domainName]) {
                         domainStatics[domainName] = [];
                         legendData.push(domainName);
                     }
                     domainStatics[domainName][index] = domainData;
                 })
             });

            throw new Error("Unsupported Operation Error.");
        },
        CacheHit: function (data) {
            var option = generateOption([
                'total',
                'r304',
                'fromCache',
                'js.total',
                'js.r304',
                'js.fromCache',
                'css.total',
                'css.r304',
                'css.fromCache',
                'image.total',
                'image.r304',
                'image.fromCache'
            ], data);
            option.tooltip.formatter = function (params) {
                var date = params.value[0];
                return date.toLocaleString() + '<br/>' +
                    params.value[1] + '个';
            };
            return option;
        }
    };


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
        return loader.load(params)
            .then(function (data) {
                var parser = optionsParsers[params.type];
                return parser(data);
            });
    }

    return {
        load: load
    }
});