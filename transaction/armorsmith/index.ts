//해당경로 farmer -> index

import { ServerPlayer } from "bdsx/bds/player";
import { ContainerId, ItemStack } from "bdsx/bds/inventory";
import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { ItemStackRequestActionTransferBase, ItemStackRequestPacket, ItemStackResponsePacket } from "bdsx/bds/packets";
import { HSDoubleChest } from "../menu/blocks/double_chest";
import { ContainerItems, HSMenu, ResponseData } from "../menu/hsmenu";
import { before, ladder, next } from "..";
import { map_playerData } from "../../utils/classes/PlayerData";
import { Form, FormDropdown, FormLabel, FormSlider } from "bdsx/bds/form";

export class ArmorSmith extends HSMenu {
  private _items: ContainerItems = {}; //1p
  private _quest: ContainerItems = {}; //2p
  private _achievement: ContainerItems = {}; //3p
  private _perks: ContainerItems = {}; //특전
  constructor(player: ServerPlayer, protected page: number) {
    const doubleChest = new HSDoubleChest();
    super(player, doubleChest);
    this.setTitle("§l§e대장장이 상점");
    setItems(this._items);
    setQuests(this._quest);
    setAchievements(this._achievement);

    events.packetBefore(MinecraftPacketIds.ItemStackRequest).on(
      (this.onItemStackRequest = (pk, ni) => {
        if (ni.equals(this.netId)) {
          const action = pk.getRequestBatch().data.get(0)?.getActions().get(0);
          if (this.TriggerActionType.has(action?.type) && action instanceof ItemStackRequestActionTransferBase) {
            const item = this.getItem(action.getSrc().slot).clone();
            if (item.getCustomName() === "§l") return;
            if (item.getCustomName() === "§l§aNext") {
              page++;
              // this.change_items();
              // this.sendInventory();
              return;
            } else if (item.getCustomName() === "§l§aBefore") {
              // page--;
              // this.change_items();
              // this.sendInventory();
              return;
            }
            setTimeout(async () => {
              const playerData = map_playerData.get(player.getXuid())!;
              const answer = await Form.sendTo(player.getNetworkIdentifier(), {
                type: "custom_form",
                title: item.getCustomName(),
                content: [new FormDropdown("아이템 이름", ["구매", "판매"], 0), new FormLabel("가격: ???(추가중)")],
              });
              if (answer === null) return;
              if ((item.getCustomLore()[0] === null || item.getCustomLore()[1]) === null) return;
              const buy_per = item.getCustomLore()[0].replace("§b구매: §f", "").replace("원", "");
              const sell_per = item.getCustomLore()[1].replace("§a판매: §f", "").replace("원", "");
              switch (answer[0]) {
                case 0:
                  if (buy_per === "§b구매: §a구매불가") {
                    player.sendMessage("§c구매 불가 물품입니다.");
                    return;
                  }
                  let price = +buy_per;
                  if (playerData.money >= price) {
                    playerData.money -= price;
                    player.addItem(ItemStack.constructWith(item.getName()));
                    map_playerData.set(player.getXuid(), playerData);
                    player.sendMessage("구매 완료");
                  } else {
                    player.sendMessage("구매실패: 돈부족");
                  }
                  player.sendInventory();
                  break;
                case 1:
                  if (sell_per === "§b판매: §a판매불가") {
                    player.sendMessage("§c판매 불가 물품입니다.");
                    return;
                  }

                  break;
              }
            }, 1000);

            this.close();
          }
        }
      })
    );
    events.packetBefore(MinecraftPacketIds.ContainerClose).on(
      (this.onContainerClose = (pk, ni) => {
        if (ni.equals(this.netId) && !this.isDisabled()) this.close();
      })
    );
    events.playerLeft.on(
      (this.onDisconnect = (event) => {
        if (event.player.getNetworkIdentifier().equals(this.netId)) this.destructUI();
      })
    );
    this.change_items();
    this.open();
  }
  private change_items() {
    switch (this.page) {
      case 1:
        for (let i = 0; i < 54; i++) this.setItem(i, this._items[i] as ItemStack);
        break;
      case 2:
        for (let i = 0; i < 54; i++) this.setItem(i, this._quest[i] as ItemStack);
        break;
      case 3:
        for (let i = 0; i < 54; i++) this.setItem(i, this._achievement[i] as ItemStack);
        break;
    }
  }
  open_shop(player: ServerPlayer) {
    const doubleChest = new HSDoubleChest();
    const menu = new HSMenu(player, doubleChest);
    menu.setTitle("§l§e도구 대장장이 상점");

    menu.open();
  }
}

