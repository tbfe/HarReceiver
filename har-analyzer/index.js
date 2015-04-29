var moduleLoader = require("./util/module_loader");

function HarAnalyzer() {
    // 加载预处理器
    this.preprocessors = [];
    moduleLoader.load(__dirname + "/preprocessor", this.preprocessors);
    // 对优先级进行排序
    this.preprocessors.sort(function (a, b) {
        return a.priority - b.priority;
    });

    // 加载分析器模块
    this.analyzerModules = [];
    moduleLoader.load(__dirname + "/analyzers", this.analyzerModules);
}

HarAnalyzer.prototype = {
    /**
     * execute har analyzer
     * @param {Object} harFile har file path
     * @returns {Object} report
     */
    execute: function (harFile) {
        // 构造分析器实例
        var analyzers = [];
        for (var aModule, i = 0; aModule = this.analyzerModules[i]; i++) {
            analyzers.push(new aModule);
        }

        var pageInfo = harFile.log.pages[0];
        var entries = harFile.log.entries;

        pageInfo.url = entries[0].request.url;

        var report = {};
        for (var entry, i = 0; entry = entries[i]; i++) {
            // 构造扩展信息
            var extra = {};
            // 进行预处理
            for (var preprocessor, j = 0; preprocessor = this.preprocessors[j]; j++) {
                preprocessor.process(entry, pageInfo, extra);
            }
            // 进行分析
            for (var analyzer, j = 0; analyzer = analyzers[j]; j++) {
                analyzer.process(entry, extra);
                var result = analyzer.getResult();
                result.url = pageInfo.url;
                var datetime = new Date(pageInfo.startedDateTime);
                console.log(pageInfo);
                console.log(datetime)
                result.datetime = datetime;
                report[analyzer.getName()] = result;
            }
        }

        return report;
    }
};

module.exports = HarAnalyzer;





