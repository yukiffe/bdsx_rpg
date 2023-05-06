"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gambling = exports.Gambling = void 0;
const PlayerData_1 = require("../../utils/classes/PlayerData");
class Gambling {
    money(player) {
        const playerData = PlayerData_1.map_playerData.get(player.getXuid());
        const money = playerData.money;
        const randomMoney = Math.ceil(((Math.random() - 0.5) * money) / 10);
        playerData.money += randomMoney;
        PlayerData_1.map_playerData.set(player.getXuid(), playerData);
        player.sendMessage(`§l도박결과: ${Math.ceil(money)}(${randomMoney >= 0 ? "§b" : "§c"}${randomMoney})`);
    }
}
exports.Gambling = Gambling;
exports.gambling = new Gambling();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrREFBZ0U7QUFFaEUsTUFBYSxRQUFRO0lBQ1osS0FBSyxDQUFDLE1BQW9CO1FBQy9CLE1BQU0sVUFBVSxHQUFHLDJCQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBRSxDQUFDO1FBQ3pELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0IsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLFVBQVUsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDO1FBQ2hDLDJCQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7Q0FDRjtBQVRELDRCQVNDO0FBQ1ksUUFBQSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyJ9