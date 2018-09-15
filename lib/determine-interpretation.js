module.exports = determineInterpretation

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
    else{
        const lines = content.split(/\n/)
        for (i = 0; i < lines.length; i++){
            const line = lines[i]
            if(line.match(/^\s*{/)){
                return "json"
            }
            else if(line.match(/^\s*</)){
                return "plist"
            }
            else if(line.match(/^<!DOCTYPE plist/)){
                return "plist"
            }
            else if(line.match(/^\s*%/)){
                return "yaml"
            }
            else if(line.match(/^\s*---/)){
                return "yaml"
            }
            else if(line.match(/^\s*\S+\s*=\s*"/)){
                return "toml"
            }
            else if(line.match(/^\s*\["/)){
                return "toml"
            }
            else if(line.match(/^\s*-/)){
                return "yaml"
            }
        }
        return "cson"
    }
}
