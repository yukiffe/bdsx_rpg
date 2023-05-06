"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockbreederData = exports.Livestock = void 0;
const Level_1 = require("../../Level");
const farmerData_1 = require("../farmerData");
var Livestock;
(function (Livestock) {
    Livestock[Livestock["pig"] = 0] = "pig";
    Livestock[Livestock["sheep"] = 1] = "sheep";
    Livestock[Livestock["cow"] = 2] = "cow";
    Livestock[Livestock["mooshroom"] = 3] = "mooshroom";
    Livestock[Livestock["chicken"] = 4] = "chicken";
    Livestock[Livestock["ocelot"] = 5] = "ocelot";
    Livestock[Livestock["cat"] = 6] = "cat";
    Livestock[Livestock["rabbit"] = 7] = "rabbit";
    Livestock[Livestock["turtle"] = 8] = "turtle";
    Livestock[Livestock["fox"] = 9] = "fox";
    Livestock[Livestock["strider"] = 10] = "strider";
    Livestock[Livestock["axolotle"] = 11] = "axolotle";
    Livestock[Livestock["frog"] = 12] = "frog";
    Livestock[Livestock["tadpole"] = 13] = "tadpole";
    Livestock[Livestock["allay"] = 14] = "allay";
})(Livestock = exports.Livestock || (exports.Livestock = {}));
class StockbreederData {
    constructor(_map_dayStockbreeder = new Map(), _map_totalStockbreeder = new Map(), date = new Date().getDate(), _quest = new Set(), _achievement = new Set(), _perks = new Set(), _level = new Level_1.DetailLevelData()) {
        this._map_dayStockbreeder = _map_dayStockbreeder;
        this._map_totalStockbreeder = _map_totalStockbreeder;
        this._quest = _quest;
        this._achievement = _achievement;
        this._perks = _perks;
        this._level = _level;
        const validDate = new Date().getDate();
        if (validDate !== date) {
            this._validDate = validDate;
            this._map_dayStockbreeder = new Map();
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
    breeding(stock) {
        const day = this._map_totalStockbreeder.get(stock);
        this._map_dayStockbreeder.set(stock, day ? day + 1 : 1);
        const total = this._map_totalStockbreeder.get(stock);
        this._map_totalStockbreeder.set(stock, total ? total + 1 : 1);
    }
}
exports.StockbreederData = StockbreederData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBOEM7QUFFOUMsOENBQStDO0FBRy9DLElBQVksU0FnQlg7QUFoQkQsV0FBWSxTQUFTO0lBQ25CLHVDQUFHLENBQUE7SUFDSCwyQ0FBSyxDQUFBO0lBQ0wsdUNBQUcsQ0FBQTtJQUNILG1EQUFTLENBQUE7SUFDVCwrQ0FBTyxDQUFBO0lBQ1AsNkNBQU0sQ0FBQTtJQUNOLHVDQUFHLENBQUE7SUFDSCw2Q0FBTSxDQUFBO0lBQ04sNkNBQU0sQ0FBQTtJQUNOLHVDQUFHLENBQUE7SUFDSCxnREFBTyxDQUFBO0lBQ1Asa0RBQVEsQ0FBQTtJQUNSLDBDQUFJLENBQUE7SUFDSixnREFBTyxDQUFBO0lBQ1AsNENBQUssQ0FBQTtBQUNQLENBQUMsRUFoQlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFnQnBCO0FBRUQsTUFBYSxnQkFBZ0I7SUFFM0IsWUFDWSx1QkFBK0MsSUFBSSxHQUFHLEVBQXFCLEVBQzNFLHlCQUFpRCxJQUFJLEdBQUcsRUFBcUIsRUFDdkYsT0FBZSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUMzQixTQUFzQixJQUFJLEdBQUcsRUFBVSxFQUN2QyxlQUE0QixJQUFJLEdBQUcsRUFBVSxFQUM3QyxTQUFzQixJQUFJLEdBQUcsRUFBVSxFQUN2QyxTQUEwQixJQUFJLHVCQUFlLEVBQUU7UUFON0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1RDtRQUMzRSwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVEO1FBRS9FLFdBQU0sR0FBTixNQUFNLENBQWlDO1FBQ3ZDLGlCQUFZLEdBQVosWUFBWSxDQUFpQztRQUM3QyxXQUFNLEdBQU4sTUFBTSxDQUFpQztRQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUF5QztRQUV2RCxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxHQUFHLEVBQXFCLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxPQUFPLENBQUMsUUFBd0IsRUFBRSxHQUFXO1FBQ2xELE9BQU87UUFDUCxRQUFRLFFBQVEsRUFBRTtZQUNoQixLQUFLLDJCQUFjLENBQUMsV0FBVztnQkFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLDJCQUFjLENBQUMsS0FBSztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07WUFDUixLQUFLLDJCQUFjLENBQUMsS0FBSztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtJQUNILENBQUM7SUFFTSxRQUFRLENBQUMsS0FBZ0I7UUFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0Y7QUFuREQsNENBbURDIn0=