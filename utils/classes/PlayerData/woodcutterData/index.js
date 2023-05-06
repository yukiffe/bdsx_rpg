"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WoodcutterData = exports.Woods = void 0;
const Level_1 = require("../../Level");
const farmerData_1 = require("../farmerData");
var Woods;
(function (Woods) {
    Woods[Woods["oak"] = 0] = "oak";
    Woods[Woods["birch"] = 1] = "birch";
    Woods[Woods["spruce"] = 2] = "spruce";
    Woods[Woods["jungle"] = 3] = "jungle";
    Woods[Woods["acacia"] = 4] = "acacia";
    Woods[Woods["dark_oak"] = 5] = "dark_oak";
    Woods[Woods["mangrove"] = 6] = "mangrove";
    Woods[Woods["crimson"] = 7] = "crimson";
    Woods[Woods["warped"] = 8] = "warped";
})(Woods = exports.Woods || (exports.Woods = {}));
class WoodcutterData {
    constructor(_map_dayLogging = new Map(), _map_totalLogging = new Map(), date = new Date().getDate(), _quest = new Set(), _achievement = new Set(), _perks = new Set(), _level = new Level_1.DetailLevelData()) {
        this._map_dayLogging = _map_dayLogging;
        this._map_totalLogging = _map_totalLogging;
        this._quest = _quest;
        this._achievement = _achievement;
        this._perks = _perks;
        this._level = _level;
        const validDate = new Date().getDate();
        if (validDate !== date) {
            this._validDate = validDate;
            this._map_dayLogging = new Map();
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
    logging(wood) {
        const day = this._map_totalLogging.get(wood);
        this._map_dayLogging.set(wood, day ? day + 1 : 1);
        const total = this._map_totalLogging.get(wood);
        this._map_totalLogging.set(wood, total ? total + 1 : 1);
    }
}
exports.WoodcutterData = WoodcutterData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBOEM7QUFFOUMsOENBQStDO0FBRy9DLElBQVksS0FVWDtBQVZELFdBQVksS0FBSztJQUNmLCtCQUFHLENBQUE7SUFDSCxtQ0FBSyxDQUFBO0lBQ0wscUNBQU0sQ0FBQTtJQUNOLHFDQUFNLENBQUE7SUFDTixxQ0FBTSxDQUFBO0lBQ04seUNBQVEsQ0FBQTtJQUNSLHlDQUFRLENBQUE7SUFDUix1Q0FBTyxDQUFBO0lBQ1AscUNBQU0sQ0FBQTtBQUNSLENBQUMsRUFWVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFVaEI7QUFFRCxNQUFhLGNBQWM7SUFFekIsWUFDWSxrQkFBc0MsSUFBSSxHQUFHLEVBQWlCLEVBQzlELG9CQUF3QyxJQUFJLEdBQUcsRUFBaUIsRUFDMUUsT0FBZSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUMzQixTQUFzQixJQUFJLEdBQUcsRUFBVSxFQUN2QyxlQUE0QixJQUFJLEdBQUcsRUFBVSxFQUM3QyxTQUFzQixJQUFJLEdBQUcsRUFBVSxFQUN2QyxTQUEwQixJQUFJLHVCQUFlLEVBQUU7UUFON0Msb0JBQWUsR0FBZixlQUFlLENBQStDO1FBQzlELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBK0M7UUFFbEUsV0FBTSxHQUFOLE1BQU0sQ0FBaUM7UUFDdkMsaUJBQVksR0FBWixZQUFZLENBQWlDO1FBQzdDLFdBQU0sR0FBTixNQUFNLENBQWlDO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQXlDO1FBRXZELE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkMsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQWlCLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxPQUFPLENBQUMsUUFBd0IsRUFBRSxHQUFXO1FBQ2xELE9BQU87UUFDUCxRQUFRLFFBQVEsRUFBRTtZQUNoQixLQUFLLDJCQUFjLENBQUMsV0FBVztnQkFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLDJCQUFjLENBQUMsS0FBSztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07WUFDUixLQUFLLDJCQUFjLENBQUMsS0FBSztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7SUFFTSxPQUFPLENBQUMsSUFBVztRQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0Y7QUFuREQsd0NBbURDIn0=