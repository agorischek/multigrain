const mocha = require("mocha")
const chai = require("chai")
const assert = chai.assert

const multigrain = require(".././index.js")
// const fs = require('fs');

describe("Multigrain", function(){
    it("should convert JSON to JSON", function(){
        assert.equal(multigrain.json('{"key":"value"}', "json"), '{"key":"value"}')
    })
    it("should convert CSON to JSON", function(){
        assert.equal(multigrain.json('key:"value"', "cson"), '{"key":"value"}')
    })
    it("should convert YAML to JSON", function(){
        assert.equal(multigrain.json('key: value', "yaml"), '{"key":"value"}')
    })
    it("should convert PLIST to JSON", function(){
        assert.equal(multigrain.json('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>key</key><string>value</string></dict></plist>', "plist"), '{"key":"value"}')
    })
    it("should convert TOML to JSON", function(){
        assert.equal(multigrain.json('key = "value"', "toml"), '{"key":"value"}')
    })
    it("should convert CSON to JSON", function(){
        assert.equal(multigrain.json('key:"value"', "cson"), '{"key":"value"}')
    })
    it("should convert YAML to JSON", function(){
        assert.equal(multigrain.json('key: value', "yaml"), '{"key":"value"}')
    })
    it("should convert PLIST to JSON", function(){
        assert.equal(multigrain.json('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>key</key><string>value</string></dict></plist>', "plist"), '{"key":"value"}')
    })
    it("should convert TOML to JSON", function(){
        assert.equal(multigrain.json('key = "value"', "toml"), '{"key":"value"}')
    })

})
