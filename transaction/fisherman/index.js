"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fisherman = void 0;
const inventory_1 = require("bdsx/bds/inventory");
const double_chest_1 = require("../menu/blocks/double_chest");
const hsmenu_1 = require("../menu/hsmenu");
const __1 = require("..");
const form_1 = require("bdsx/bds/form");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
const PlayerData_1 = require("../../utils/classes/PlayerData");
class Fisherman extends hsmenu_1.HSMenu {
    constructor(player, page) {
        const doubleChest = new double_chest_1.HSDoubleChest();
        super(player, doubleChest);
        this.page = page;
        this._items = {}; //1p
        this._quest = {}; //2p
        this._achievement = {}; //3p
        this._perks = {}; //특전
        this.setTitle("§l§e낚시꾼 상점");
        setItems(this._items);
        setQuests(this._quest);
        setAchievements(this._achievement);
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
                    setTimeout(async () => {
                        const playerData = PlayerData_1.map_playerData.get(player.getXuid());
                        const answer = await form_1.Form.sendTo(player.getNetworkIdentifier(), {
                            type: "custom_form",
                            title: item.getCustomName(),
                            content: [new form_1.FormDropdown("아이템 이름", ["구매", "판매"], 0), new form_1.FormSlider("개수", 1, 64, 1, 1), new form_1.FormLabel("가격")],
                        });
                        if (answer === null)
                            return;
                        if ((item.getCustomLore()[0] === null || item.getCustomLore()[1]) === null)
                            return;
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
                                    player.addItem(inventory_1.ItemStack.constructWith(item.getName(), answer[1]));
                                    PlayerData_1.map_playerData.set(player.getXuid(), playerData);
                                    player.sendMessage("구매 완료");
                                }
                                else {
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
                                            player.setCarriedItem(inventory_1.ItemStack.constructWith("minecraft:air"));
                                        }
                                        else {
                                            valid_item.setAmount(valid_item.amount - answer[1]);
                                            player.setCarriedItem(valid_item);
                                        }
                                        playerData.money += price;
                                        player.sendMessage("판매 완료");
                                    }
                                    else {
                                        player.sendMessage("판매 실패: 물품 부족");
                                    }
                                }
                                else {
                                    player.sendMessage("판매 실패: 팔 물건을 손에 들어주세요");
                                }
                                player.sendInventory();
                                PlayerData_1.map_playerData.set(player.getXuid(), playerData);
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
            case 2:
                for (let i = 0; i < 54; i++)
                    this.setItem(i, this._quest[i]);
                break;
            case 3:
                for (let i = 0; i < 54; i++)
                    this.setItem(i, this._achievement[i]);
                break;
        }
    }
}
exports.Fisherman = Fisherman;
function setItems(items) {
    for (let i = 0; i < 54; i++)
        items[i] = __1.ladder;
    const cod = inventory_1.ItemStack.constructWith("minecraft:cod");
    cod.setCustomName("§l대구");
    cod.setCustomLore(["§b구매: §c구매불가", "§a판매: §f200원"]);
    items[0] = cod;
    const salmon = inventory_1.ItemStack.constructWith("minecraft:salmon");
    salmon.setCustomName("§l연어");
    salmon.setCustomLore(["§b구매: §c구매불가", "§a판매: §f350원"]);
    items[1] = salmon;
    const tropical_fish = inventory_1.ItemStack.constructWith("minecraft:tropical_fish");
    tropical_fish.setCustomName("§l열대어");
    tropical_fish.setCustomLore(["§b구매: §c구매불가", "§a판매: §f1000원"]);
    items[2] = tropical_fish;
    const pufferfish = inventory_1.ItemStack.constructWith("minecraft:pufferfish");
    pufferfish.setCustomName("§l복어");
    pufferfish.setCustomLore(["§b구매: §c구매불가", "§a판매: §f100원"]);
    items[3] = pufferfish;
    items[53] = __1.next;
}
function setQuests(quest) {
    const air = inventory_1.ItemStack.constructWith("minecraft:air");
    for (let i = 0; i < 54; i++)
        quest[i] = air;
    quest[45] = __1.before;
    quest[53] = __1.next;
}
function setAchievements(achievement) {
    const air = inventory_1.ItemStack.constructWith("minecraft:air");
    for (let i = 0; i < 54; i++)
        achievement[i] = air;
    achievement[45] = __1.before;
    achievement[53] = __1.next;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBNEQ7QUFDNUQsOERBQTREO0FBQzVELDJDQUFzRTtBQUN0RSwwQkFBMEM7QUFDMUMsd0NBQTBFO0FBQzFFLGtEQUF3RDtBQUN4RCw4Q0FBc0U7QUFDdEUsc0NBQW9DO0FBQ3BDLCtEQUFnRTtBQUVoRSxNQUFhLFNBQVUsU0FBUSxlQUFNO0lBS25DLFlBQVksTUFBb0IsRUFBWSxJQUFZO1FBQ3RELE1BQU0sV0FBVyxHQUFHLElBQUksNEJBQWEsRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFGZSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBSmhELFdBQU0sR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUNqQyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFDakMsaUJBQVksR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUN2QyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFJdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQyxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUN6RCxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7WUFDcEMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsTUFBTSxNQUFNLEdBQUcsTUFBQSxFQUFFLENB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