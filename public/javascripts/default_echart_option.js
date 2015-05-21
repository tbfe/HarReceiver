define({
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
});