/**
 * @fileOverview 用于获取图表对应的eCharts Option
 * @module echart_data_loader
 */
define(['lodash', 'data_loader', 'default_echart_option', 'image_sources_parser'], function (_, loader, defaultOption, imageParser) {
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
        var option = _.extend({}, defaultOption);
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
                'document.content',
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

    _.extend(optionsParsers, imageParser);

    var PARSER_TO_MODEL = {
        ImageQuantity: "ImageResource"
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

        var parserType = params.type;
        if (PARSER_TO_MODEL[parserType]) {
            params.type = PARSER_TO_MODEL[parserType];
        }

        return loader.load(params)
            .then(function (data) {
                var parser = optionsParsers[parserType];
                return parser(data);
            });
    }

    return {
        load: load
    }
});