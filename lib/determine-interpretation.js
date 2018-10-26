module.exports = determineInterpretation;

function determineInterpretation(content, format){
    var interpretation = "";

    if (typeof content == "object"){
        interpretation = "object";
    }

    else if (format){
        interpretation = format;
    }
    else{
        interpretation = inferFormat(content);
    }

    return interpretation;
}

function inferFormat(content){

    var lines = content.split(/\n/);

    for (i = 0; i < lines.length; i++){
        var line = lines[i];

        // Match JSON
        if(line.match(/^\s*{/)){
            return "json";
        }

        // Match YAML
        else if(line.match(/^\s*-/)){
            return "yaml";
        }
        else if(line.match(/^\s*\S+:\s*\w/)){
            return "yaml";
        }
        else if(line.match(/^\s*%/)){
            return "yaml";
        }
        else if(line.match(/^\s*---/)){
            return "yaml";
        }

        // Match PLIST
        else if(line.match(/^\s*</)){
            return "plist";
        }
        else if(line.match(/^<!DOCTYPE plist/)){
            return "plist";
        }

        // Match TOML
        else if(line.match(/^\s*\S+\s*=\s*"/)){
            return "toml";
        }
        else if(line.match(/^\s*\["/)){
            return "toml";
        }

    }

    // All else is assumed to be CSON
    return "cson";
}
