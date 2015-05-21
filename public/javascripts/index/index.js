require(['jquery', 'echarts', 'echart_data_loader', 'echarts/chart/line'],
    function ($, ec, loader) {

        var myChart = ec.init(document.getElementById('chart'));

        var $address = $("#address");
        var $dataType = $("#dataType");
        var $start = $("#start");
        var $end = $("#end");

        var now = new Date();
        var startDate = new Date();
        startDate.setDate(now.getDate() - 7);

        $start.val(startDate.toISOString().substring(0, 10));
        $end.val(now.toISOString().substring(0, 10));

        function getQueryParams() {
            var query = {
                url : $address.val(),
                type: $dataType.val()
            };
            var startString = $start.val();
            var endString = $end.val();
            if (startString.length > 0) {
                query.start = new Date(startString);
            }
            if (endString.length > 0) {
                var end = new Date(endString);
                end.setDate(end.getDate() + 1);
                query.end = end;
            }
            return query;
        }

        $("#search").click(function () {
            loader.load(getQueryParams())
                .then(function (eChartOption) {
                    myChart.clear();
                    console.log(eChartOption);
                    // 为echarts对象加载数据
                    myChart.setOption(eChartOption);
                });

        });

    }
);