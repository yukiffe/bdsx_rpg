import { ServerPlayer } from "bdsx/bds/player";
import { map_playerData } from "../../utils/classes/PlayerData";
import { ItemStack } from "bdsx/bds/inventory";

/**
 * /기본템
 * 0: 최초입장시 부여
 * 1: 튜툐리얼 완료시 변경
 * 2: 기본템 획득시 변경
 */

export class BasicItem {
  protected wooden_axe: ItemStack;
  protected wooden_hoe: ItemStack;
  protected wooden_pickaxe: ItemStack;
  protected wooden_shovel: ItemStack;
  protected wooden_sword: ItemStack;
  protected fishing_rod: ItemStack;
  protected wheat_seeds: ItemStack;
  protected cooked_beef: ItemStack;
  constructor() {
    this.wooden_axe = ItemStack.constructWith("minecraft:wooden_axe");
    this.wooden_hoe = ItemStack.constructWith("minecraft:wooden_hoe");
    this.wooden_pickaxe = ItemStack.constructWith("minecraft:wooden_pickaxe");
    this.wooden_shovel = ItemStack.constructWith("minecraft:wooden_shovel");
    this.wooden_sword = ItemStack.constructWith("minecraft:wooden_sword");
    this.fishing_rod = ItemStack.constructWith("minecraft:fishing_rod");
    this.wheat_seeds = ItemStack.constructWith("minecraft:wheat_seeds", 16);
    this.cooked_beef = ItemStack.constructWith("minecraft:cooked_beef", 32);
  }
  public give(player: ServerPlayer) {
    const playerData = map_playerData.get(player.getXuid())!;
    if (playerData.tutorial === 1) {
      playerData.tutorial = 2;
      player.addItem(this.wooden_axe.clone());
      player.addItem(this.wooden_hoe.clone());
      player.addItem(this.wooden_pickaxe.clone());
      player.addItem(this.wooden_shovel.clone());
      player.addItem(this.wooden_sword.clone());
      player.addItem(this.fishing_rod.clone());
      player.addItem(this.wheat_seeds.clone());
      player.addItem(this.cooked_beef.clone());
      player.sendInventory();
      player.sendMessage("§l§b기본템을 받았습니다.");
      player.sendMessage("§l§a도끼, 괭이, 곡괭이, 삽, 검, 낚싯대, 씨앗*16, 고기*32");
    } else if (playerData.tutorial === 0) {
      player.sendMessage(`§l§c튜토리얼을 완료해야 기본템을 받을 수 있습니다. §7/튜토리얼`);
    } else {
      player.sendMessage("§l§c기본템은 최초 1회만 받을 수 있습니다.");
    }
    map_playerData.set(player.getXuid(), playerData);
  }
}
export const basicItem = new BasicItem();
