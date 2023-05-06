"use strict";
exports.__esModule = true;
exports.spawn = exports.Spawn = void 0;
var blockpos_1 = require("bdsx/bds/blockpos");
var database_1 = require("../../utils/database");
var path_1 = require("../../utils/path");
var actor_1 = require("bdsx/bds/actor");
var command_1 = require("bdsx/command");
var command_2 = require("bdsx/bds/command");
var nativetype_1 = require("bdsx/nativetype");
var manage_1 = require("../../utils/funcs/manage");
var Spawn = /** @class */ (function () {
    function Spawn() {
        if (!database_1.database.exist_file(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json")) {
            var spawn_1 = [blockpos_1.Vec3.create(0, 0, 0), 0, blockpos_1.Vec3.create(0, 0, 0), "spawn", 0];
            database_1.database.upload(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json", spawn_1);
        }
        var json = database_1.database.load(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json");
        this._pos = blockpos_1.Vec3.create(json._pos.x, json._pos.y, json._pos.z);
        this._dimension_id = json._dimension_id;
        this._face_position = blockpos_1.Vec3.create(json._face_position.x, json._face_position.y, json._face_position.z);
        this._message = json._message;
        this._delay = json._delay;
    }
    Object.defineProperty(Spawn.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (pos) {
            this._pos = pos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spawn.prototype, "dimension_id", {
        set: function (dimension_id) {
            this._dimension_id = dimension_id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spawn.prototype, "face_position", {
        set: function (face_position) {
            this._face_position = face_position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spawn.prototype, "message", {
        set: function (message) {
            this._message = message;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spawn.prototype, "delay", {
        set: function (delay) {
            this._delay = delay;
        },
        enumerable: false,
        configurable: true
    });
    Spawn.prototype.teleport = function (ni) {
        var _this = this;
        var actor = ni.getActor();
        if (actor === null)
            return;
        setTimeout(function () {
            actor.teleport(_this._pos, _this._dimension_id, _this._face_position);
            actor.sendMessage("\u00A7l\u00A7f" + _this._message);
        }, this._delay);
    };
    return Spawn;
}());
exports.Spawn = Spawn;
exports.spawn = new Spawn();
var spawn_command = command_1.command.register("spawn", "관리자 전용 명령어", command_2.CommandPermissionLevel.Operator);
spawn_command.overload(function (param, origin, output) {
    var actor = origin.getEntity().getNetworkIdentifier().getActor();
    if (param.position) {
        exports.spawn.pos = manage_1.vec3_floor(blockpos_1.Vec3.create(param.position));
    }
    else {
        exports.spawn.pos = manage_1.vec3_floor(actor.getPosition());
        exports.spawn.dimension_id = actor.getDimensionId();
        var vec2 = manage_1.vec2_floor(actor.getRotation());
        var sin = -Math.sin((Math.PI * vec2.y) / 180); // -1 ~ 1
        var cos = Math.cos((Math.PI * vec2.y) / 180); // -1 ~ 1
        exports.spawn.face_position = blockpos_1.Vec3.create(exports.spawn.pos.x + sin, exports.spawn.pos.y, exports.spawn.pos.z + cos);
    }
    database_1.database.upload(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json", exports.spawn);
    actor.sendMessage("\u00A7l\u00A7c\uC2A4\uD3F0 \uC704\uCE58 \uBCC0\uACBD \uC644\uB8CC");
}, {
    set: command_1.command["enum"]("option.set", "set"),
    type: command_1.command["enum"]("option.pos", "pos"),
    position: [command_2.CommandPosition, true]
});
spawn_command.overload(function (param, origin, output) {
    var actor = origin.getEntity().getNetworkIdentifier().getActor();
    exports.spawn.dimension_id = param.dimension;
    database_1.database.upload(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json", exports.spawn);
    actor.sendMessage("\u00A7l\u00A7c\uC6D4\uB4DC \uBCC0\uACBD \uC644\uB8CC");
}, {
    set: command_1.command["enum"]("option.set", "set"),
    type: command_1.command["enum"]("option.dimension", "dimensionId"),
    dimension: command_1.command["enum"]("option.world", actor_1.DimensionId)
});
spawn_command.overload(function (param, origin, output) {
    var actor = origin.getEntity().getNetworkIdentifier().getActor();
    var vec2 = manage_1.vec2_floor(actor.getRotation());
    var sin = -Math.sin((Math.PI * vec2.y) / 180); // -1 ~ 1
    var cos = Math.cos((Math.PI * vec2.y) / 180); // -1 ~ 1
    exports.spawn.face_position = blockpos_1.Vec3.create(exports.spawn.pos.x + sin, exports.spawn.pos.y, exports.spawn.pos.z + cos);
    actor.sendMessage(vec2.x + " " + vec2.y);
    actor.sendMessage(sin + " " + cos);
    database_1.database.upload(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json", exports.spawn);
    actor.sendMessage("\u00A7l\u00A7c\uC2A4\uD3F0 \uC2DC\uAC01 \uBCC0\uACBD \uC644\uB8CC");
}, {
    set: command_1.command["enum"]("option.set", "set"),
    type: command_1.command["enum"]("option.facePosition", "facePosition")
});
spawn_command.overload(function (param, origin, output) {
    var actor = origin.getEntity().getNetworkIdentifier().getActor();
    exports.spawn.message = param.message.toString();
    database_1.database.upload(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json", exports.spawn);
    actor.sendMessage("\u00A7l\u00A7c\uBA54\uC138\uC9C0 \uBCC0\uACBD \uC644\uB8CC");
}, {
    set: command_1.command["enum"]("option.set", "set"),
    type: command_1.command["enum"]("option.message", "message"),
    message: nativetype_1.CxxString
});
spawn_command.overload(function (param, origin, output) {
    var actor = origin.getEntity().getNetworkIdentifier().getActor();
    exports.spawn.delay = param.delay;
    database_1.database.upload(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json", exports.spawn);
    actor.sendMessage("\u00A7l\u00A7c\uB51C\uB808\uC774 \uC2DC\uAC04 \uBCC0\uACBD \uC644\uB8CC");
}, {
    set: command_1.command["enum"]("option.set", "set"),
    type: command_1.command["enum"]("option.delay", "delay"),
    delay: nativetype_1.int32_t
});
