import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { DimensionId } from "bdsx/bds/actor";
import { command } from "bdsx/command";
import { CommandPermissionLevel, CommandPosition } from "bdsx/bds/command";
import { CxxString, int32_t } from "bdsx/nativetype";
import { events } from "bdsx/event";
import { database } from "../../utils/database";
import { path } from "../../utils/path";
import { ServerPlayer } from "bdsx/bds/player";

/**
 * Operator -> setspawn
 * 유저 spawn
 * pos+viewPos
 */

export class Spawn {
  private _pos: Vec3;
  private _dimension_id: DimensionId;
  private _face_position: Vec3;
  private _message: string;
  private _delay: number;
  constructor() {
    if (!database.exist_file(path.PLUGIN_UTILS_DATABASE, `spawn.json`)) {
      const spawn = [Vec3.create(0, 0, 0), 0, Vec3.create(0, 0, 0), "spawn", 0];
      database.upload(path.PLUGIN_UTILS_DATABASE, `spawn.json`, spawn);
    }
    const json = database.load(path.PLUGIN_UTILS_DATABASE, "spawn.json");
    this._pos = Vec3.create(json._pos.x, json._pos.y, json._pos.z);
    this._dimension_id = json._dimension_id;
    this._face_position = Vec3.create(json._face_position.x, json._face_position.y, json._face_position.z);
    this._message = json._message;
    this._delay = json._delay;
  }
  set pos(pos: Vec3) {
    this._pos = pos;
  }
  get pos() {
    return this._pos;
  }
  set dimension_id(dimension_id: DimensionId) {
    this._dimension_id = dimension_id;
  }
  set face_position(face_position: Vec3) {
    this._face_position = face_position;
  }
  set message(message: string) {
    this._message = message;
  }
  set delay(delay: number) {
    this._delay = delay;
  }
  public teleport(player: ServerPlayer) {
    player.sendMessage(`§a${Math.ceil(this._delay / 1000)}초 뒤 스폰으로 이동됩니다.`);
    setTimeout(() => {
      player.teleport(this._pos, this._dimension_id, this._face_position);
    }, this._delay);
  }
}

export const spawn = new Spawn();

const spawn_command = command.register("setspawn", "관리자 전용 명령어", CommandPermissionLevel.Operator);
spawn_command.overload(
  (param, origin, output) => {
    const actor = origin.getEntity()!.getNetworkIdentifier().getActor()!;
    switch (param.set) {
      case undefined:
        spawn.pos = actor.getFeetPos().ceil();
        spawn.dimension_id = actor.getDimensionId();
        const vec2 = actor.getRotation();
        spawn.face_position = Vec3.create(spawn.pos.x + -Math.sin((Math.PI * vec2.y) / 180), spawn.pos.y, spawn.pos.z + Math.cos((Math.PI * vec2.y) / 180));
        actor.sendMessage(`§c스폰 위치 변경 완료`);
        break;
      case "message":
        spawn.message = param.option;
        actor.sendMessage(`§l§c메세지 변경 완료`);
        break;
      case "delay":
        spawn.delay = +param.option;
        actor.sendMessage(`§l§c딜레이 시간 변경 완료`);
        break;
    }
    database.upload(path.PLUGIN_UTILS_DATABASE, "spawn.json", spawn);
  },
  {
    set: [command.enum("option.set", "message", "delay"), true],
    option: CxxString,
  }
);
