const multigrain = require("./index.js")

console.log(multigrain.json('{"key":"value"}'))
console.log(multigrain.cson('{"key":"value"}'))
console.log(multigrain.yaml('{"key":"value"}'))
console.log(multigrain.plist('{"key":"value"}'))
console.log(multigrain.toml('{"key":"value"}'))

// console.log(multigrain.json('{"key":"value"}', "json"))
// console.log(multigrain.json('key:"value"', "cson"))
// console.log(multigrain.json('key: value', "yaml"))
// console.log(multigrain.json('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0"><dict><key>key</key><string>value</string></dict></plist>', "plist"))
// console.log(multigrain.json('key = "value"', "toml"))
