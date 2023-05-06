"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Butcher = void 0;
const inventory_1 = require("bdsx/bds/inventory");
const event_1 = require("bdsx/event");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const double_chest_1 = require("../menu/blocks/double_chest");
const hsmenu_1 = require("../menu/hsmenu");
const __1 = require("..");
const PlayerData_1 = require("../../utils/classes/PlayerData");
const form_1 = require("bdsx/bds/form");
class Butcher extends hsmenu_1.HSMenu {
    constructor(player, page) {
        const doubleChest = new double_chest_1.HSDoubleChest();
        super(player, doubleChest);
        this.page = page;
        this._items = {}; //1p
        this._quest = {}; //2p
        this._achievement = {}; //3p
        this._perks = {}; //특전
        this.setTitle("§l§e도살 상점");
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
exports.Butcher = Butcher;
function setItems(items) {
    for (let i = 0; i < 54; i++)
        items[i] = __1.ladder;
    const chicken = inventory_1.ItemStack.constructWith("minecraft:chicken");
    chicken.setCustomName("§l생 닭고기");
    chicken.setCustomLore(["§b구매: §f150원", "§a판매: §f100원"]);
    items[0] = chicken;
    const porkchop = inventory_1.ItemStack.constructWith("minecraft:porkchop");
    porkchop.setCustomName("§l생 돼지고기");
    porkchop.setCustomLore(["§b구매: §f150원", "§a판매: §f120원"]);
    items[9] = porkchop;
    const beef = inventory_1.ItemStack.constructWith("minecraft:beef");
    beef.setCustomName("§l생 소고기");
    beef.setCustomLore(["§b구매: §f150원", "§a판매: §f130원"]);
    items[18] = beef;
    const mutton = inventory_1.ItemStack.constructWith("minecraft:mutton");
    mutton.setCustomName("§l생 양고기");
    mutton.setCustomLore(["§b구매: §f150원", "§a판매: §f125원"]);
    items[27] = mutton;
    const rabbit = inventory_1.ItemStack.constructWith("minecraft:rabbit");
    rabbit.setCustomName("§l생 토끼고기");
    rabbit.setCustomLore(["§b구매: §f270원", "§a판매: §f200원"]);
    items[36] = rabbit;
    const cooked_chicken = inventory_1.ItemStack.constructWith("minecraft:cooked_chicken");
    cooked_chicken.setCustomName("§l조리된 닭고기");
    cooked_chicken.setCustomLore(["§b구매: §f200원", "§a판매: §f200원"]);
    items[1] = cooked_chicken;
    const cooked_porkchop = inventory_1.ItemStack.constructWith("minecraft:cooked_porkchop");
    cooked_porkchop.setCustomName("§l조리된 돼지고기");
    cooked_porkchop.setCustomLore(["§b구매: §f250원", "§a판매: §f220원"]);
    items[10] = cooked_porkchop;
    const cooked_beef = inventory_1.ItemStack.constructWith("minecraft:cooked_beef");
    cooked_beef.setCustomName("§l조리된 소고기");
    cooked_beef.setCustomLore(["§b구매: §f250원", "§a판매: §f230원"]);
    items[19] = cooked_beef;
    const cooked_mutton = inventory_1.ItemStack.constructWith("minecraft:cooked_mutton");
    cooked_mutton.setCustomName("§l조리된 양고기");
    cooked_mutton.setCustomLore(["§b구매: §f250원", "§a판매: §f225원"]);
    items[28] = cooked_mutton;
    const cooked_rabbit = inventory_1.ItemStack.constructWith("minecraft:cooked_rabbit");
    cooked_rabbit.setCustomName("§l조리된 토끼고기");
    cooked_rabbit.setCustomLore(["§b구매: §f370원", "§a판매: §f300원"]);
    items[37] = cooked_rabbit;
    const rotten_flesh = inventory_1.ItemStack.constructWith("minecraft:rotten_flesh");
    rotten_flesh.setCustomName("§l썩은고기");
    rotten_flesh.setCustomLore(["§b구매: §f500원", "§a판매: §f800원"]);
    items[3] = rotten_flesh;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBNEQ7QUFDNUQsc0NBQW9DO0FBQ3BDLGtEQUF3RDtBQUN4RCw4Q0FBdUg7QUFDdkgsOERBQTREO0FBQzVELDJDQUFzRTtBQUN0RSwwQkFBMEM7QUFDMUMsK0RBQWdFO0FBQ2hFLHdDQUEwRTtBQUUxRSxNQUFhLE9BQVEsU0FBUSxlQUFNO0lBS2pDLFlBQVksTUFBb0IsRUFBWSxJQUFZO1FBQ3RELE1BQU0sV0FBVyxHQUFHLElBQUksNEJBQWEsRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFGZSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBSmhELFdBQU0sR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUNqQyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFDakMsaUJBQVksR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUN2QyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFJdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQyxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUN6RCxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7WUFDcEMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsTUFBTSxNQUFNLEdBQUcsTUFBQSxFQUFFLENB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