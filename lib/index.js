var yamlProcessor = require('yaml').default;
var csonProcessor = require('cson');
var plistProcessor = require('plist');
var tomlProcessor = require('@iarna/toml');
var jsonProcessor = {
    stringify: require('json-stringify-pretty-compact'),
    parse: JSON.parse
};

var determineInterpretation = require('./determine-interpretation.js');

var multigrain = {
    parse: function(content, format, parseOpts, builtOpts){
        var object = parse(content, format, parseOpts);
        return object;
    },
    json: function(content, format, parseOpts, buildOpts){
        var object = parse(content, format, parseOpts);
        var json = build(object, "json", buildOpts);
        return json;
    },
    cson: function(content, format, parseOpts, buildOpts){
        var object = parse(content, format, parseOpts);
        var cson = build(object, "cson", buildOpts);
        return cson;
    },
    yaml: function(content, format, parseOpts, buildOpts){
        var object = parse(content, format, parseOpts);
        var yaml = build(object, "yaml", buildOpts);
        return yaml;
    },
    plist: function(content, format, parseOpts, buildOpts){
        var object = parse(content, format, parseOpts);
        var plist = build(object, "plist", buildOpts);
        return plist;
    },
    toml: function(content, format, parseOpts, buildOpts){
        var object = parse(content, format, parseOpts);
        var toml = build(object, "toml", buildOpts);
        return toml;
    }
};

function parse(content, format, parseOpts){

    var interpretation = determineInterpretation(content, format);
    var object = {};

    if(interpretation == "object"){
        return content;
    }
    else if(interpretation == "cson"){
        object = csonProcessor.parseCSONString(content, parseOpts);
        return object;
    }
    else if(interpretation == "yaml"){
        object = yamlProcessor.parse(content, parseOpts);
        return object;
    }
    else if(interpretation == "plist"){
        object = plistProcessor.parse(content, parseOpts);
        return object;
    }
    else if(interpretation == "toml"){
        object = tomlProcessor.parse(content, parseOpts);
        return object;
    }
    else if(interpretation == "json"){
        object = jsonProcessor.parse(content);
        return object;
    }
}

function build(object, target, buildOpts){
    if(target == "cson"){
        var cson = csonProcessor.createCSONString(object, buildOpts);
        return cson;
    }
    else if(target == "yaml"){
        var yaml = yamlProcessor.stringify(object, buildOpts);
        return yaml;
    }
    else if(target == "plist"){
        var plist = plistProcessor.build(object, buildOpts);
        return plist;
    }
    else if(target == "toml"){
        var toml = tomlProcessor.stringify(object, buildOpts);
        return toml;
    }
    else if(target == "json"){
        var json = jsonProcessor.stringify(object);
        return json;
    }
}

module.exports = multigrain;
