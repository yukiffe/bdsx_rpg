//해당경로 farmer -> index

import { ServerPlayer } from "bdsx/bds/player";
import { ContainerId, ItemStack } from "bdsx/bds/inventory";
import { HSDoubleChest } from "../menu/blocks/double_chest";
import { ContainerItems, HSMenu, ResponseData } from "../menu/hsmenu";
import { before, ladder, next } from "..";
import { Form, FormDropdown, FormSlider, FormLabel } from "bdsx/bds/form";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { ItemStackRequestActionTransferBase } from "bdsx/bds/packets";
import { events } from "bdsx/event";
import { map_playerData } from "../../utils/classes/PlayerData";

export class Fisherman extends HSMenu {
  private _items: ContainerItems = {}; //1p
  private _quest: ContainerItems = {}; //2p
  private _achievement: ContainerItems = {}; //3p
  private _perks: ContainerItems = {}; //특전
  constructor(player: ServerPlayer, protected page: number) {
    const doubleChest = new HSDoubleChest();
    super(player, doubleChest);
    this.setTitle("§l§e낚시꾼 상점");
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

  const cod = ItemStack.constructWith("minecraft:cod");
  cod.setCustomName("§l대구");
  cod.setCustomLore(["§b구매: §c구매불가", "§a판매: §f200원"]);
  items[0] = cod;
  const salmon = ItemStack.constructWith("minecraft:salmon");
  salmon.setCustomName("§l연어");
  salmon.setCustomLore(["§b구매: §c구매불가", "§a판매: §f350원"]);
  items[1] = salmon;
  const tropical_fish = ItemStack.constructWith("minecraft:tropical_fish");
  tropical_fish.setCustomName("§l열대어");
  tropical_fish.setCustomLore(["§b구매: §c구매불가", "§a판매: §f1000원"]);
  items[2] = tropical_fish;
  const pufferfish = ItemStack.constructWith("minecraft:pufferfish");
  pufferfish.setCustomName("§l복어");
  pufferfish.setCustomLore(["§b구매: §c구매불가", "§a판매: §f100원"]);
  items[3] = pufferfish;

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
