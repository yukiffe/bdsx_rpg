"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FisherData = exports.Fish = void 0;
const Level_1 = require("../../Level");
const farmerData_1 = require("../farmerData");
var Fish;
(function (Fish) {
    Fish[Fish["cod"] = 0] = "cod";
    Fish[Fish["salmon"] = 1] = "salmon";
    Fish[Fish["puffer_fish"] = 2] = "puffer_fish";
    Fish[Fish["tropical_fish"] = 3] = "tropical_fish";
})(Fish = exports.Fish || (exports.Fish = {}));
class FisherData {
    constructor(_map_dayFishing = new Map(), _map_totalFishing = new Map(), date = new Date().getDate(), _quest = new Set(), _achievement = new Set(), _perks = new Set(), _level = new Level_1.DetailLevelData()) {
        this._map_dayFishing = _map_dayFishing;
        this._map_totalFishing = _map_totalFishing;
        this._quest = _quest;
        this._achievement = _achievement;
        this._perks = _perks;
        this._level = _level;
        const validDate = new Date().getDate();
        if (validDate !== date) {
            this._validDate = validDate;
            this._map_dayFishing = new Map();
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
    fishing(fish) {
        const day = this._map_totalFishing.get(fish);
        this._map_dayFishing.set(fish, day ? day + 1 : 1);
        const total = this._map_totalFishing.get(fish);
        this._map_totalFishing.set(fish, total ? total + 1 : 1);
    }
}
exports.FisherData = FisherData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBOEM7QUFFOUMsOENBQStDO0FBRy9DLElBQVksSUFLWDtBQUxELFdBQVksSUFBSTtJQUNkLDZCQUFHLENBQUE7SUFDSCxtQ0FBTSxDQUFBO0lBQ04sNkNBQVcsQ0FBQTtJQUNYLGlEQUFhLENBQUE7QUFDZixDQUFDLEVBTFcsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBS2Y7QUFFRCxNQUFhLFVBQVU7SUFFckIsWUFDWSxrQkFBcUMsSUFBSSxHQUFHLEVBQWdCLEVBQzVELG9CQUF1QyxJQUFJLEdBQUcsRUFBZ0IsRUFDeEUsT0FBZSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUMzQixTQUFzQixJQUFJLEdBQUcsRUFBVSxFQUN2QyxlQUE0QixJQUFJLEdBQUcsRUFBVSxFQUM3QyxTQUFzQixJQUFJLEdBQUcsRUFBVSxFQUN2QyxTQUEwQixJQUFJLHVCQUFlLEVBQUU7UUFON0Msb0JBQWUsR0FBZixlQUFlLENBQTZDO1FBQzVELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBNkM7UUFFaEUsV0FBTSxHQUFOLE1BQU0sQ0FBaUM7UUFDdkMsaUJBQVksR0FBWixZQUFZLENBQWlDO1FBQzdDLFdBQU0sR0FBTixNQUFNLENBQWlDO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQXlDO1FBRXZELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxPQUFPLENBQUMsUUFBd0IsRUFBRSxHQUFXO1FBQ2xELE9BQU87UUFDUCxRQUFRLFFBQVEsRUFBRTtZQUNoQixLQUFLLDJCQUFjLENBQUMsV0FBVztnQkFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLDJCQUFjLENBQUMsS0FBSztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07WUFDUixLQUFLLDJCQUFjLENBQUMsS0FBSztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsSUFBVTtRQUN2QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0Y7QUFuREQsZ0NBbURDIn0=