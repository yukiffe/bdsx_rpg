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

export class WeaponSmith extends HSMenu {
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

  const wooden_sword = ItemStack.constructWith("minecraft:wooden_sword");
  wooden_sword.setCustomName("§l나무 도끼");
  wooden_sword.setCustomLore(["§b구매: §f500원", "§a판매: §c판매불가"]);
  items[0] = wooden_sword;
  const stone_sword = ItemStack.constructWith("minecraft:stone_sword");
  stone_sword.setCustomName("§l돌 도끼");
  stone_sword.setCustomLore(["§b구매: §f5000원", "§a판매: §c판매불가"]);
  items[1] = stone_sword;
  const iron_sword = ItemStack.constructWith("minecraft:iron_sword");
  iron_sword.setCustomName("§l철 도끼");
  iron_sword.setCustomLore(["§b구매: §f50000원", "§a판매: §c판매불가"]);
  items[2] = iron_sword;
  const golden_sword = ItemStack.constructWith("minecraft:golden_sword");
  golden_sword.setCustomName("§l금 도끼");
  golden_sword.setCustomLore(["§b구매: §f500000원", "§a판매: §c판매불가"]);
  items[3] = golden_sword;
  const diamond_sword = ItemStack.constructWith("minecraft:diamond_sword");
  diamond_sword.setCustomName("§l다이아몬드 도끼");
  diamond_sword.setCustomLore(["§b구매: §f5000000원", "§a판매: §c판매불가"]);
  items[4] = diamond_sword;
  const netherite_sword = ItemStack.constructWith("minecraft:netherite_sword");
  netherite_sword.setCustomName("§l네테라이트 도끼");
  netherite_sword.setCustomLore(["§b구매: §f50000000원", "§a판매: §c판매불가"]);
  items[5] = netherite_sword;

  const bow = ItemStack.constructWith("minecraft:bow");
  bow.setCustomName("§l활");
  bow.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[9] = bow;
  const crossbow = ItemStack.constructWith("minecraft:crossbow");
  crossbow.setCustomName("§l석궁");
  crossbow.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[10] = crossbow;
  const arrow = ItemStack.constructWith("minecraft:arrow");
  arrow.setCustomName("§l화살");
  arrow.setCustomLore(["§b구매: §f3000원", "§a판매: §c판매불가"]);
  items[12] = arrow;

  const trident = ItemStack.constructWith("minecraft:trident");
  trident.setCustomName("§l삼지창");
  trident.setCustomLore(["§b구매: §f100000000원", "§a판매: §c판매불가"]);
  items[18] = trident;

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
