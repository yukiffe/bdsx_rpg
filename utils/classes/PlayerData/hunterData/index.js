"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HunterData = exports.Entities = void 0;
const Level_1 = require("../../Level");
const farmerData_1 = require("../farmerData");
var Entities;
(function (Entities) {
    Entities[Entities["zombie"] = 0] = "zombie";
    Entities[Entities["skeleton"] = 1] = "skeleton";
    Entities[Entities["slime"] = 2] = "slime";
    Entities[Entities["guardian"] = 3] = "guardian";
    Entities[Entities["pillager"] = 4] = "pillager";
    Entities[Entities["creeper"] = 5] = "creeper";
    Entities[Entities["ghast"] = 6] = "ghast";
    Entities[Entities["phantom"] = 7] = "phantom";
    Entities[Entities["piglin"] = 8] = "piglin";
    Entities[Entities["warden"] = 9] = "warden";
})(Entities = exports.Entities || (exports.Entities = {}));
class HunterData {
    constructor(_map_dayHunting = new Map(), _map_totalHunting = new Map(), date = new Date().getDate(), _quest = new Set(), _achievement = new Set(), _perks = new Set(), _level = new Level_1.DetailLevelData()) {
        this._map_dayHunting = _map_dayHunting;
        this._map_totalHunting = _map_totalHunting;
        this._quest = _quest;
        this._achievement = _achievement;
        this._perks = _perks;
        this._level = _level;
        const validDate = new Date().getDate();
        if (validDate !== date) {
            this._validDate = validDate;
            this._map_dayHunting = new Map();
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
    achieve(selector, str) {
        //단순 저장
        switch (selector) {
            case farmerData_1.ShopDetailPage.ACHIEVEMENT:
                this._achievement.add(str);
                break;
            case farmerData_1.ShopDetailPage.PERKS:
                this._perks.add(str);
                break;
            case farmerData_1.ShopDetailPage.QUEST:
                this._quest.add(str);
                break;
        }
    }
    hunting(entity) {
        const day = this._map_totalHunting.get(entity);
        this._map_dayHunting.set(entity, day ? day + 1 : 1);
        const total = this._map_totalHunting.get(entity);
        this._map_totalHunting.set(entity, total ? total + 1 : 1);
    }
}
exports.HunterData = HunterData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBOEM7QUFFOUMsOENBQStDO0FBRy9DLElBQVksUUFXWDtBQVhELFdBQVksUUFBUTtJQUNsQiwyQ0FBTSxDQUFBO0lBQ04sK0NBQVEsQ0FBQTtJQUNSLHlDQUFLLENBQUE7SUFDTCwrQ0FBUSxDQUFBO0lBQ1IsK0NBQVEsQ0FBQTtJQUNSLDZDQUFPLENBQUE7SUFDUCx5Q0FBSyxDQUFBO0lBQ0wsNkNBQU8sQ0FBQTtJQUNQLDJDQUFNLENBQUE7SUFDTiwyQ0FBTSxDQUFBO0FBQ1IsQ0FBQyxFQVhXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBV25CO0FBRUQsTUFBYSxVQUFVO0lBRXJCLFlBQ1ksa0JBQXlDLElBQUksR0FBRyxFQUFvQixFQUNwRSxvQkFBMkMsSUFBSSxHQUFHLEVBQW9CLEVBQ2hGLE9BQWUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFDM0IsU0FBc0IsSUFBSSxHQUFHLEVBQVUsRUFDdkMsZUFBNEIsSUFBSSxHQUFHLEVBQVUsRUFDN0MsU0FBc0IsSUFBSSxHQUFHLEVBQVUsRUFDdkMsU0FBMEIsSUFBSSx1QkFBZSxFQUFFO1FBTjdDLG9CQUFlLEdBQWYsZUFBZSxDQUFxRDtRQUNwRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXFEO1FBRXhFLFdBQU0sR0FBTixNQUFNLENBQWlDO1FBQ3ZDLGlCQUFZLEdBQVosWUFBWSxDQUFpQztRQUM3QyxXQUFNLEdBQU4sTUFBTSxDQUFpQztRQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUF5QztRQUV2RCxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sT0FBTyxDQUFDLFFBQXdCLEVBQUUsR0FBVztRQUNsRCxPQUFPO1FBQ1AsUUFBUSxRQUFRLEVBQUU7WUFDaEIsS0FBSywyQkFBYyxDQUFDLFdBQVc7Z0JBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixNQUFNO1lBQ1IsS0FBSywyQkFBYyxDQUFDLEtBQUs7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixNQUFNO1lBQ1IsS0FBSywyQkFBYyxDQUFDLEtBQUs7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWdCO1FBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDRjtBQW5ERCxnQ0FtREMifQ==