define(['lodash', 'default_echart_option'], function (_, defaultOption) {


    function rebuildDataByDomain(data) {
        var domainStatics = {};
        var legendData = [];
        data.forEach(function (item, index) {
            item.domains.forEach(function (domainData) {
                var domainName = domainData.domain;
                if (!domainStatics[domainName]) {
                    domainStatics[domainName] = [];
                    legendData.push(domainName);
                }
                domainStatics[domainName][index] = domainData;
            })
        });

        return {
            data: domainStatics,
            legend: legendData
        }
    }

    return {
        ImageQuantity: function (data) {
            var option = _.extend({}, defaultOption);
            var rebuildData = rebuildDataByDomain(data);
            option.legend = {
                data: rebuildData.legend
            };
            option.series = [];
            for (var domain in rebuildData.data) {
                var domainDataList = rebuildData.data[domain];

                var seriesData = [];
                for (var i = 0, l = data.length; i < l; i++) {
                    var domainData = domainDataList[i];
                    var unit = [new Date(data[i].datetime)];
                    if (domainData) {
                        unit.push(domainData.total);
                        unit.push(domainData.transfer);
                    } else {
                        unit.push(0);
                        unit.push(0);
                    }
                    seriesData.push(unit);
                }

                option.series.push({
                    name         : domain,
                    type         : "line",
                    showAllSymbol: true,
                    symbolSize   : function (value) {
                        return Math.round(value[2] / 10000) + 2;
                    },
                    data         : seriesData
                });
            }

            option.tooltip.formatter = function (params) {
                var date = params.value[0];
                return date.toLocaleString() + '<br/>' +
                    params.value[1] + '个, 传输' + (params.value[2] / 1000).toFixed(2) + "KB";
            };

            return option;
        }
    }
});