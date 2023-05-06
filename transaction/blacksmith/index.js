"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackSmith = void 0;
const inventory_1 = require("bdsx/bds/inventory");
const event_1 = require("bdsx/event");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const double_chest_1 = require("../menu/blocks/double_chest");
const hsmenu_1 = require("../menu/hsmenu");
const __1 = require("..");
const PlayerData_1 = require("../../utils/classes/PlayerData");
const form_1 = require("bdsx/bds/form");
class BlackSmith extends hsmenu_1.HSMenu {
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
exports.BlackSmith = BlackSmith;
function setItems(items) {
    for (let i = 0; i < 54; i++)
        items[i] = __1.ladder;
    const wooden_axe = inventory_1.ItemStack.constructWith("minecraft:wooden_axe");
    wooden_axe.setCustomName("§l나무 도끼");
    wooden_axe.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
    items[0] = wooden_axe;
    const stone_axe = inventory_1.ItemStack.constructWith("minecraft:stone_axe");
    stone_axe.setCustomName("§l돌 도끼");
    stone_axe.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
    items[1] = stone_axe;
    const iron_axe = inventory_1.ItemStack.constructWith("minecraft:iron_axe");
    iron_axe.setCustomName("§l철 도끼");
    iron_axe.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
    items[2] = iron_axe;
    const golden_axe = inventory_1.ItemStack.constructWith("minecraft:golden_axe");
    golden_axe.setCustomName("§l금 도끼");
    golden_axe.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[3] = golden_axe;
    const diamond_axe = inventory_1.ItemStack.constructWith("minecraft:diamond_axe");
    diamond_axe.setCustomName("§l다이아몬드 도끼");
    diamond_axe.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
    items[4] = diamond_axe;
    const netherite_axe = inventory_1.ItemStack.constructWith("minecraft:netherite_axe");
    netherite_axe.setCustomName("§l네테라이트 도끼");
    netherite_axe.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
    items[5] = netherite_axe;
    const wooden_hoe = inventory_1.ItemStack.constructWith("minecraft:wooden_hoe");
    wooden_hoe.setCustomName("§l나무 괭이");
    wooden_hoe.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
    items[9] = wooden_hoe;
    const stone_hoe = inventory_1.ItemStack.constructWith("minecraft:stone_hoe");
    stone_hoe.setCustomName("§l돌 괭이");
    stone_hoe.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
    items[10] = stone_hoe;
    const iron_hoe = inventory_1.ItemStack.constructWith("minecraft:iron_hoe");
    iron_hoe.setCustomName("§l철 괭이");
    iron_hoe.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
    items[11] = iron_hoe;
    const golden_hoe = inventory_1.ItemStack.constructWith("minecraft:golden_hoe");
    golden_hoe.setCustomName("§l금 괭이");
    golden_hoe.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[12] = golden_hoe;
    const diamond_hoe = inventory_1.ItemStack.constructWith("minecraft:diamond_hoe");
    diamond_hoe.setCustomName("§l다이아몬드 괭이");
    diamond_hoe.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
    items[13] = diamond_hoe;
    const netherite_hoe = inventory_1.ItemStack.constructWith("minecraft:netherite_hoe");
    netherite_hoe.setCustomName("§l네테라이트 괭이");
    netherite_hoe.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
    items[14] = netherite_hoe;
    const wooden_pickaxe = inventory_1.ItemStack.constructWith("minecraft:wooden_pickaxe");
    wooden_pickaxe.setCustomName("§l나무 곡괭이");
    wooden_pickaxe.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
    items[18] = wooden_pickaxe;
    const stone_pickaxe = inventory_1.ItemStack.constructWith("minecraft:stone_pickaxe");
    stone_pickaxe.setCustomName("§l돌 곡괭이");
    stone_pickaxe.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
    items[19] = stone_pickaxe;
    const iron_pickaxe = inventory_1.ItemStack.constructWith("minecraft:iron_pickaxe");
    iron_pickaxe.setCustomName("§l철 곡괭이");
    iron_pickaxe.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
    items[20] = iron_pickaxe;
    const golden_pickaxe = inventory_1.ItemStack.constructWith("minecraft:golden_pickaxe");
    golden_pickaxe.setCustomName("§l금 곡괭이");
    golden_pickaxe.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[21] = golden_pickaxe;
    const diamond_pickaxe = inventory_1.ItemStack.constructWith("minecraft:diamond_pickaxe");
    diamond_pickaxe.setCustomName("§l다이아몬드 곡괭이");
    diamond_pickaxe.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
    items[22] = diamond_pickaxe;
    const netherite_pickaxe = inventory_1.ItemStack.constructWith("minecraft:netherite_pickaxe");
    netherite_pickaxe.setCustomName("§l네테라이트 곡괭이");
    netherite_pickaxe.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
    items[23] = netherite_pickaxe;
    const wooden_shovel = inventory_1.ItemStack.constructWith("minecraft:wooden_shovel");
    wooden_shovel.setCustomName("§l나무 삽");
    wooden_shovel.setCustomLore(["§b구매: §f100원", "§a판매: §c판매불가"]);
    items[27] = wooden_shovel;
    const stone_shovel = inventory_1.ItemStack.constructWith("minecraft:stone_shovel");
    stone_shovel.setCustomName("§l돌 삽");
    stone_shovel.setCustomLore(["§b구매: §f1000원", "§a판매: §c판매불가"]);
    items[28] = stone_shovel;
    const iron_shovel = inventory_1.ItemStack.constructWith("minecraft:iron_shovel");
    iron_shovel.setCustomName("§l철 삽");
    iron_shovel.setCustomLore(["§b구매: §f10000원", "§a판매: §c판매불가"]);
    items[29] = iron_shovel;
    const golden_shovel = inventory_1.ItemStack.constructWith("minecraft:golden_shovel");
    golden_shovel.setCustomName("§l금 삽");
    golden_shovel.setCustomLore(["§b구매: §f100000원", "§a판매: §c판매불가"]);
    items[30] = golden_shovel;
    const diamond_shovel = inventory_1.ItemStack.constructWith("minecraft:diamond_shovel");
    diamond_shovel.setCustomName("§l다이아몬드 삽");
    diamond_shovel.setCustomLore(["§b구매: §f1000000원", "§a판매: §c판매불가"]);
    items[31] = diamond_shovel;
    const netherite_shovel = inventory_1.ItemStack.constructWith("minecraft:netherite_shovel");
    netherite_shovel.setCustomName("§l네테라이트 삽");
    netherite_shovel.setCustomLore(["§b구매: §f10000000원", "§a판매: §c판매불가"]);
    items[32] = netherite_shovel;
    const fishing_rod = inventory_1.ItemStack.constructWith("minecraft:fishing_rod");
    fishing_rod.setCustomName("§l낚싯대");
    fishing_rod.setCustomLore(["§b구매: §f500원", "§a판매: §c판매불가", "주의: 여러개 사면 돈만 빠져나감"]);
    items[6] = fishing_rod;
    const shears = inventory_1.ItemStack.constructWith("minecraft:shears");
    shears.setCustomName("§l가위");
    shears.setCustomLore(["§b구매: §f500원", "§a판매: §c판매불가", "주의: 여러개 사면 돈만 빠져나감"]);
    items[15] = shears;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxrREFBNEQ7QUFDNUQsc0NBQW9DO0FBQ3BDLGtEQUF3RDtBQUN4RCw4Q0FBdUg7QUFDdkgsOERBQTREO0FBQzVELDJDQUFzRTtBQUN0RSwwQkFBMEM7QUFDMUMsK0RBQWdFO0FBQ2hFLHdDQUEwRTtBQUUxRSxNQUFhLFVBQVcsU0FBUSxlQUFNO0lBS3BDLFlBQVksTUFBb0IsRUFBWSxJQUFZO1FBQ3RELE1BQU0sV0FBVyxHQUFHLElBQUksNEJBQWEsRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFGZSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBSmhELFdBQU0sR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUNqQyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFDakMsaUJBQVksR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUN2QyxXQUFNLEdBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFJdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuQyxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUN6RCxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7WUFDcEMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsTUFBTSxNQUFNLEdBQUcsTUFBQSxFQUFFLENB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O0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBcUI7SUFDdEMsTUFBTSxHQUFHLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRTVDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFNLENBQUM7SUFDbkIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQUksQ0FBQztBQUNuQixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsV0FBMkI7SUFDbEQsTUFBTSxHQUFHLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRWxELFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFNLENBQUM7SUFDekIsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQUksQ0FBQztBQUN6QixDQUFDIn0=