import { Player, ServerPlayer } from "bdsx/bds/player";
import { DimensionId } from "bdsx/bds/actor";
import { BlockPos } from "bdsx/bds/blockpos";
import { Block, BlockSource } from "bdsx/bds/block";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { database } from "../../database";
import { path } from "../../path";
import { BossEventPacket } from "bdsx/bds/packets";
import { GeneralLevelData } from "../Level";
import { HunterData } from "./hunterData";
import { FisherData } from "./fisherData";
import { StockbreederData } from "./stockbreederData";
import { WoodcutterData } from "./woodcutterData";
import { FarmerData } from "./farmerData";

export const map_playerData = new Map<string, PlayerData>();

export enum ACTIVE {
  FARMER = "농사",
  HUNTER = "사냥",
  FISHER = "낚시",
  STOCKBREEDER = "목축",
  WOODCUTTER = "벌목",
  MINER = "채광",
}

export class PlayerData {
  private _file_name: string;
  private _name: string;
  constructor(
    _player: ServerPlayer | null,
    private _tutorial: number = 0,
    private _money: number = 3000,
    private _donate: number = 0,
    private _banned: boolean = false,
    private _lisence: Set<string> = new Set<string>(), //태그정도?
    private _farmerData: FarmerData = new FarmerData(),
    private _hunterData: HunterData = new HunterData(),
    private _fisherData: FisherData = new FisherData(),
    private _stockbreederData: StockbreederData = new StockbreederData(),
    private _woodcutterData: WoodcutterData = new WoodcutterData(),
    private _level: GeneralLevelData = new GeneralLevelData()
  ) {
    this._file_name = `${_player!.getName()}_${_player!.getXuid()}.json`;
    this._name = _player!.getName();
  }
  get name() {
    return this._name;
  }
  get file_name() {
    return this._file_name;
  }
  get money() {
    return this._money;
  }
  get farmerData() {
    return this._farmerData;
  }
  get hunterData() {
    return this._hunterData;
  }
  get fisherData() {
    return this._fisherData;
  }
  get stockbreederData() {
    return this._stockbreederData;
  }
  get woodcutterData() {
    return this._woodcutterData;
  }
  get level() {
    return this._level;
  }
  get tutorial() {
    return this._tutorial;
  }

  set money(money: number) {
    this._money = money;
  }
  set tutorial(tutorial) {
    this._tutorial = tutorial;
  }

  public save() {
    database.upload(path.DATABASE_PLAYER, this._file_name, this);
  }
  public add_experience(player: ServerPlayer, active: ACTIVE, experience: number) {
    const ratio_experience = this.__add_experience(active, experience);
    player.setBossBar(`§l§g${active} §f경험치`, ratio_experience);
  }
  private __add_experience(active: ACTIVE, experience: number): number {
    this._level.add_experience(experience);
    switch (active) {
      case ACTIVE.FARMER:
        return this._farmerData.level.add_experience(experience);
      case ACTIVE.FISHER:
        return this._fisherData.level.add_experience(experience);
      case ACTIVE.HUNTER:
        return this._hunterData.level.add_experience(experience);
      case ACTIVE.STOCKBREEDER:
        return this._stockbreederData.level.add_experience(experience);
      case ACTIVE.WOODCUTTER:
        return this._woodcutterData.level.add_experience(experience);
    }
    return -1;
  }
}
