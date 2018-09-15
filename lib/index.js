const yamlProcessor = require('yamljs');
const csonProcessor = require('cson');
const plistProcessor = require('plist');
const tomlProcessor = require('@iarna/toml');
const jsonProcessor = JSON;

const determineInterpretation = require('./determine-interpretation.js')

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

    const interpretation = determineInterpretation(content, format)

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
        const object = jsonProcessor.parse(content)
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
        return jsonProcessor.stringify(object)
    }
}



module.exports = multigrain
