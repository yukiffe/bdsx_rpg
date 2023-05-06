"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map_detailLevel = exports.DetailLevelData = exports.map_generalLevel = exports.GeneralLevelData = void 0;
const database_1 = require("../../database");
const path_1 = require("../../path");
class GeneralLevelData {
    constructor(_level = 0, _experience = 0, _sum_experience = 0, update = true) {
        this._level = _level;
        this._experience = _experience;
        this._sum_experience = _sum_experience;
        if (update)
            this.update_experience();
    }
    get level() {
        return this._level;
    }
    add_experience(experience) {
        this._experience += experience;
        this._sum_experience += experience;
        this.add_level();
    }
    add_level() {
        if (this._goal_sumExperience <= this._sum_experience) {
            this._experience -= this._request_experience;
            this._level++;
            this.update_experience();
        }
    }
    update_experience() {
        const levelData = exports.map_generalLevel.get(this._level + 1);
        this._goal_sumExperience = levelData._sum_experience;
        this._request_experience = levelData._experience;
    }
}
exports.GeneralLevelData = GeneralLevelData;
exports.map_generalLevel = new Map();
{
    const json = database_1.database.load(path_1.path.PLUGIN_UTILS_DATABASE, `general_level.json`);
    for (const token of json) {
        const level = new GeneralLevelData(token.level, token.experience, token.sum_experience, false);
        exports.map_generalLevel.set(token.level, level);
    }
}
class DetailLevelData {
    constructor(_level = 0, _experience = 0, _sum_experience = 0, update = true) {
        this._level = _level;
        this._experience = _experience;
        this._sum_experience = _sum_experience;
        if (update)
            this.update_experience();
    }
    get level() {
        return this._level;
    }
    add_experience(experience) {
        this._experience += experience;
        this._sum_experience += experience;
        this.add_level();
        return this._experience / this._request_experience; //출력사항
    }
    add_level() {
        while (this._goal_sumExperience <= this._sum_experience) {
            this._experience -= this._request_experience;
            this._level++;
            this.update_experience();
        }
    }
    update_experience() {
        const levelData = exports.map_detailLevel.get(this._level + 1);
        this._goal_sumExperience = levelData._sum_experience;
        this._request_experience = levelData._experience;
    }
}
exports.DetailLevelData = DetailLevelData;
exports.map_detailLevel = new Map();
{
    const json = database_1.database.load(path_1.path.PLUGIN_UTILS_DATABASE, `detail_level.json`);
    for (const token of json) {
        const level = new DetailLevelData(token.level, token.experience, token.sum_experience, false);
        exports.map_detailLevel.set(token.level, level);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBMEM7QUFDMUMscUNBQWtDO0FBRWxDLE1BQWEsZ0JBQWdCO0lBRzNCLFlBQXNCLFNBQWlCLENBQUMsRUFBWSxjQUFzQixDQUFDLEVBQVksa0JBQTBCLENBQUMsRUFBRSxTQUFrQixJQUFJO1FBQXBILFdBQU0sR0FBTixNQUFNLENBQVk7UUFBWSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFZLG9CQUFlLEdBQWYsZUFBZSxDQUFZO1FBQ2hILElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNNLGNBQWMsQ0FBQyxVQUFrQjtRQUN0QyxJQUFJLENBQUMsV0FBVyxJQUFJLFVBQVUsQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxJQUFJLFVBQVUsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNTLFNBQVM7UUFDakIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNwRCxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFDUyxpQkFBaUI7UUFDekIsTUFBTSxTQUFTLEdBQUcsd0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUM7UUFDckQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMs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