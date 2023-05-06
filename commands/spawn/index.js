"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = exports.Spawn = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/command");
const command_2 = require("bdsx/bds/command");
const nativetype_1 = require("bdsx/nativetype");
const database_1 = require("../../utils/database");
const path_1 = require("../../utils/path");
class Spawn {
    constructor() {
        if (!database_1.database.exist_file(path_1.path.PLUGIN_UTILS_DATABASE, `spawn.json`)) {
            const spawn = [blockpos_1.Vec3.create(0, 0, 0), 0, blockpos_1.Vec3.create(0, 0, 0), "spawn", 0];
            database_1.database.upload(path_1.path.PLUGIN_UTILS_DATABASE, `spawn.json`, spawn);
        }
        const json = database_1.database.load(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json");
        this._pos = blockpos_1.Vec3.create(json._pos.x, json._pos.y, json._pos.z);
        this._dimension_id = json._dimension_id;
        this._face_position = blockpos_1.Vec3.create(json._face_position.x, json._face_position.y, json._face_position.z);
        this._message = json._message;
        this._delay = json._delay;
    }
    set pos(pos) {
        this._pos = pos;
    }
    get pos() {
        return this._pos;
    }
    set dimension_id(dimension_id) {
        this._dimension_id = dimension_id;
    }
    set face_position(face_position) {
        this._face_position = face_position;
    }
    set message(message) {
        this._message = message;
    }
    set delay(delay) {
        this._delay = delay;
    }
    teleport(player) {
        player.sendMessage(`§a${Math.ceil(this._delay / 1000)}초 뒤 스폰으로 이동됩니다.`);
        setTimeout(() => {
            player.teleport(this._pos, this._dimension_id, this._face_position);
        }, this._delay);
    }
}
exports.Spawn = Spawn;
exports.spawn = new Spawn();
const spawn_command = command_1.command.register("setspawn", "관리자 전용 명령어", command_2.CommandPermissionLevel.Operator);
spawn_command.overload((param, origin, output) => {
    const actor = origin.getEntity().getNetworkIdentifier().getActor();
    switch (param.set) {
        case undefined:
            exports.spawn.pos = actor.getFeetPos().ceil();
            exports.spawn.dimension_id = actor.getDimensionId();
            const vec2 = actor.getRotation();
            exports.spawn.face_position = blockpos_1.Vec3.create(exports.spawn.pos.x + -Math.sin((Math.PI * vec2.y) / 180), exports.spawn.pos.y, exports.spawn.pos.z + Math.cos((Math.PI * vec2.y) / 180));
            actor.sendMessage(`§c스폰 위치 변경 완료`);
            break;
        case "message":
            exports.spawn.message = param.option;
            actor.sendMessage(`§l§c메세지 변경 완료`);
            break;
        case "delay":
            exports.spawn.delay = +param.option;
            actor.sendMessage(`§l§c딜레이 시간 변경 완료`);
            break;
    }
    database_1.database.upload(path_1.path.PLUGIN_UTILS_DATABASE, "spawn.json", exports.spawn);
}, {
    set: [command_1.command.enum("option.set", "message", "delay"), true],
    option: nativetype_1.CxxString,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBbUQ7QUFHbkQsMENBQXVDO0FBQ3ZDLDhDQUEyRTtBQUMzRSxnREFBcUQ7QUFFckQsbURBQWdEO0FBQ2hELDJDQUF3QztBQUd4QyxNQUFhLEtBQUs7SUFNaEI7UUFDRSxJQUFJLENBQUMsbUJBQVEsQ0FBQyxVQUFVLENBQUMsV0FBSSxDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxFQUFFO1lBQ2xFLE1BQU0sS0FBSyxHQUFHLENBQUMsZUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxlQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFFLG1CQUFRLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbEU7UUFDRCxNQUFNLElBQUksR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFJLENBQUMscUJBQXFCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxlQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMs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