function setItems(items: ContainerItems) {
  for (let i = 0; i < 54; i++) items[i] = ladder;

  const leather_helmet = ItemStack.constructWith("minecraft:leather_helmet");
  leather_helmet.setCustomName("§l가죽 모자");
  leather_helmet.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
  items[0] = leather_helmet;
  const chainmail_helmet = ItemStack.constructWith("minecraft:chainmail_helmet");
  chainmail_helmet.setCustomName("§l사슬 헬멧");
  chainmail_helmet.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
  items[1] = chainmail_helmet;
  const iron_helmet = ItemStack.constructWith("minecraft:iron_helmet");
  iron_helmet.setCustomName("§l철 헬멧");
  iron_helmet.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
  items[2] = iron_helmet;
  const golden_helmet = ItemStack.constructWith("minecraft:golden_helmet");
  golden_helmet.setCustomName("§l금 헬멧");
  golden_helmet.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[3] = golden_helmet;
  const diamond_helmet = ItemStack.constructWith("minecraft:diamond_helmet");
  diamond_helmet.setCustomName("§l다이아몬드 헬멧");
  diamond_helmet.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
  items[4] = diamond_helmet;
  const netherite_helmet = ItemStack.constructWith("minecraft:netherite_helmet");
  netherite_helmet.setCustomName("§l네테라이트 헬멧");
  netherite_helmet.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
  items[5] = netherite_helmet;
  const turtle_helmet = ItemStack.constructWith("minecraft:turtle_helmet");
  turtle_helmet.setCustomName("§l거북 등딱지");
  turtle_helmet.setCustomLore(["§b구매: §f100000000원", "§a판매: §c판매불가"]);
  items[6] = turtle_helmet;

  const leather_chestplate = ItemStack.constructWith("minecraft:leather_chestplate");
  leather_chestplate.setCustomName("§l가죽 조끼");
  leather_chestplate.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
  items[9] = leather_chestplate;
  const chainmail_chestplate = ItemStack.constructWith("minecraft:chainmail_chestplate");
  chainmail_chestplate.setCustomName("§l사슬 갑옷");
  chainmail_chestplate.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
  items[10] = chainmail_chestplate;
  const iron_chestplate = ItemStack.constructWith("minecraft:iron_chestplate");
  iron_chestplate.setCustomName("§l철 갑옷");
  iron_chestplate.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
  items[11] = iron_chestplate;
  const golden_chestplate = ItemStack.constructWith("minecraft:golden_chestplate");
  golden_chestplate.setCustomName("§l금 갑옷");
  golden_chestplate.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[12] = golden_chestplate;
  const diamond_chestplate = ItemStack.constructWith("minecraft:diamond_chestplate");
  diamond_chestplate.setCustomName("§l다이아몬드 갑옷");
  diamond_chestplate.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
  items[13] = diamond_chestplate;
  const netherite_chestplate = ItemStack.constructWith("minecraft:netherite_chestplate");
  netherite_chestplate.setCustomName("§l네테라이트 갑옷");
  netherite_chestplate.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
  items[14] = netherite_chestplate;
  const elytra = ItemStack.constructWith("minecraft:elytra");
  elytra.setCustomName("§l겉날개");
  elytra.setCustomLore(["§b구매: §f100000000원", "§a판매: §c판매불가"]);
  items[15] = elytra;

  const leather_leggings = ItemStack.constructWith("minecraft:leather_leggings");
  leather_leggings.setCustomName("§l가죽 바지");
  leather_leggings.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
  items[18] = leather_leggings;
  const chainmail_leggings = ItemStack.constructWith("minecraft:chainmail_leggings");
  chainmail_leggings.setCustomName("§l사슬 레깅스");
  chainmail_leggings.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
  items[19] = chainmail_leggings;
  const iron_leggings = ItemStack.constructWith("minecraft:iron_leggings");
  iron_leggings.setCustomName("§l철 레깅스");
  iron_leggings.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
  items[20] = iron_leggings;
  const golden_leggings = ItemStack.constructWith("minecraft:golden_leggings");
  golden_leggings.setCustomName("§l금 레깅스");
  golden_leggings.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[21] = golden_leggings;
  const diamond_leggings = ItemStack.constructWith("minecraft:diamond_leggings");
  diamond_leggings.setCustomName("§l다이아몬드 레깅스");
  diamond_leggings.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
  items[22] = diamond_leggings;
  const netherite_leggings = ItemStack.constructWith("minecraft:netherite_leggings");
  netherite_leggings.setCustomName("§l네테라이트 레깅스");
  netherite_leggings.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
  items[23] = netherite_leggings;

  const leather_boots = ItemStack.constructWith("minecraft:leather_boots");
  leather_boots.setCustomName("§l가죽 부츠");
  leather_boots.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
  items[27] = leather_boots;
  const chainmail_boots = ItemStack.constructWith("minecraft:chainmail_boots");
  chainmail_boots.setCustomName("§l사슬 부츠");
  chainmail_boots.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
  items[28] = chainmail_boots;
  const iron_boots = ItemStack.constructWith("minecraft:iron_boots");
  iron_boots.setCustomName("§l철 부츠");
  iron_boots.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
  items[29] = iron_boots;
  const golden_boots = ItemStack.constructWith("minecraft:golden_boots");
  golden_boots.setCustomName("§l금 부츠");
  golden_boots.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[30] = golden_boots;
  const diamond_boots = ItemStack.constructWith("minecraft:diamond_boots");
  diamond_boots.setCustomName("§l다이아몬드 부츠");
  diamond_boots.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
  items[31] = diamond_boots;
  const netherite_boots = ItemStack.constructWith("minecraft:netherite_boots");
  netherite_boots.setCustomName("§l네테라이트 부츠");
  netherite_boots.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
  items[32] = netherite_boots;

  items[53] = next;
}

function setQuests(quest: ContainerItems) {
  const air = ItemStack.constructWith("minecraft:air");
  for (let i = 0; i < 54; i++) quest[i] = air;

  quest[45] = before;
  quest[53] = next;
}

function setAchievements(achievement: ContainerItems) {
  const air = ItemStack.constructWith("minecraft:air");
  for (let i = 0; i < 54; i++) achievement[i] = air;

  achievement[45] = before;
  achievement[53] = next;
}
