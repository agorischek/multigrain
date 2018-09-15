const mocha = require("mocha")
const chai = require("chai")
const assert = chai.assert

const multigrain = require(".././index.js")
// const fs = require('fs');

describe("Multigrain", function(){
    // it("should convert explicit JSON to JSON", function(){
    //     assert.equal(multigrain.json('{"key":"value"}', "json"), '{"key":"value"}')
    // })
    //
    // it("should convert explicit CSON to JSON", function(){
    //     assert.equal(multigrain.json('key:"value"', "cson"), '{"key":"value"}')
    // })
    // it("should convert explicit YAML to JSON", function(){
    //     assert.equal(multigrain.json('key: value', "yaml"), '{"key":"value"}')
    // })
    // it("should convert explicit PLIST to JSON", function(){
    //     assert.equal(multigrain.json('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>key</key><string>value</string></dict></plist>', "plist"), '{"key":"value"}')
    // })
    // it("should convert explicit TOML to JSON", function(){
    //     assert.equal(multigrain.json('key = "value"', "toml"), '{"key":"value"}')
    // })
    //
    // it("should convert explicit JSON to CSON", function(){
    //     assert.equal(multigrain.cson('{"key":"value"}', "json"), 'key: "value"')
    // })
    // it("should convert explicit JSON to YAML", function(){
    //     assert.equal(multigrain.yaml('{"key":"value"}', "json"), 'key: value\n')
    // })
    // it("should convert explicit JSON to PLIST", function(){
    //     assert.equal(multigrain.plist('{"key":"value"}', "json"), '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n  <dict>\n    <key>key</key>\n    <string>value</string>\n  </dict>\n</plist>')
    // })
    // it("should convert explicit JSON to TOML", function(){
    //     assert.equal(multigrain.toml('{"key":"value"}', "json"), 'key = "value"\n')
    // })

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

})
