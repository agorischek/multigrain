const yamlProcessor = require('yamljs');
const csonProcessor = require('cson');
const plistProcessor = require('plist');
const tomlProcessor = require('@iarna/toml');

const fs = require('fs');

const multigrain = {
    json: function(content, format, toObjectOpts, toTargetOpts){
        const object = toObject(content, format, toObjectOpts)
        const json = toTarget(object, "json", toTargetOpts)
        return json
    },
    cson: function(content, format, toObjectOpts, toTargetOpts){
        const object = toObject(content, format, toObjectOpts)
        const cson = toTarget(object, "cson", toTargetOpts)
        return cson
    },
    yaml: function(content, format, toObjectOpts, toTargetOpts){
        const object = toObject(content, format, toObjectOpts)
        const yaml = toTarget(object, "yaml", toTargetOpts)
        return yaml
    },
    plist: function(content, format, toObjectOpts, toTargetOpts){
        const object = toObject(content, format, toObjectOpts)
        const plist = toTarget(object, "plist", toTargetOpts)
        return plist
    },
    toml: function(content, format, toObjectOpts, toTargetOpts){
        const object = toObject(content, format, toObjectOpts)
        const toml = toTarget(object, "toml", toTargetOpts)
        return toml
    }
}

function toObject(content, format, toObjectOpts){

    var interpretation = ""
    if (format){
        interpretation = format
    }
    else{
        interpretation = inferFormat(content)
    }

    var args = []
    if(toObjectOpts){
        args = toObjectOpts.unshift(content)
    }
    else{
        args = toObjectOpts
    }

    if(interpretation == "cson"){
        const object = csonProcessor.parseCSONString(content, toObjectOpts)
        return object
    }
    else if(interpretation == "yaml"){
        const object = yamlProcessor.parse(content, toObjectOpts)
        return object
    }
    else if(interpretation == "plist"){
        const object = plistProcessor.parse(content, toObjectOpts)
        return object
    }
    else if(interpretation == "toml"){
        const object = tomlProcessor.parse(content, toObjectOpts)
        return object
    }
    else if(interpretation == "json"){
        const object = JSON.parse(content)
        return object
    }
}

function toTarget(object, target, toTargetOpts){
    if(target == "cson"){
        const cson = csonProcessor.createCSONString(object, toTargetOpts)
        return cson
    }
    else if(target == "yaml"){
        const yaml = yamlProcessor.stringify(object, toTargetOpts)
        return yaml
    }
    else if(target == "plist"){
        const plist = plistProcessor.build(object, toTargetOpts)
        return plist
    }
    else if(target == "toml"){
        const toml = tomlProcessor.stringify(object, toTargetOpts)
        return toml
    }
    else if(target == "json"){
        return JSON.stringify(object)
    }
}

function inferFormat(content){
    return "json"
}

module.exports = multigrain
