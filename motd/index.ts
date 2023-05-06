import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";

const front = [
  "§l§o§aＴ§bｈ§eｅ §cＬ§aｉ§bｆ§eｅ",
  "§l§o§bＴ§eｈ§cｅ §bＬ§eｉ§cｆ§aｅ",
  "§l§o§eＴ§cｈ§aｅ §eＬ§cｉ§aｆ§bｅ",
  "§l§o§cＴ§eｈ§aｅ §cＬ§eｉ§aｆ§bｅ",
];
enum day_korea {
  일,
  월,
  화,
  수,
  목,
  금,
  토,
}
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
  bedrockServer.serverInstance.setMotd(`${front[i % 4]}   ${month}.${date}(${day_korea[day]}) ${hour}:${minutes}:${second}`);
}, 1000);

events.serverStop.on(() => {
  clearInterval(interval);
});
