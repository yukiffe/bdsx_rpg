"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerData = exports.ACTIVE = exports.map_playerData = void 0;
const database_1 = require("../../database");
const path_1 = require("../../path");
const Level_1 = require("../Level");
const hunterData_1 = require("./hunterData");
const fisherData_1 = require("./fisherData");
const stockbreederData_1 = require("./stockbreederData");
const woodcutterData_1 = require("./woodcutterData");
const farmerData_1 = require("./farmerData");
exports.map_playerData = new Map();
var ACTIVE;
(function (ACTIVE) {
    ACTIVE["FARMER"] = "\uB18D\uC0AC";
    ACTIVE["HUNTER"] = "\uC0AC\uB0E5";
    ACTIVE["FISHER"] = "\uB09A\uC2DC";
    ACTIVE["STOCKBREEDER"] = "\uBAA9\uCD95";
    ACTIVE["WOODCUTTER"] = "\uBC8C\uBAA9";
    ACTIVE["MINER"] = "\uCC44\uAD11";
})(ACTIVE = exports.ACTIVE || (exports.ACTIVE = {}));
class PlayerData {
    constructor(_player, _tutorial = 0, _money = 3000, _donate = 0, _banned = false, _lisence = new Set(), //태그정도?
    _farmerData = new farmerData_1.FarmerData(), _hunterData = new hunterData_1.HunterData(), _fisherData = new fisherData_1.FisherData(), _stockbreederData = new stockbreederData_1.StockbreederData(), _woodcutterData = new woodcutterData_1.WoodcutterData(), _level = new Level_1.GeneralLevelData()) {
        this._tutorial = _tutorial;
        this._money = _money;
        this._donate = _donate;
        this._banned = _banned;
        this._lisence = _lisence;
        this._farmerData = _farmerData;
        this._hunterData = _hunterData;
        this._fisherData = _fisherData;
        this._stockbreederData = _stockbreederData;
        this._woodcutterData = _woodcutterData;
        this._level = _level;
        this._file_name = `${_player.getName()}_${_player.getXuid()}.json`;
        this._name = _player.getName();
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
    set money(money) {
        this._money = money;
    }
    set tutorial(tutorial) {
        this._tutorial = tutorial;
    }
    save() {
        database_1.database.upload(path_1.path.DATABASE_PLAYER, this._file_name, this);
    }
    add_experience(player, active, experience) {
        const ratio_experience = this.__add_experience(active, experience);
        player.setBossBar(`§l§g${active} §f경험치`, ratio_experience);
    }
    __add_experience(active, experience) {
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
exports.PlayerData = PlayerData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSw2Q0FBMEM7QUFDMUMscUNBQWtDO0FBRWxDLG9DQUE0QztBQUM1Qyw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBQzFDLHlEQUFzRDtBQUN0RCxxREFBa0Q7QUFDbEQsNkNBQTBDO0FBRTdCLFFBQUEsY0FBYyxHQUFHLElBQUksR0FBRyxFQUFzQixDQUFDO0FBRTVELElBQVksTUFPWDtBQVBELFdBQVksTUFBTTtJQUNoQixpQ0FBYSxDQUFBO0lBQ2IsaUNBQWEsQ0FBQTtJQUNiLGlDQUFhLENBQUE7SUFDYix1Q0FBbUIsQ0FBQTtJQUNuQixxQ0FBaUIsQ0FBQTtJQUNqQixnQ0FBWSxDQUFBO0FBQ2QsQ0FBQyxFQVBXLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQU9qQjtBQUVELE1BQWEsVUFBVTtJQUdyQixZQUNFLE9BQTRCLEVBQ3BCLFlBQW9CLENBQUMsRUFDckIsU0FBaUIsSUFBSSxFQUNyQixVQUFrQixDQUFDLEVBQ25CLFVBQW1CLEtBQUssRUFDeEIsV0FBd0IsSUFBSSxHQUFHLEVBQVUsRUFBRSxPQUFPO0lBQ2xELGNBQTBCLElBQUksdUJBQVUsRUFBRSxFQUMxQyxjQUEwQixJQUFJLHVCQUFVLEVBQUUsRUFDMUMsY0FBMEIsSUFBSSx1QkFBVSxFQUFFLEVBQzFDLG9CQUFzQyxJQUFJLG1DQUFnQixFQUFFLEVBQzVELGtCQUFrQyxJQUFJLCtCQUFjLEVBQUUsRUFDdEQsU0FBMkIsSUFBSSx3QkFBZ0IsRUFBRTtRQVZqRCxjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFpQztRQUN6QyxnQkFBVyxHQUFYLFdBQVcsQ0FBK0I7UUFDMUMsZ0JBQVcs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