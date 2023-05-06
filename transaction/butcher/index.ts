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

export class Butcher extends HSMenu {
  private _items: ContainerItems = {}; //1p
  private _quest: ContainerItems = {}; //2p
  private _achievement: ContainerItems = {}; //3p
  private _perks: ContainerItems = {}; //특전
  constructor(player: ServerPlayer, protected page: number) {
    const doubleChest = new HSDoubleChest();
    super(player, doubleChest);
    this.setTitle("§l§e도살 상점");
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
                content: [new FormDropdown("아이템 이름", ["구매", "판매"], 0), new FormSlider("개수", 1, 64, 1, 1), new FormLabel("가격")],
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
                  let price = +buy_per * answer[1];
                  if (playerData.money >= price) {
                    playerData.money -= price;
                    player.addItem(ItemStack.constructWith(item.getName(), answer[1]));
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
                  price = +sell_per * answer[1];
                  const valid_item = player.getCarriedItem();
                  if (valid_item.getName() === item.getName()) {
                    if (valid_item.amount >= answer[1]) {
                      if (valid_item.amount === answer[1]) {
                        player.setCarriedItem(ItemStack.constructWith("minecraft:air"));
                      } else {
                        valid_item.setAmount(valid_item.amount - answer[1]);
                        player.setCarriedItem(valid_item);
                      }
                      playerData.money += price;
                      player.sendMessage("판매 완료");
                    } else {
                      player.sendMessage("판매 실패: 물품 부족");
                    }
                  } else {
                    player.sendMessage("판매 실패: 팔 물건을 손에 들어주세요");
                  }
                  player.sendInventory();
                  map_playerData.set(player.getXuid(), playerData);

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
}

function setItems(items: ContainerItems) {
  for (let i = 0; i < 54; i++) items[i] = ladder;
  const chicken = ItemStack.constructWith("minecraft:chicken");
  chicken.setCustomName("§l생 닭고기");
  chicken.setCustomLore(["§b구매: §f150원", "§a판매: §f100원"]);
  items[0] = chicken;
  const porkchop = ItemStack.constructWith("minecraft:porkchop");
  porkchop.setCustomName("§l생 돼지고기");
  porkchop.setCustomLore(["§b구매: §f150원", "§a판매: §f120원"]);
  items[9] = porkchop;
  const beef = ItemStack.constructWith("minecraft:beef");
  beef.setCustomName("§l생 소고기");
  beef.setCustomLore(["§b구매: §f150원", "§a판매: §f130원"]);
  items[18] = beef;
  const mutton = ItemStack.constructWith("minecraft:mutton");
  mutton.setCustomName("§l생 양고기");
  mutton.setCustomLore(["§b구매: §f150원", "§a판매: §f125원"]);
  items[27] = mutton;
  const rabbit = ItemStack.constructWith("minecraft:rabbit");
  rabbit.setCustomName("§l생 토끼고기");
  rabbit.setCustomLore(["§b구매: §f270원", "§a판매: §f200원"]);
  items[36] = rabbit;

  const cooked_chicken = ItemStack.constructWith("minecraft:cooked_chicken");
  cooked_chicken.setCustomName("§l조리된 닭고기");
  cooked_chicken.setCustomLore(["§b구매: §f200원", "§a판매: §f200원"]);
  items[1] = cooked_chicken;
  const cooked_porkchop = ItemStack.constructWith("minecraft:cooked_porkchop");
  cooked_porkchop.setCustomName("§l조리된 돼지고기");
  cooked_porkchop.setCustomLore(["§b구매: §f250원", "§a판매: §f220원"]);
  items[10] = cooked_porkchop;
  const cooked_beef = ItemStack.constructWith("minecraft:cooked_beef");
  cooked_beef.setCustomName("§l조리된 소고기");
  cooked_beef.setCustomLore(["§b구매: §f250원", "§a판매: §f230원"]);
  items[19] = cooked_beef;
  const cooked_mutton = ItemStack.constructWith("minecraft:cooked_mutton");
  cooked_mutton.setCustomName("§l조리된 양고기");
  cooked_mutton.setCustomLore(["§b구매: §f250원", "§a판매: §f225원"]);
  items[28] = cooked_mutton;
  const cooked_rabbit = ItemStack.constructWith("minecraft:cooked_rabbit");
  cooked_rabbit.setCustomName("§l조리된 토끼고기");
  cooked_rabbit.setCustomLore(["§b구매: §f370원", "§a판매: §f300원"]);
  items[37] = cooked_rabbit;

  const rotten_flesh = ItemStack.constructWith("minecraft:rotten_flesh");
  rotten_flesh.setCustomName("§l썩은고기");
  rotten_flesh.setCustomLore(["§b구매: §f500원", "§a판매: §f800원"]);
  items[3] = rotten_flesh;

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
