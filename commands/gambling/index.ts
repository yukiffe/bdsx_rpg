import { ServerPlayer } from "bdsx/bds/player";
import { bedrockServer } from "bdsx/launcher";
import { map_playerData } from "../../utils/classes/PlayerData";

/**
 * /도박
 * 최대금액의 기본금의+-10%
 */

export class Gambling {
  public money(player: ServerPlayer) {
    const playerData = map_playerData.get(player.getXuid())!;
    const money = playerData.money;
    const randomMoney = Math.ceil(((Math.random() - 0.5) * money) / 10);
    playerData.money += randomMoney;
    map_playerData.set(player.getXuid(), playerData);
    player.sendMessage(`§l도박결과: ${Math.ceil(money)}(${randomMoney >= 0 ? "§b" : "§c"}${randomMoney})`);
  }
}
export const gambling = new Gambling();
