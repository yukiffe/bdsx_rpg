"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const front = [
    "§l§o§aＴ§bｈ§eｅ §cＬ§aｉ§bｆ§eｅ",
    "§l§o§bＴ§eｈ§cｅ §bＬ§eｉ§cｆ§aｅ",
    "§l§o§eＴ§cｈ§aｅ §eＬ§cｉ§aｆ§bｅ",
    "§l§o§cＴ§eｈ§aｅ §cＬ§eｉ§aｆ§bｅ",
];
var day_korea;
(function (day_korea) {
    day_korea[day_korea["\uC77C"] = 0] = "\uC77C";
    day_korea[day_korea["\uC6D4"] = 1] = "\uC6D4";
    day_korea[day_korea["\uD654"] = 2] = "\uD654";
    day_korea[day_korea["\uC218"] = 3] = "\uC218";
    day_korea[day_korea["\uBAA9"] = 4] = "\uBAA9";
    day_korea[day_korea["\uAE08"] = 5] = "\uAE08";
    day_korea[day_korea["\uD1A0"] = 6] = "\uD1A0";
})(day_korea || (day_korea = {}));
let i = 0;
const interval = setInterval(() => {
    i = (i + 1) % 4;
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const second = today.getSeconds();
    launcher_1.bedrockServer.serverInstance.setMotd(`${front[i % 4]}   ${month}.${date}(${day_korea[day]}) ${hour}:${minutes}:${second}`);
}, 1000);
event_1.events.serverStop.on(() => {
    clearInterval(interval);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvQztBQUNwQyw0Q0FBOEM7QUFFOUMsTUFBTSxLQUFLLEdBQUc7SUFDWiw0QkFBNEI7SUFDNUIsNEJBQTRCO0lBQzVCLDRCQUE0QjtJQUM1Qiw0QkFBNEI7Q0FDN0IsQ0FBQztBQUNGLElBQUssU0FRSjtBQVJELFdBQUssU0FBUztJQUNaLDZDQUFDLENBQUE7SUFDRCw2Q0FBQyxDQUFBO0lBQ0QsNkNBQUMsQ0FBQTtJQUNELDZDQUFDLENBQUE7SUFDRCw2Q0FBQyxDQUFBO0lBQ0QsNkNBQUMsQ0FBQTtJQUNELDZDQUFDLENBQUE7QUFDSCxDQUFDLEVBUkksU0FBUyxLQUFULFNBQVMsUUFRYjtBQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNWLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7SUFDaEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3pCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNsQyx3QkFBYSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQztBQUM3SCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFVCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDeEIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDIn0=