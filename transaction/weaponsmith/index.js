"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponSmith = void 0;
const inventory_1 = require("bdsx/bds/inventory");
const event_1 = require("bdsx/event");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const double_chest_1 = require("../menu/blocks/double_chest");
const hsmenu_1 = require("../menu/hsmenu");
const __1 = require("..");
const PlayerData_1 = require("../../utils/classes/PlayerData");
const form_1 = require("bdsx/bds/form");
class WeaponSmith extends hsmenu_1.HSMenu {
    constructor(player, page) {
        const doubleChest = new double_chest_1.HSDoubleChest();
        super(player, doubleChest);
        this.page = page;
        this._items = {}; //1p
        this._quest = {}; //2p
        this._achievement = {}; //3p
        this._perks = {}; //특전
        this.setTitle("§l§e대장장이 상점");
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
                            content: [new form_1.FormDropdown("아이템 이름", ["구매", "판매"], 0), new form_1.FormLabel("가격: ???(추가중)")],
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
                                let price = +buy_per;
                                if (playerData.money >= price) {
                                    playerData.money -= price;
                                    player.addItem(inventory_1.ItemStack.constructWith(item.getName()));
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
    open_shop(player) {
        const doubleChest = new double_chest_1.HSDoubleChest();
        const menu = new hsmenu_1.HSMenu(player, doubleChest);
        menu.setTitle("§l§e도구 대장장이 상점");
        menu.open();
    }
}
exports.WeaponSmith = WeaponSmith;
function setItems(items) {
    for (let i = 0; i < 54; i++)
        items[i] = __1.ladder;
    const wooden_sword = inventory_1.ItemStack.constructWith("minecraft:wooden_sword");
    wooden_sword.setCustomName("§l나무 도끼");
    wooden_sword.setCustomLore(["§b구매: §f500원", "§a판매: §c판매불가"]);
    items[0] = wooden_sword;
    const stone_sword = inventory_1.ItemStack.constructWith("minecraft:stone_sword");
    stone_sword.setCustomName("§l돌 도끼");
    stone_sword.setCustomLore(["§b구매: §f5000원", "§a판매: §c판매불가"]);
    items[1] = stone_sword;
    const iron_sword = inventory_1.ItemStack.constructWith("minecraft:iron_sword");
    iron_sword.setCustomName("§l철 도끼");
    iron_sword.setCustomLore(["§b구매: §f50000원", "§a판매: §c판매불가"]);
    items[2] = iron_sword;
    const golden_sword = inventory_1.ItemStack.constructWith("minecraft:golden_sword");
    golden_sword.setCustomName("§l금 도끼");
    golden_sword.setCustomLore(["§b구매: §f500000원", "§a판매: §c판매불가"]);
    items[3] = golden_sword;
    const diamond_sword = inventory_1.ItemStack.constructWith("minecraft:diamond_sword");
    diamond_sword.setCustomName("§l다이아몬드 도끼");
    diamond_sword.setCustomLore(["§b구매: §f5000000원", "§a판매: §c판매불가"]);
    items[4] = diamond_sword;
    const netherite_sword = inventory_1.ItemStack.constructWith("minecraft:netherite_sword");
    netherite_sword.setCustomName("§l네테라이트 도끼");
    netherite_sword.setCustomLore(["§b구매: §f50000000원", "§a판매: §c판매불가"]);
    items[5] = netherite_sword;
    const bow = inventory_1.ItemStack.constructWith("minecraft:bow");
    bow.setCustomName("§l활");
    bow.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[9] = bow;
    const crossbow = inventory_1.ItemStack.constructWith("minecraft:crossbow");
    crossbow.setCustomName("§l석궁");
    crossbow.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[10] = crossbow;
    const arrow = inventory_1.ItemStack.constructWith("minecraft:arrow");
    arrow.setCustomName("§l화살");
    arrow.setCustomLore(["§b구매: §f3000원", "§a판매: §c판매불가"]);
    items[12] = arrow;
    const trident = inventory_1.ItemStack.constructWith("minecraft:trident");
    trident.setCustomName("§l삼지창");
    trident.setCustomLore(["§b구매: §f100000000원", "§a판매: §c판매불가"]);
    items[18] = trident;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBNEQ7QUFDNUQsc0NBQW9DO0FBQ3BDLGtEQUF3RDtBQUN4RCw4Q0FBdUg7QUFDdkgsOERBQTREO0FBQzVELDJDQUFzRTtBQUN0RSwwQkFBMEM7QUFDMUMsK0RBQWdFO0FBQ2hFLHdDQUEwRTtBQUUxRSxNQUFhLFdBQVksU0FBUSxlQUFNO0lBS3JDLFlBQVksTUFBb0IsRUFBWSxJQUFZO1FBQ3RELE1BQU0sV0FBVyxHQUFHLElBQUksNEJBQWEsRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFGZSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBSmhELFdBQU0sR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUNqQyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFDakMsaUJBQVksR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUN2QyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFJdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQyxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUN6RCxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7WUFDcEMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsTUFBTSxNQUFNLEdBQUcsTUFBQSxFQUFFLENB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