"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Librarian = void 0;
const inventory_1 = require("bdsx/bds/inventory");
const double_chest_1 = require("../menu/blocks/double_chest");
const hsmenu_1 = require("../menu/hsmenu");
const __1 = require("..");
const form_1 = require("bdsx/bds/form");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
const PlayerData_1 = require("../../utils/classes/PlayerData");
class Librarian extends hsmenu_1.HSMenu {
    constructor(player, page) {
        const doubleChest = new double_chest_1.HSDoubleChest();
        super(player, doubleChest);
        this.page = page;
        this._items = {}; //1p
        this.setTitle("§l§e낚시꾼 상점");
        setItems(this._items, player);
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.ItemStackRequest).on((this.onItemStackRequest = (pk, ni) => {
            var _a;
            if (ni.equals(this.netId)) {
                const action = (_a = pk.getRequestBatch().data.get(0)) === null || _a === void 0 ? void 0 : _a.getActions().get(0);
                if (this.TriggerActionType.has(action === null || action === void 0 ? void 0 : action.type) && action instanceof packets_1.ItemStackRequestActionTransferBase) {
                    const item = this.getItem(action.getSrc().slot).clone();
                    if (item.getCustomName() === "§l")
                        return;
                    if (item.getCustomName() === "§l§aNext") {
                        page++;
                        // this.change_items();
                        // this.sendInventory();
                        return;
                    }
                    else if (item.getCustomName() === "§l§aBefore") {
                        // page--;
                        // this.change_items();
                        // this.sendInventory();
                        return;
                    }
                    if (item.getName() === "minecraft:written_book")
                        return;
                    setTimeout(async () => {
                        const playerData = PlayerData_1.map_playerData.get(player.getXuid());
                        const answer = await form_1.Form.sendTo(player.getNetworkIdentifier(), {
                            type: "custom_form",
                            title: item.getCustomName(),
                            content: [new form_1.FormDropdown("아이템 이름", ["구매"], 0), new form_1.FormLabel("가격")],
                        });
                        if (answer === null)
                            return;
                        if ((item.getCustomLore()[0] === null || item.getCustomLore()[1]) === null)
                            return;
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
                                    PlayerData_1.map_playerData.set(player.getXuid(), playerData);
                                    player.sendMessage("구매 완료");
                                }
                                else {
                                    player.sendMessage("구매실패: 돈부족");
                                }
                                player.sendInventory();
                                break;
                        }
                    }, 1000);
                    this.close();
                }
            }
        }));
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.ContainerClose).on((this.onContainerClose = (pk, ni) => {
            if (ni.equals(this.netId) && !this.isDisabled())
                this.close();
        }));
        event_1.events.playerLeft.on((this.onDisconnect = (event) => {
            if (event.player.getNetworkIdentifier().equals(this.netId))
                this.destructUI();
        }));
        this.change_items();
        this.open();
    }
    change_items() {
        switch (this.page) {
            case 1:
                for (let i = 0; i < 54; i++)
                    this.setItem(i, this._items[i]);
                break;
        }
    }
}
exports.Librarian = Librarian;
function setItems(items, player) {
    for (let i = 0; i < 54; i++)
        items[i] = __1.ladder;
    const book1 = player.hasTag("시민권") ? inventory_1.ItemStack.constructWith("minecraft:written_book") : inventory_1.ItemStack.constructWith("minecraft:book");
    book1.setCustomName("§l시민권");
    book1.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가", "§l칭호: 추후 권한 획득", "§l서버의 다양한 기능 해금"]);
    items[0] = book1;
    const book2 = player.hasTag("귀족") ? inventory_1.ItemStack.constructWith("minecraft:written_book") : inventory_1.ItemStack.constructWith("minecraft:book");
    book2.setCustomName("§l귀족");
    book2.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가", "§l칭호: 추후 권한 획득", "§l상위 0.1%만의 전유물"]);
    items[1] = book2;
    const book3 = player.hasTag("설립자") ? inventory_1.ItemStack.constructWith("minecraft:written_book") : inventory_1.ItemStack.constructWith("minecraft:book");
    book3.setCustomName("§l설립자");
    book3.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가", "§l칭호: 추후 권한 획득", "§l서버 극초창기 유저들의 전유물"]);
    items[2] = book3;
    items[53] = __1.next;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBNEQ7QUFDNUQsOERBQTREO0FBQzVELDJDQUFzRTtBQUN0RSwwQkFBMEM7QUFDMUMsd0NBQTBFO0FBQzFFLGtEQUF3RDtBQUN4RCw4Q0FBc0U7QUFDdEUsc0NBQW9DO0FBQ3BDLCtEQUFnRTtBQUVoRSxNQUFhLFNBQVUsU0FBUSxlQUFNO0lBRW5DLFlBQVksTUFBb0IsRUFBWSxJQUFZO1FBQ3RELE1BQU0sV0FBVyxHQUFHLElBQUksNEJBQWEsRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFGZSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBRGhELFdBQU0sR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUl2QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLGNBQU0sQ0FBQyxZQUFZLENBQUMsOEJBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQ3pELENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOztZQUNwQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFBLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQywwQ0FBRSxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0s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