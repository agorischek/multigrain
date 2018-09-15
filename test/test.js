const mocha = require("mocha")
const chai = require("chai")
const assert = chai.assert

const multigrain = require("../lib/index.js")
const determineInterpretation = require('../lib/determine-interpretation.js')

describe("Multigrain", function(){
    it("should convert explicit JSON to JSON", function(){
        assert.equal(multigrain.json('{"key":"value"}', "json"), '{"key":"value"}')
    })

    it("should convert explicit CSON to JSON", function(){
        assert.equal(multigrain.json('key:"value"', "cson"), '{"key":"value"}')
    })
    it("should convert explicit YAML to JSON", function(){
        assert.equal(multigrain.json('key: value', "yaml"), '{"key":"value"}')
    })
    it("should convert explicit PLIST to JSON", function(){
        assert.equal(multigrain.json('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>key</key><string>value</string></dict></plist>', "plist"), '{"key":"value"}')
    })
    it("should convert explicit TOML to JSON", function(){
        assert.equal(multigrain.json('key = "value"', "toml"), '{"key":"value"}')
    })

    it("should convert explicit JSON to CSON", function(){
        assert.equal(multigrain.cson('{"key":"value"}', "json"), 'key: "value"')
    })
    it("should convert explicit JSON to YAML", function(){
        assert.equal(multigrain.yaml('{"key":"value"}', "json"), 'key: value\n')
    })
    it("should convert explicit JSON to PLIST", function(){
        assert.equal(multigrain.plist('{"key":"value"}', "json"), '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n  <dict>\n    <key>key</key>\n    <string>value</string>\n  </dict>\n</plist>')
    })
    it("should convert explicit JSON to TOML", function(){
        assert.equal(multigrain.toml('{"key":"value"}', "json"), 'key = "value"\n')
    })

    it("should convert unspecified JSON to JSON", function(){
        assert.equal(multigrain.json('{"key":"value"}'), '{"key":"value"}')
    })
    it("should convert unspecified CSON to JSON", function(){
        assert.equal(multigrain.json('key:"value"'), '{"key":"value"}')
    })
    it("should convert unspecified YAML to JSON", function(){
        assert.equal(multigrain.json('key: value'), '{"key":"value"}')
    })
    it("should convert unspecified PLIST to JSON", function(){
        assert.equal(multigrain.json('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>key</key><string>value</string></dict></plist>'), '{"key":"value"}')
    })
    it("should convert unspecified TOML to JSON", function(){
        assert.equal(multigrain.json('key = "value"'), '{"key":"value"}')
    })

    it("should parse CSON into a JavaScript opbject", function(){
        assert.deepEqual(multigrain.parse('{"key":"value"}', "json"), {key:'value'})
    })
    it("should convert unspecified CSON to JSON", function(){
        assert.deepEqual(multigrain.parse('key:"value"', "cson"), {key:'value'})
    })
    it("should convert unspecified YAML to JSON", function(){
        assert.deepEqual(multigrain.parse('key: value', "yaml"), {key:'value'})
    })
    it("should convert unspecified PLIST to JSON", function(){
        assert.deepEqual(multigrain.parse('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>key</key><string>value</string></dict></plist>', "plist"), {key:'value'})
    })
    it("should convert unspecified TOML to JSON", function(){
        assert.deepEqual(multigrain.parse('key = "value"', "toml"), {key:'value'})
    })

    it("should respect YAML parser options", function(){
        assert.notEqual(multigrain.json(' key: &anchor\n   a: b\n key2:\n   <<: *anchor', "yaml", {merge: false}), '{"key":{"a":"b"},"key2":{"a":"b"}}')
    })
    it("should respect CSON builder options", function(){
        assert.equal(multigrain.cson('{"a":{"b":"c"}}', "json", null, {indent:"\t\t"}), 'a:\n\t\tb: "c"')
    })

})

describe("Format interpreter", function(){
    it("should return explicit format string", function(){
        assert.equal(determineInterpretation("", "json"), "json")
        assert.equal(determineInterpretation("", "cson"), "cson")
        assert.equal(determineInterpretation("", "yaml"), "yaml")
        assert.equal(determineInterpretation("", "plist"), "plist")
        assert.equal(determineInterpretation("", "toml"), "toml")
    })
    it("should guess format when not specified", function(){
        assert.equal(determineInterpretation('{"key":"value"}'), "json")
        assert.equal(determineInterpretation('key: value'), "yaml")
        assert.equal(determineInterpretation('[table]\nname = "andrew"'), "toml")
        assert.equal(determineInterpretation('name = "andrew"'), "toml")
        assert.equal(determineInterpretation('---\nkey: 123\nanotherKey: 456'), "yaml")
        assert.equal(determineInterpretation('%YAML 1.2\n'), "yaml")
        assert.equal(determineInterpretation('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'), "plist")
        assert.equal(determineInterpretation('<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN">'), "plist")
        assert.equal(determineInterpretation('fruits\n- apple\n- orange'), "yaml")
        assert.equal(determineInterpretation('array: [\n    \n\'thing1\'\n    \'thing2\'\n]'), "cson")
    })
})
