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

export class Librarian extends HSMenu {
  private _items: ContainerItems = {}; //1p
  constructor(player: ServerPlayer, protected page: number) {
    const doubleChest = new HSDoubleChest();
    super(player, doubleChest);
    this.setTitle("§l§e낚시꾼 상점");
    setItems(this._items, player);

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
            if (item.getName() === "minecraft:written_book") return;
            setTimeout(async () => {
              const playerData = map_playerData.get(player.getXuid())!;
              const answer = await Form.sendTo(player.getNetworkIdentifier(), {
                type: "custom_form",
                title: item.getCustomName(),
                content: [new FormDropdown("아이템 이름", ["구매"], 0), new FormLabel("가격")],
              });
              if (answer === null) return;
              if ((item.getCustomLore()[0] === null || item.getCustomLore()[1]) === null) return;

              const buy_per = item.getCustomLore()[0].replace("§b구매: §f", "").replace("원", "");
              switch (answer[0]) {
                case 0:
                  if (buy_per === "§b구매: §a구매불가") {
                    player.sendMessage("§c구매 불가 물품입니다.");
                    return;
                  }
                  let price = +buy_per;
                  if (playerData.money >= price) {
                    playerData.money -= price;
                    player.addTag(item.getCustomName().replace("§l", ""));
                    map_playerData.set(player.getXuid(), playerData);
                    player.sendMessage("구매 완료");
                  } else {
                    player.sendMessage("구매실패: 돈부족");
                  }
                  player.sendInventory();
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
    }
  }
}

function setItems(items: ContainerItems, player: ServerPlayer) {
  for (let i = 0; i < 54; i++) items[i] = ladder;

  const book1 = player.hasTag("시민권") ? ItemStack.constructWith("minecraft:written_book") : ItemStack.constructWith("minecraft:book");
  book1.setCustomName("§l시민권");
  book1.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가", "§l칭호: 추후 권한 획득", "§l서버의 다양한 기능 해금"]);
  items[0] = book1;
  const book2 = player.hasTag("귀족") ? ItemStack.constructWith("minecraft:written_book") : ItemStack.constructWith("minecraft:book");
  book2.setCustomName("§l귀족");
  book2.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가", "§l칭호: 추후 권한 획득", "§l상위 0.1%만의 전유물"]);
  items[1] = book2;
  const book3 = player.hasTag("설립자") ? ItemStack.constructWith("minecraft:written_book") : ItemStack.constructWith("minecraft:book");
  book3.setCustomName("§l설립자");
  book3.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가", "§l칭호: 추후 권한 획득", "§l서버 극초창기 유저들의 전유물"]);
  items[2] = book3;

  items[53] = next;
}
