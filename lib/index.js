var csonProcessor = require("cson");
var jsonProcessor = {
  stringify: require("json-stringify-pretty-compact"),
<<<<<<< Updated upstream
  parse: JSON.parse
=======
  parse: JSON.parse,
>>>>>>> Stashed changes
};
var plistProcessor = require("plist");
var tomlProcessor = require("@iarna/toml");
var yamlProcessor = require("yaml");

var clone = require("clone");

var determineInterpretation = require("./determine-interpretation.js");
var defaultOptions = require("./options.js");
var options = clone(defaultOptions);

var multigrain = {
  options: {
    cson: {
<<<<<<< Updated upstream
      parse: function(opts) {
        options.cson.parse = opts;
      },
      build: function(opts) {
        options.cson.build = opts;
      }
    },
    json: {
      parse: function(opts) {
        options.json.parse = opts;
      },
      build: function(opts) {
        options.json.build = opts;
      }
    },
    plist: {
      parse: function(opts) {
        options.plist.parse = opts;
      },
      build: function(opts) {
        options.plist.build = opts;
      }
    },
    toml: {
      parse: function(opts) {
        options.toml.parse = opts;
      },
      build: function(opts) {
        options.toml.build = opts;
      }
    },
    yaml: {
      parse: function(opts) {
        options.yaml.parse = opts;
      },
      build: function(opts) {
        options.yaml.build = opts;
      }
    },
    reset: function() {
      options = clone(defaultOptions);
    }
  },
  parse: function(content, format, inputParseOpts) {
=======
      parse: function (opts) {
        options.cson.parse = opts;
      },
      build: function (opts) {
        options.cson.build = opts;
      },
    },
    json: {
      parse: function (opts) {
        options.json.parse = opts;
      },
      build: function (opts) {
        options.json.build = opts;
      },
    },
    plist: {
      parse: function (opts) {
        options.plist.parse = opts;
      },
      build: function (opts) {
        options.plist.build = opts;
      },
    },
    toml: {
      parse: function (opts) {
        options.toml.parse = opts;
      },
      build: function (opts) {
        options.toml.build = opts;
      },
    },
    yaml: {
      parse: function (opts) {
        options.yaml.parse = opts;
      },
      build: function (opts) {
        options.yaml.build = opts;
      },
    },
    reset: function () {
      options = clone(defaultOptions);
    },
  },
  parse: function (content, format, inputParseOpts) {
>>>>>>> Stashed changes
    var object = {};
    object = parse(content, format, inputParseOpts);
    return object;
  },
<<<<<<< Updated upstream
  cson: function(content, format, parseOpts, buildOpts) {
=======
  cson: function (content, format, parseOpts, buildOpts) {
>>>>>>> Stashed changes
    var object = parse(content, format, parseOpts);
    var cson = build(object, "cson", buildOpts);
    return cson;
  },
<<<<<<< Updated upstream
  json: function(content, format, parseOpts, buildOpts) {
=======
  json: function (content, format, parseOpts, buildOpts) {
>>>>>>> Stashed changes
    var object = parse(content, format, parseOpts);
    var json = build(object, "json", buildOpts);
    return json;
  },
<<<<<<< Updated upstream
  plist: function(content, format, parseOpts, buildOpts) {
=======
  plist: function (content, format, parseOpts, buildOpts) {
>>>>>>> Stashed changes
    var object = parse(content, format, parseOpts);
    var plist = build(object, "plist", buildOpts);
    return plist;
  },
<<<<<<< Updated upstream
  toml: function(content, format, parseOpts, buildOpts) {
=======
  toml: function (content, format, parseOpts, buildOpts) {
>>>>>>> Stashed changes
    var object = parse(content, format, parseOpts);
    var toml = build(object, "toml", buildOpts);
    return toml;
  },
<<<<<<< Updated upstream
  yaml: function(content, format, parseOpts, buildOpts) {
    var object = parse(content, format, parseOpts);
    var yaml = build(object, "yaml", buildOpts);
    return yaml;
  }
=======
  yaml: function (content, format, parseOpts, buildOpts) {
    var object = parse(content, format, parseOpts);
    var yaml = build(object, "yaml", buildOpts);
    return yaml;
  },
>>>>>>> Stashed changes
};

function parse(content, format, parseOpts) {
  var interpretation = determineInterpretation(content, format);
  var object = {};

  if (interpretation === "object") {
    return content;
  } else if (interpretation === "cson") {
    object = csonProcessor.parseCSONString(
      content,
      parseOpts || options.cson.parse
    );
    return object;
  } else if (interpretation === "json") {
    object = jsonProcessor.parse(content, parseOpts || options.json.parse);
    return object;
  } else if (interpretation === "plist") {
    object = plistProcessor.parse(content, parseOpts || options.plist.parse);
    return object;
  } else if (interpretation === "toml") {
    object = tomlProcessor.parse(content, parseOpts || options.toml.parse);
    return object;
  } else if (interpretation === "yaml") {
    object = yamlProcessor.parse(content, parseOpts || options.yaml.parse);
    return object;
  }
}

function build(object, target, buildOpts) {
  if (target === "cson") {
    var cson = csonProcessor.createCSONString(
      object,
      buildOpts || options.cson.build
    );
    return cson;
  } else if (target === "json") {
    var json = jsonProcessor.stringify(object, buildOpts || options.json.build);
    return json;
  } else if (target === "plist") {
    var plist = plistProcessor.build(object, buildOpts || options.plist.build);
    return plist;
  } else if (target === "toml") {
    var toml = tomlProcessor.stringify(object, buildOpts || options.toml.build);
    return toml;
  } else if (target === "yaml") {
    var yaml = yamlProcessor.stringify(object, buildOpts || options.yaml.build);
    return yaml;
  }
}

module.exports = multigrain;
