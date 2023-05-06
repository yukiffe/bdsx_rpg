"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArmorSmith = void 0;
const inventory_1 = require("bdsx/bds/inventory");
const event_1 = require("bdsx/event");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const double_chest_1 = require("../menu/blocks/double_chest");
const hsmenu_1 = require("../menu/hsmenu");
const __1 = require("..");
const PlayerData_1 = require("../../utils/classes/PlayerData");
const form_1 = require("bdsx/bds/form");
class ArmorSmith extends hsmenu_1.HSMenu {
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
exports.ArmorSmith = ArmorSmith;
function setItems(items) {
    for (let i = 0; i < 54; i++)
        items[i] = __1.ladder;
    const leather_helmet = inventory_1.ItemStack.constructWith("minecraft:leather_helmet");
    leather_helmet.setCustomName("§l가죽 모자");
    leather_helmet.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
    items[0] = leather_helmet;
    const chainmail_helmet = inventory_1.ItemStack.constructWith("minecraft:chainmail_helmet");
    chainmail_helmet.setCustomName("§l사슬 헬멧");
    chainmail_helmet.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
    items[1] = chainmail_helmet;
    const iron_helmet = inventory_1.ItemStack.constructWith("minecraft:iron_helmet");
    iron_helmet.setCustomName("§l철 헬멧");
    iron_helmet.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
    items[2] = iron_helmet;
    const golden_helmet = inventory_1.ItemStack.constructWith("minecraft:golden_helmet");
    golden_helmet.setCustomName("§l금 헬멧");
    golden_helmet.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[3] = golden_helmet;
    const diamond_helmet = inventory_1.ItemStack.constructWith("minecraft:diamond_helmet");
    diamond_helmet.setCustomName("§l다이아몬드 헬멧");
    diamond_helmet.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
    items[4] = diamond_helmet;
    const netherite_helmet = inventory_1.ItemStack.constructWith("minecraft:netherite_helmet");
    netherite_helmet.setCustomName("§l네테라이트 헬멧");
    netherite_helmet.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
    items[5] = netherite_helmet;
    const turtle_helmet = inventory_1.ItemStack.constructWith("minecraft:turtle_helmet");
    turtle_helmet.setCustomName("§l거북 등딱지");
    turtle_helmet.setCustomLore(["§b구매: §f100000000원", "§a판매: §c판매불가"]);
    items[6] = turtle_helmet;
    const leather_chestplate = inventory_1.ItemStack.constructWith("minecraft:leather_chestplate");
    leather_chestplate.setCustomName("§l가죽 조끼");
    leather_chestplate.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
    items[9] = leather_chestplate;
    const chainmail_chestplate = inventory_1.ItemStack.constructWith("minecraft:chainmail_chestplate");
    chainmail_chestplate.setCustomName("§l사슬 갑옷");
    chainmail_chestplate.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
    items[10] = chainmail_chestplate;
    const iron_chestplate = inventory_1.ItemStack.constructWith("minecraft:iron_chestplate");
    iron_chestplate.setCustomName("§l철 갑옷");
    iron_chestplate.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
    items[11] = iron_chestplate;
    const golden_chestplate = inventory_1.ItemStack.constructWith("minecraft:golden_chestplate");
    golden_chestplate.setCustomName("§l금 갑옷");
    golden_chestplate.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[12] = golden_chestplate;
    const diamond_chestplate = inventory_1.ItemStack.constructWith("minecraft:diamond_chestplate");
    diamond_chestplate.setCustomName("§l다이아몬드 갑옷");
    diamond_chestplate.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
    items[13] = diamond_chestplate;
    const netherite_chestplate = inventory_1.ItemStack.constructWith("minecraft:netherite_chestplate");
    netherite_chestplate.setCustomName("§l네테라이트 갑옷");
    netherite_chestplate.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
    items[14] = netherite_chestplate;
    const elytra = inventory_1.ItemStack.constructWith("minecraft:elytra");
    elytra.setCustomName("§l겉날개");
    elytra.setCustomLore(["§b구매: §f100000000원", "§a판매: §c판매불가"]);
    items[15] = elytra;
    const leather_leggings = inventory_1.ItemStack.constructWith("minecraft:leather_leggings");
    leather_leggings.setCustomName("§l가죽 바지");
    leather_leggings.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
    items[18] = leather_leggings;
    const chainmail_leggings = inventory_1.ItemStack.constructWith("minecraft:chainmail_leggings");
    chainmail_leggings.setCustomName("§l사슬 레깅스");
    chainmail_leggings.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
    items[19] = chainmail_leggings;
    const iron_leggings = inventory_1.ItemStack.constructWith("minecraft:iron_leggings");
    iron_leggings.setCustomName("§l철 레깅스");
    iron_leggings.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
    items[20] = iron_leggings;
    const golden_leggings = inventory_1.ItemStack.constructWith("minecraft:golden_leggings");
    golden_leggings.setCustomName("§l금 레깅스");
    golden_leggings.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[21] = golden_leggings;
    const diamond_leggings = inventory_1.ItemStack.constructWith("minecraft:diamond_leggings");
    diamond_leggings.setCustomName("§l다이아몬드 레깅스");
    diamond_leggings.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
    items[22] = diamond_leggings;
    const netherite_leggings = inventory_1.ItemStack.constructWith("minecraft:netherite_leggings");
    netherite_leggings.setCustomName("§l네테라이트 레깅스");
    netherite_leggings.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
    items[23] = netherite_leggings;
    const leather_boots = inventory_1.ItemStack.constructWith("minecraft:leather_boots");
    leather_boots.setCustomName("§l가죽 부츠");
    leather_boots.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
    items[27] = leather_boots;
    const chainmail_boots = inventory_1.ItemStack.constructWith("minecraft:chainmail_boots");
    chainmail_boots.setCustomName("§l사슬 부츠");
    chainmail_boots.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
    items[28] = chainmail_boots;
    const iron_boots = inventory_1.ItemStack.constructWith("minecraft:iron_boots");
    iron_boots.setCustomName("§l철 부츠");
    iron_boots.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
    items[29] = iron_boots;
    const golden_boots = inventory_1.ItemStack.constructWith("minecraft:golden_boots");
    golden_boots.setCustomName("§l금 부츠");
    golden_boots.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[30] = golden_boots;
    const diamond_boots = inventory_1.ItemStack.constructWith("minecraft:diamond_boots");
    diamond_boots.setCustomName("§l다이아몬드 부츠");
    diamond_boots.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
    items[31] = diamond_boots;
    const netherite_boots = inventory_1.ItemStack.constructWith("minecraft:netherite_boots");
    netherite_boots.setCustomName("§l네테라이트 부츠");
    netherite_boots.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
    items[32] = netherite_boots;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBNEQ7QUFDNUQsc0NBQW9DO0FBQ3BDLGtEQUF3RDtBQUN4RCw4Q0FBdUg7QUFDdkgsOERBQTREO0FBQzVELDJDQUFzRTtBQUN0RSwwQkFBMEM7QUFDMUMsK0RBQWdFO0FBQ2hFLHdDQUEwRTtBQUUxRSxNQUFhLFVBQVcsU0FBUSxlQUFNO0lBS3BDLFlBQVksTUFBb0IsRUFBWSxJQUFZO1FBQ3RELE1BQU0sV0FBVyxHQUFHLElBQUksNEJBQWEsRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFGZSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBSmhELFdBQU0sR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUNqQyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFDakMsaUJBQVksR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUN2QyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFJdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQyxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUN6RCxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7WUFDcEMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsTUFBTSxNQUFNLEdBQUcsTUFBQSxFQUFFLENB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