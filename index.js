const yamlProcessor = require('yamljs');
const csonProcessor = require('cson');
const plistProcessor = require('plist');
const tomlProcessor = require('@iarna/toml');

const fs = require('fs');

const multigrain = {
    json: function(content, format, parseOpts, buildOpts){
        const object = parse(content, format, parseOpts)
        const json = build(object, "json", buildOpts)
        return json
    },
    cson: function(content, format, parseOpts, buildOpts){
        const object = parse(content, format, parseOpts)
        const cson = build(object, "cson", buildOpts)
        return cson
    },
    yaml: function(content, format, parseOpts, buildOpts){
        const object = parse(content, format, parseOpts)
        const yaml = build(object, "yaml", buildOpts)
        return yaml
    },
    plist: function(content, format, parseOpts, buildOpts){
        const object = parse(content, format, parseOpts)
        const plist = build(object, "plist", buildOpts)
        return plist
    },
    toml: function(content, format, parseOpts, buildOpts){
        const object = parse(content, format, parseOpts)
        const toml = build(object, "toml", buildOpts)
        return toml
    }
}

function parse(content, format, parseOpts){

    interpretation = determineInterpretation(content, format)

    var args = []
    if(parseOpts){
        args = parseOpts.unshift(content)
    }
    else{
        args = parseOpts
    }

    if(interpretation == "cson"){
        const object = csonProcessor.parseCSONString(content, parseOpts)
        return object
    }
    else if(interpretation == "yaml"){
        const object = yamlProcessor.parse(content, parseOpts)
        return object
    }
    else if(interpretation == "plist"){
        const object = plistProcessor.parse(content, parseOpts)
        return object
    }
    else if(interpretation == "toml"){
        const object = tomlProcessor.parse(content, parseOpts)
        return object
    }
    else if(interpretation == "json"){
        const object = JSON.parse(content)
        return object
    }
}

function build(object, target, buildOpts){
    if(target == "cson"){
        const cson = csonProcessor.createCSONString(object, buildOpts)
        return cson
    }
    else if(target == "yaml"){
        const yaml = yamlProcessor.stringify(object, buildOpts)
        return yaml
    }
    else if(target == "plist"){
        const plist = plistProcessor.build(object, buildOpts)
        return plist
    }
    else if(target == "toml"){
        const toml = tomlProcessor.stringify(object, buildOpts)
        return toml
    }
    else if(target == "json"){
        return JSON.stringify(object)
    }
}

function determineInterpretation(content, format){
    var interpretation = ""
    if (format){
        interpretation = format
    }
    else{
        interpretation = inferFormat(content)
    }
    return interpretation
}

function inferFormat(content){
    if(content.match(/^\s*{/)){
        return "json"
    }
    else if(content.match(/^\s*</)){
        return "plist"
    }
    else if(content.match(/^\s*%/)){
        return "yaml"
    }
    else if(content.match(/^\s*---/)){
        return "yaml"
    }
}

module.exports = multigrain
