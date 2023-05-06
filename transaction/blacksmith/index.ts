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

export class BlackSmith extends HSMenu {
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

  const wooden_axe = ItemStack.constructWith("minecraft:wooden_axe");
  wooden_axe.setCustomName("§l나무 도끼");
  wooden_axe.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
  items[0] = wooden_axe;
  const stone_axe = ItemStack.constructWith("minecraft:stone_axe");
  stone_axe.setCustomName("§l돌 도끼");
  stone_axe.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
  items[1] = stone_axe;
  const iron_axe = ItemStack.constructWith("minecraft:iron_axe");
  iron_axe.setCustomName("§l철 도끼");
  iron_axe.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
  items[2] = iron_axe;
  const golden_axe = ItemStack.constructWith("minecraft:golden_axe");
  golden_axe.setCustomName("§l금 도끼");
  golden_axe.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[3] = golden_axe;
  const diamond_axe = ItemStack.constructWith("minecraft:diamond_axe");
  diamond_axe.setCustomName("§l다이아몬드 도끼");
  diamond_axe.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
  items[4] = diamond_axe;
  const netherite_axe = ItemStack.constructWith("minecraft:netherite_axe");
  netherite_axe.setCustomName("§l네테라이트 도끼");
  netherite_axe.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
  items[5] = netherite_axe;

  const wooden_hoe = ItemStack.constructWith("minecraft:wooden_hoe");
  wooden_hoe.setCustomName("§l나무 괭이");
  wooden_hoe.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
  items[9] = wooden_hoe;
  const stone_hoe = ItemStack.constructWith("minecraft:stone_hoe");
  stone_hoe.setCustomName("§l돌 괭이");
  stone_hoe.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
  items[10] = stone_hoe;
  const iron_hoe = ItemStack.constructWith("minecraft:iron_hoe");
  iron_hoe.setCustomName("§l철 괭이");
  iron_hoe.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
  items[11] = iron_hoe;
  const golden_hoe = ItemStack.constructWith("minecraft:golden_hoe");
  golden_hoe.setCustomName("§l금 괭이");
  golden_hoe.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[12] = golden_hoe;
  const diamond_hoe = ItemStack.constructWith("minecraft:diamond_hoe");
  diamond_hoe.setCustomName("§l다이아몬드 괭이");
  diamond_hoe.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
  items[13] = diamond_hoe;
  const netherite_hoe = ItemStack.constructWith("minecraft:netherite_hoe");
  netherite_hoe.setCustomName("§l네테라이트 괭이");
  netherite_hoe.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
  items[14] = netherite_hoe;

  const wooden_pickaxe = ItemStack.constructWith("minecraft:wooden_pickaxe");
  wooden_pickaxe.setCustomName("§l나무 곡괭이");
  wooden_pickaxe.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
  items[18] = wooden_pickaxe;
  const stone_pickaxe = ItemStack.constructWith("minecraft:stone_pickaxe");
  stone_pickaxe.setCustomName("§l돌 곡괭이");
  stone_pickaxe.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
  items[19] = stone_pickaxe;
  const iron_pickaxe = ItemStack.constructWith("minecraft:iron_pickaxe");
  iron_pickaxe.setCustomName("§l철 곡괭이");
  iron_pickaxe.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
  items[20] = iron_pickaxe;
  const golden_pickaxe = ItemStack.constructWith("minecraft:golden_pickaxe");
  golden_pickaxe.setCustomName("§l금 곡괭이");
  golden_pickaxe.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[21] = golden_pickaxe;
  const diamond_pickaxe = ItemStack.constructWith("minecraft:diamond_pickaxe");
  diamond_pickaxe.setCustomName("§l다이아몬드 곡괭이");
  diamond_pickaxe.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
  items[22] = diamond_pickaxe;
  const netherite_pickaxe = ItemStack.constructWith("minecraft:netherite_pickaxe");
  netherite_pickaxe.setCustomName("§l네테라이트 곡괭이");
  netherite_pickaxe.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
  items[23] = netherite_pickaxe;

  const wooden_shovel = ItemStack.constructWith("minecraft:wooden_shovel");
  wooden_shovel.setCustomName("§l나무 삽");
  wooden_shovel.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
  items[27] = wooden_shovel;
  const stone_shovel = ItemStack.constructWith("minecraft:stone_shovel");
  stone_shovel.setCustomName("§l돌 삽");
  stone_shovel.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
  items[28] = stone_shovel;
  const iron_shovel = ItemStack.constructWith("minecraft:iron_shovel");
  iron_shovel.setCustomName("§l철 삽");
  iron_shovel.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
  items[29] = iron_shovel;
  const golden_shovel = ItemStack.constructWith("minecraft:golden_shovel");
  golden_shovel.setCustomName("§l금 삽");
  golden_shovel.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
  items[30] = golden_shovel;
  const diamond_shovel = ItemStack.constructWith("minecraft:diamond_shovel");
  diamond_shovel.setCustomName("§l다이아몬드 삽");
  diamond_shovel.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
  items[31] = diamond_shovel;
  const netherite_shovel = ItemStack.constructWith("minecraft:netherite_shovel");
  netherite_shovel.setCustomName("§l네테라이트 삽");
  netherite_shovel.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
  items[32] = netherite_shovel;

  const fishing_rod = ItemStack.constructWith("minecraft:fishing_rod");
  fishing_rod.setCustomName("§l낚싯대");
  fishing_rod.setCustomLore(["§b구매: §f500원", "§a판매: §c판매불가", "주의: 여러개 사면 돈만 빠져나감"]);
  items[6] = fishing_rod;
  const shears = ItemStack.constructWith("minecraft:shears");
  shears.setCustomName("§l가위");
  shears.setCustomLore(["§b구매: §f500원", "§a판매: §c판매불가", "주의: 여러개 사면 돈만 빠져나감"]);
  items[15] = shears;

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
