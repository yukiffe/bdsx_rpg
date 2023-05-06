"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerData = exports.ShopDetailPage = exports.CROPS = void 0;
const Level_1 = require("../../Level");
var CROPS;
(function (CROPS) {
    CROPS["wheat_seeds"] = "wheat_seeds";
    CROPS["beetroot_seeds"] = "beetroot_seeds";
    CROPS["melon_seeds"] = "melon_seeds";
    CROPS["pumpkin_seeds"] = "pumpkin_seeds";
    CROPS["torchflower_seeds"] = "torchflower_seeds";
    CROPS["wheat"] = "wheat";
    CROPS["beetroot"] = "beetroot";
    CROPS["melon_block"] = "melon_block";
    CROPS["pumpkin"] = "pumpkin";
    CROPS["torchflower"] = "torchflower";
    CROPS["potato"] = "potato";
    CROPS["poisonous_potato"] = "poisonous_potato";
    CROPS["cocoa_beans"] = "cocoa_beans";
    CROPS["carrot"] = "carrot";
    CROPS["nether_wart"] = "nether_wart";
    CROPS["sweet_berries"] = "sweet_berries";
    CROPS["bamboo"] = "bamboo";
    CROPS["sugar_cane"] = "sugar_cane";
    CROPS["chorus_flower"] = "chorus_flower";
    CROPS["chorus_fruit"] = "chorus_fruit";
    CROPS["vine"] = "vine";
    CROPS["weeping_vines"] = "weeping_vines";
    CROPS["twisting_vines"] = "twisting_vines";
    CROPS["glow_berries"] = "glow_berries";
    CROPS["kelp"] = "kelp";
    CROPS["torchflower_crop"] = "torchflower_crop";
    CROPS["melon_stem"] = "melon_stem";
    CROPS["pumpkin_stem"] = "pumpkin_stem";
    CROPS["cocoa"] = "cocoa";
    CROPS["sweet_berry_bush"] = "sweet_berry_bush";
    CROPS["chorus_plant"] = "chorus_plant";
})(CROPS = exports.CROPS || (exports.CROPS = {})); //나중에 interface로 바꿀수도
var ShopDetailPage;
(function (ShopDetailPage) {
    ShopDetailPage[ShopDetailPage["QUEST"] = 0] = "QUEST";
    ShopDetailPage[ShopDetailPage["ACHIEVEMENT"] = 1] = "ACHIEVEMENT";
    ShopDetailPage[ShopDetailPage["PERKS"] = 2] = "PERKS";
})(ShopDetailPage = exports.ShopDetailPage || (exports.ShopDetailPage = {})); //공용으로 변경
class FarmerData {
    constructor(_map_dayHarvest = new Map(), _map_totalHarvest = new Map(), _date = new Date().getDate(), _quest = new Set(), //2p 클리어 목록, 일정 기간마다 리셋 -> PlayerJoin시 초기화
    _achievement = new Set(), //3p 영구보존1: 일정 조건 달성
    _perks = new Set(), //특전 영구보존2: 특정 이벤트 영구 보존
    _level = new Level_1.DetailLevelData()) {
        this._map_dayHarvest = _map_dayHarvest;
        this._map_totalHarvest = _map_totalHarvest;
        this._date = _date;
        this._quest = _quest;
        this._achievement = _achievement;
        this._perks = _perks;
        this._level = _level;
        const validDate = new Date().getDate();
        if (validDate !== _date) {
            _date = new Date().getDate();
            this._map_dayHarvest = new Map();
        }
    }
    get level() {
        return this._level;
    }
    get quest() {
        return this._quest;
    }
    get achievement() {
        return this._achievement;
    }
    get perks() {
        return this._perks;
    }
    has_achieve(selector, str) {
        switch (selector) {
            case ShopDetailPage.ACHIEVEMENT:
                return this._achievement.has(str);
            case ShopDetailPage.PERKS:
                return this._perks.has(str);
            case ShopDetailPage.QUEST:
                return this._quest.has(str);
        }
    }
    achieve(selector, str) {
        //단순 저장
        switch (selector) {
            case ShopDetailPage.ACHIEVEMENT:
                this._achievement.add(str);
                break;
            case ShopDetailPage.PERKS:
                this._perks.add(str);
                break;
            case ShopDetailPage.QUEST:
                this._quest.add(str);
                break;
        }
    }
    harvest(crop) {
        const day = this._map_dayHarvest.get(crop);
        this._map_dayHarvest.set(crop, day ? day + 1 : 1);
        const total = this._map_totalHarvest.get(crop);
        this._map_totalHarvest.set(crop, total ? total + 1 : 1);
    }
    get_dayHarvest(crop) {
        const day = this._map_dayHarvest.get(crop);
        return day ? day : 0;
    }
}
exports.FarmerData = FarmerData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBOEM7QUFHOUMsSUFBWSxLQWdDWDtBQWhDRCxXQUFZLEtBQUs7SUFDZixvQ0FBMkIsQ0FBQTtJQUMzQiwwQ0FBaUMsQ0FBQTtJQUNqQyxvQ0FBMkIsQ0FBQTtJQUMzQix3Q0FBK0IsQ0FBQTtJQUMvQixnREFBdUMsQ0FBQTtJQUN2Qyx3QkFBZSxDQUFBO0lBQ2YsOEJBQXFCLENBQUE7SUFDckIsb0NBQTJCLENBQUE7SUFDM0IsNEJBQW1CLENBQUE7SUFDbkIsb0NBQTJCLENBQUE7SUFDM0IsMEJBQWlCLENBQUE7SUFDakIsOENBQXFDLENBQUE7SUFDckMsb0NBQTJCLENBQUE7SUFDM0IsMEJBQWlCLENBQUE7SUFDakIsb0NBQTJCLENBQUE7SUFDM0Isd0NBQStCLENBQUE7SUFDL0IsMEJBQWlCLENBQUE7SUFDakIsa0NBQXlCLENBQUE7SUFDekIsd0NBQStCLENBQUE7SUFDL0Isc0NBQTZCLENBQUE7SUFDN0Isc0JBQWEsQ0FBQTtJQUNiLHdDQUErQixDQUFBO0lBQy9CLDBDQUFpQyxDQUFBO0lBQ2pDLHNDQUE2QixDQUFBO0lBQzdCLHNCQUFhLENBQUE7SUFDYiw4Q0FBcUMsQ0FBQTtJQUNyQyxrQ0FBeUIsQ0FBQTtJQUN6QixzQ0FBNkIsQ0FBQTtJQUM3Qix3QkFBZSxDQUFBO0lBQ2YsOENBQXFDLENBQUE7SUFDckMsc0NBQTZCLENBQUE7QUFDL0IsQ0FBQyxFQWhDVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFnQ2hCLENBQUMscUJBQXFCO0FBRXZCLElBQVksY0FJWDtBQUpELFdBQVksY0FBYztJQUN4QixxREFBSyxDQUFBO0lBQ0wsaUVBQVcsQ0FBQTtJQUNYLHFEQUFLLENBQUE7QUFDUCxDQUFDLEVBSlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFJekIsQ0FBQyxTQUFTO0FBRVgsTUFBYSxV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