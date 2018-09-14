const yamlProcessor = require('yamljs');
const csonProcessor = require('cson');
const plistProcessor = require('plist');
const tomlProcessor = require('toml');

const fs = require('fs');

const multigrain = {
    json: function(content, format, toJsonOpts, toTargetOpts){
        const json = toJson(content, format, toJsonOpts)
        return json
    },
    cson: function(content, format, toJsonOpts, toTargetOpts){
        const json = toJson(content, format, toJsonOpts)
        const cson = toTarget(json, "cson", toTargetOpts)
        return cson
    },
    yaml: function(content, format, toJsonOpts, toTargetOpts){
        const json = toJson(content, format, toJsonOpts)
        const yaml = toTarget(json, "yaml", toTargetOpts)
        return yaml
    },
    plist: function(content, format, toJsonOpts, toTargetOpts){
        const json = toJson(content, format, toJsonOpts)
        const plist = toTarget(json, "plist", toTargetOpts)
        return plist
    },
    toml: function(content, format, toJsonOpts, toTargetOpts){
        const json = toJson(content, format, toJsonOpts)
        const toml = toTarget(json, "toml", toTargetOpts)
        return toml
    }
}

function toJson(content, format, toJsonOpts){

    var interpretation = "json"
    if (format){
        interpretation = format
    }
    else{
        interpration = inferFormat(content)
    }

    if(interpretation == "cson"){
        const json = csonProcessor(content, interpretation, toJsonOpts)
        return json
    }
    else if(interpretation == "yaml"){
        const json = yamlProcessor(content, interpretation, toJsonOpts)
        return json
    }
    else if(interpretation == "plist"){
        const json = plistProcessor(content, interpretation, toJsonOpts)
        return json
    }
    else if(interpretation == "toml"){
        const json = tomlProcessor(content, interpretation, toJsonOpts)
        return json
    }
    else if(interpretation == "json"){
        const json = content
        return json
    }
}

function toTarget(json, target, toTargetOpts){
    if(target == "cson"){
        const cson = csonProcessor(json, format, toTargetOpts)
        return cson
    }
    else if(target == "yaml"){
        const yaml = yamlProcessor(json, format, toTargetOpts)
        return yaml
    }
    else if(target == "plist"){
        const plist = plistProcessor(json, format, toTargetOpts)
        return plist
    }
    else if(target == "toml"){
        const toml = tomlProcessor(json, format, toTargetOpts)
        return toml
    }
    else if(target == "json"){
        return json
    }
}

function inferFormat(content){
    return "json"
}

module.exports = multigrain
