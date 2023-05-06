"use strict";
exports.__esModule = true;
exports.Level = void 0;
var map_general_level = new Map();
var database_1 = require("./../database");
var path_1 = require("./../path");
var Level = /** @class */ (function () {
    function Level(_level, _experience, _sum_experience) {
        if (_level === void 0) { _level = 0; }
        if (_experience === void 0) { _experience = 0; }
        if (_sum_experience === void 0) { _sum_experience = 0; }
        this._level = _level;
        this._experience = _experience;
        this._sum_experience = _sum_experience;
    }
    Object.defineProperty(Level.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "experience", {
        get: function () {
            return this._experience;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "sum_experience", {
        get: function () {
            return this._sum_experience;
        },
        enumerable: false,
        configurable: true
    });
    Level.prototype.add_experience = function (experience) { };
    return Level;
}());
exports.Level = Level;
var json = database_1.database.load(path_1.path.PLUGIN_UTILS_DATABASE, "general_level.json");
for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
    var token = json_1[_i];
    console.log(token);
    var level = new Level(token.Level, token.experience, token.sum_experience);
    map_general_level.set(token.level, level);
}
