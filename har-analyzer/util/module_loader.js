'use strict';

var fs = require('fs');
var pathModule = require('path');

/**
 * load node module dynamically
 * @param {String} path absolute path to load modules
 * @param {Array} modules result
 */
function loadModules(path, modules) {
    var stat = fs.lstatSync(path);
    if (stat.isDirectory()) {
        var files = fs.readdirSync(path);
        for (let file of files) {
            var f = pathModule.join(path, file);
            loadModules(f, modules);
        }
    } else {
        var mod = require(path);
        modules.push(mod);
    }

}

/**
 * load node module dynamically
 * @param {String} path a path to load modules
 * @param {Array} modules result
 */
function load (path, modules) {
    path = pathModule.resolve(path);
    loadModules(path, modules);
}

exports.load = load;