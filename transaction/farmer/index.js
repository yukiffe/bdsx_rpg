"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievement_quest = exports.Farmer = void 0;
const player_1 = require("bdsx/bds/player");
const inventory_1 = require("bdsx/bds/inventory");
const event_1 = require("bdsx/event");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const double_chest_1 = require("../menu/blocks/double_chest");
const hsmenu_1 = require("../menu/hsmenu");
const common_1 = require("bdsx/common");
const __1 = require("..");
const PlayerData_1 = require("../../utils/classes/PlayerData");
const form_1 = require("bdsx/bds/form");
const command_1 = require("bdsx/bds/command");
const blockpos_1 = require("bdsx/bds/blockpos");
const launcher_1 = require("bdsx/launcher");
const index_1 = require("./../../utils/items/index");
const farmerData_1 = require("../../utils/classes/PlayerData/farmerData");
class Farmer extends hsmenu_1.HSMenu {
    //이거 전부 Set로 변경
    constructor(player, page) {
        const doubleChest = new double_chest_1.HSDoubleChest();
        super(player, doubleChest);
        this.page = page;
        this._items = {}; //1p
        this._quest = {}; //2p
        this._achievement = {}; //3p
        this._perks = {}; //특전
        setItems(this._items);
        setQuests(this._quest, player);
        setAchievements(this._achievement);
        setPerks(this._perks);
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.ItemStackRequest).on((this.onItemStackRequest = (pk, ni) => {
            var _a;
            if (ni.equals(this.netId)) {
                const action = (_a = pk.getRequestBatch().data.get(0)) === null || _a === void 0 ? void 0 : _a.getActions().get(0);
                if (this.TriggerActionType.has(action === null || action === void 0 ? void 0 : action.type) && action instanceof packets_1.ItemStackRequestActionTransferBase) {
                    const slot = action.getSrc().slot;
                    const item = this.getItem(slot);
                    switch (item.getCustomName()) {
                        case "§l": // 빈 공간 채우는 용도(아이템 지우기 위해서 -> air은 아이템 취급을 안해서 제거가 안됌)
                            return;
                        case "§l§aNext": // 다음 페이지
                            this.page++;
                            this.change_items();
                            this.sendInventory();
                            return;
                        case "§l§aBefore": // 이전 페이지
                            this.page--;
                            this.change_items();
                            this.sendInventory();
                            return;
                        default: // 아이템 상호작용
                            switch (this.page) {
                                case 1: //아이템 구매 페이지
                                    buy_sell(player, item.clone());
                                    this.close();
                                    return;
                                case 2: //퀘스트 페이지
                                    const change = quest(player, item, action.getSrc().slot);
                                    if (change)
                                        this.setItem(slot, exports.achievement_quest);
                                    this.sendInventory();
                                    return;
                                case 3:
                                    //특전 페이지
                                    return;
                            }
                    }
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
        this.setTitle("§l§e농사 상점");
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
            case 4:
                for (let i = 0; i < 54; i++)
                    this.setItem(i, this._perks[i]);
                break;
            default:
                this.close();
        }
    }
}
exports.Farmer = Farmer;
exports.achievement_quest = inventory_1.ItemStack.constructWith("minecraft:written_book");
exports.achievement_quest.setCustomName("§l§a완료");
function setQuests(quests, player) {
    for (let i = 0; i < 54; i++)
        quests[i] = __1.ladder;
    const quest = PlayerData_1.map_playerData.get(player.getXuid()).farmerData.quest;
    const dayQeust1 = inventory_1.ItemStack.constructWith("minecraft:book");
    dayQeust1.setCustomName("§l일일퀘스트 1");
    dayQeust1.setCustomLore(["§a밀 64개 캐기", "§6보상: 경험치 500xp"]);
    quests[0] = quest.has("wheat") ? exports.achievement_quest : dayQeust1;
    const dayQeust2 = inventory_1.ItemStack.constructWith("minecraft:book");
    dayQeust2.setCustomName("§l일일퀘스트 2");
    dayQeust2.setCustomLore(["§a비트 64개 캐기", "§6보상: 경험치 500xp"]);
    quests[9] = quest.has("beetroot") ? exports.achievement_quest : dayQeust2;
    const dayQeust3 = inventory_1.ItemStack.constructWith("minecraft:book");
    dayQeust3.setCustomName("§l일일퀘스트 3");
    dayQeust3.setCustomLore(["§a수박 64개 캐기", "§6보상: 경험치 500xp"]);
    quests[18] = quest.has("melon_block") ? exports.achievement_quest : dayQeust3;
    const dayQeust4 = inventory_1.ItemStack.constructWith("minecraft:book");
    dayQeust4.setCustomName("§l일일퀘스트 4");
    dayQeust4.setCustomLore(["§a호박 64개 캐기", "§6보상: 경험치 500xp"]);
    quests[27] = quest.has("pumpkin") ? exports.achievement_quest : dayQeust4;
    const dayQeust5 = inventory_1.ItemStack.constructWith("minecraft:book");
    dayQeust5.setCustomName("§l일일퀘스트 5");
    dayQeust5.setCustomLore(["§a횃불꽃 64개 캐기", "§6보상: 경험치 500xp"]);
    quests[36] = quest.has("torchflower") ? exports.achievement_quest : dayQeust5;
    quests[45] = __1.before;
    quests[53] = __1.next;
}
function setAchievements(achievements) {
    for (let i = 0; i < 54; i++)
        achievements[i] = __1.ladder;
    const wheat_achievements0 = inventory_1.ItemStack.constructWith("minecraft:book");
    wheat_achievements0.setCustomName("§l밀 농사꾼");
    wheat_achievements0.setCustomLore(["§a밀 64개 캐기", "§6보상: 밀 보너스+1"]);
    achievements[0] = wheat_achievements0;
    const wheat_achievements1 = inventory_1.ItemStack.constructWith("minecraft:book");
    wheat_achievements1.setCustomName("§l밀 농사꾼");
    wheat_achievements1.setCustomLore(["§a밀 4,096개 캐기", "§6보상: 밀 보너스+2"]);
    achievements[1] = wheat_achievements1;
    const wheat_achievements2 = inventory_1.ItemStack.constructWith("minecraft:book");
    wheat_achievements2.setCustomName("§l밀 농사꾼");
    wheat_achievements2.setCustomLore(["§a밀 262,144개 캐기", "§6보상: 밀 보너스+3"]);
    achievements[2] = wheat_achievements2;
    achievements[45] = __1.before;
    achievements[53] = __1.next;
}
function setPerks(perks) {
    for (let i = 0; i < 54; i++)
        perks[i] = __1.ladder;
    const reference_perks0 = inventory_1.ItemStack.constructWith("minecraft:book");
    reference_perks0.setCustomName("§l초대자");
    reference_perks0.setCustomLore(["§a1명 이상에게 초대받기(/추천인)", "§6보상: 농사 경험치 보너스+10%", "§c준비중인 기능입니다."]);
    perks[0] = reference_perks0;
    // const reference_perks1 = ItemStack.constructWith("minecraft:book");
    // reference_perks1.setCustomName("§l중급 초대자");
    // reference_perks1.setCustomLore(["§a10명 이상에게 초대받기(/추천인)", "§6보상: 농사 경험치 보너스+30%"]);
    // perks[1] = reference_perks1;
    // const reference_perks2 = ItemStack.constructWith("minecraft:book");
    // reference_perks2.setCustomName("§l고급 초대자");
    // reference_perks2.setCustomLore(["§a100명 이상에게 초대받기(/추천인)", "§6보상: 농사 경험치 보너스+50%"]);
    // perks[2] = reference_perks2;
    perks[45] = __1.before;
}
/**events.packetBefore(MinecraftPacketIds.ItemStackRequest).on(
      (this.onItemStackRequest = (pk, ni) => {
        if (ni.equals(this.netId)) {
          const action = pk.getRequestBatch().data.get(0)?.getActions().get(0);
          if (this.TriggerActionType.has(action?.type) && action instanceof ItemStackRequestActionTransferBase) {
            const item = this.getItem(action.getSrc().slot).clone();
            switch (item.getCustomName()) {
              case "§l":
                return;
              case "§l§aNext":
                this.page++;
                this.change_items();
                this.sendInventory();
                return;
              case "§l§aBefore":
                this.page--;
                this.change_items();
                this.sendInventory();
                return;
              default:
                this.close();
                setTimeout(async () => {
                  const playerData = map_playerData.get(player.getXuid())!;
                  const select = await Form.sendTo(player.getNetworkIdentifier(), {
                    type: "custom_form",
                    title: item.getCustomName(),
                    content: [new FormLabel("아이템 이름"), new FormDropdown("구매/판매를 선택해주세요.", ["구매", "판매"], 0)],
                  });
                  if (!select) return;
                  setTimeout(async () => {
                    switch (select[0]) {
                      case 0:
                        const purchase = await Form.sendTo(player.getNetworkIdentifier(), {
                          type: "custom_form",
                          title: item.getCustomName(),
                          content: [new FormLabel(`${item.getCustomName()}\n${item.getCustomLore.toString()}`), new FormSlider("개수를 선택하세요.", 1, 64, 1, 1)],
                        });
                        const buy_per = item.getCustomLore()[0].replace("§b구매: §f", "").replace("원", "");
                        if (!purchase) return;
                        if (buy_per === "§b구매: §a구매불가") {
                          player.sendMessage("§c구매 불가 물품입니다.");
                          return;
                        }
                        let price = +buy_per * purchase[0];
                        if (playerData.money >= price) {
                          playerData.money -= price;
                          player.addItem(ItemStack.constructWith(item.getName(), purchase[0]));
                          map_playerData.set(player.getXuid(), playerData);
                          player.sendMessage("구매 완료");
                        } else {
                          player.sendMessage("구매실패: 돈부족");
                        }
                        player.sendInventory();
                        break;
                      case 1:
                        const sell = await Form.sendTo(player.getNetworkIdentifier(), {
                          type: "custom_form",
                          title: item.getCustomName(),
                          content: [new FormLabel(`${item.getCustomName()}\n${item.getCustomLore.toString()}`), new FormSlider("개수를 선택하세요.", 1, 64, 1, 1)],
                        });
                        const sell_per = item.getCustomLore()[1].replace("§a판매: §f", "").replace("원", "");
                        if (!sell) return;
                        if (sell_per === "§b판매: §a판매불가") {
                          player.sendMessage("§c판매 불가 물품입니다.");
                          return;
                        }
                        price = +sell_per * sell[0];
                        const valid_item = player.getCarriedItem();
                        if (valid_item.getName() === item.getName()) {
                          if (valid_item.amount >= sell[0]) {
                            if (valid_item.amount === sell[0]) {
                              player.setCarriedItem(ItemStack.constructWith("minecraft:air"));
                            } else {
                              valid_item.setAmount(valid_item.amount - sell[0]);
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
                        //판매
                        break;
                    }
                  }, 500);

                  map_playerData.set(player.getXuid(), playerData);
                }, 500);
                return;
            }
          }
        }
      })
    ); */
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.PlayerAction).on((pkt, ni) => {
    const player = ni.getActor();
    if (player === null)
        return;
    const blockPos = pkt.pos;
    const block = player.getDimensionBlockSource().getBlock(blockPos);
    const itemName = block.getDescriptionId().replace("tile.", "");
    let data = block.data;
    switch (itemName) {
        case "sweet_berry_bush":
            // harvest(player, blockPos, itemName, data);
            break;
        case "spruce_trapdoor":
        case "trapdoor":
        case "spruce_fence_gate":
        case "frame":
            if (player.getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
                return;
            const copyPos = blockpos_1.BlockPos.construct(blockPos);
            launcher_1.bedrockServer.executeCommand(`structure save sign ${copyPos.x} ${copyPos.y} ${copyPos.z} ${copyPos.x} ${copyPos.y} ${copyPos.z} false memory`);
            player.getDimensionBlockSource().setBlock(blockPos, index_1.airBlock);
            setTimeout(() => {
                launcher_1.bedrockServer.executeCommand(`structure load sign ${copyPos.x} ${copyPos.y} ${copyPos.z}`);
            }, 1);
    }
});
//블럭등록
const frames = new Set(); //아이템-포지션 순
frames.add("structure load wheat 6 101 1");
frames.add("structure load salmon 4 101 2");
frames.add("structure load book -4 102 8");
frames.add("structure load book -6 102 8");
frames.add("structure load writable_book -4 101 9");
frames.add("structure load helmet -10 102 6");
frames.add("structure load chestplate -12 102 6");
frames.add("structure load potion -15 102 3");
frames.add("structure load arrow -12 102 -4");
frames.add("structure load pickaxe -14 102 -6");
frames.add("structure load axe -14 102 -8");
frames.add("structure load hoe -15 101 -6");
frames.add("structure load sword -3 102 -8");
frames.add("structure load bow -1 102 -8");
frames.add("structure load beef 5 102 -6");
frames.add('kill @e[type=item, name="§l§9모조품입니다.§r"]');
const interval = setInterval(() => {
    frames.forEach((value) => {
        launcher_1.bedrockServer.executeCommand(value);
    });
}, 1000);
event_1.events.serverClose.on(() => {
    clearInterval(interval);
});
event_1.events.playerPickupItem.on((ev) => {
    if (ev.itemActor.itemStack.getCustomName() === "§l§9모조품입니다.§r") {
        return common_1.CANCEL;
    }
});
// export class Quote {
//   public sumPurchase: number = 0; //총구매개수
//   public purchase: Map<string, number> = new Map<string, number>(); //구매개수
//   public frame: Map<string, number> = new Map<string, number>(); //기본가격
//   public timeMoney: Map<string, number> = new Map<string, number>(); //시간마다 추가적으로 주는 금액
//   public purchase_timeMoney: Map<string, number> = new Map<string, number>(); //64개마다 timeMoney차감, 기록용
//   constructor() {
//     const interval = setInterval(() => {
//       this.purchase_timeMoney.forEach((value, key) => {
//         value += 1;
//       });
//     }, 640000);
//     events.serverClose.on(() => {
//       clearInterval(interval);
//     });
//   }
// }
// export class QuoteFrame {
//   constructor(private _foundation: number) {
//     //
//   }
//   get foundation() {
//     return this._foundation;
//   }
// }
// export class FarmerQuote extends Quote {
//   constructor() {
//     super();
//     this.frame.set("wheat_seeds", 10);
//     this.frame.set("beetroot_seeds", 10);
//     this.frame.set("melon_seeds", 10);
//     this.frame.set("pumpkin_seeds", 10);
//     this.frame.set("torchflower_seeds", 10);
//     this.frame.set("wheat", 50);
//     this.frame.set("beetroot", 50);
//     this.frame.set("melon_block", 20);
//     this.frame.set("pumpkin", 20);
//     this.frame.set("torchflower", 50);
//     this.frame.set("potato", 50);
//     this.frame.set("poisonous_potato", 20);
//     this.frame.set("cocoa_beans", 50);
//     this.frame.set("carrot", 50);
//     this.frame.set("nether_wart", 50);
//     this.frame.set("sweet_berries", 20);
//     this.frame.set("bamboo", 10);
//     this.frame.set("sugar_cane", 10);
//     this.frame.set("chorus_flower", 10);
//     this.frame.set("chorus_fruit", 10);
//     this.frame.set("vine", 50);
//     this.frame.set("weeping_vines", 10);
//     this.frame.set("twisting_vines", 10);
//     this.frame.set("glow_berries", 10);
//     this.frame.set("kelp", 10);
//     this.purchase_timeMoney.set("wheat_seeds", 0);
//     this.purchase_timeMoney.set("beetroot_seeds", 0);
//     this.purchase_timeMoney.set("melon_seeds", 0);
//     this.purchase_timeMoney.set("pumpkin_seeds", 0);
//     this.purchase_timeMoney.set("torchflower_seeds", 0);
//     this.purchase_timeMoney.set("wheat", 0);
//     this.purchase_timeMoney.set("beetroot", 0);
//     this.purchase_timeMoney.set("melon_block", 0);
//     this.purchase_timeMoney.set("pumpkin", 0);
//     this.purchase_timeMoney.set("torchflower", 0);
//     this.purchase_timeMoney.set("potato", 0);
//     this.purchase_timeMoney.set("poisonous_potato", 0);
//     this.purchase_timeMoney.set("cocoa_beans", 0);
//     this.purchase_timeMoney.set("carrot", 0);
//     this.purchase_timeMoney.set("nether_wart", 0);
//     this.purchase_timeMoney.set("sweet_berries", 0);
//     this.purchase_timeMoney.set("bamboo", 0);
//     this.purchase_timeMoney.set("sugar_cane", 0);
//     this.purchase_timeMoney.set("chorus_flower", 0);
//     this.purchase_timeMoney.set("chorus_fruit", 0);
//     this.purchase_timeMoney.set("vine", 0);
//     this.purchase_timeMoney.set("weeping_vines", 0);
//     this.purchase_timeMoney.set("twisting_vines", 0);
//     this.purchase_timeMoney.set("glow_berries", 0);
//     this.purchase_timeMoney.set("kelp", 0);
//   }
//   public get_harvest(name: string): number {
//     return this.frame.get(name)! + this.timeMoney.get(name)! + this.purchase.get(name)! / this.sumPurchase;
//   }
// }
// export class Shop {
//   constructor() {}
// }
// class ShopItem {
//   private customLore: string[];
//   public itemStack: ItemStack;
//   constructor(private itemName: string, private customName: string, public buy: number, public sell: number, additional_customLore: string[], public slot: number) {
//     this.customLore[0] = buy ? `§b구매: §f${buy}원` : `§b구매: §c구매불가`;
//     this.customLore[1] = sell ? `§a판매: §f${sell}원` : `§a판매: §c판매불가`;
//     let i = 2;
//     for (const lore of additional_customLore) {
//       this.customLore[i++] = lore;
//     }
//     this.itemStack = ItemStack.constructWith(this.itemName);
//     this.itemStack.setCustomName(this.customName);
//     this.itemStack.setCustomLore(this.customLore);
//   }
// }
// class FarmerShop extends Shop {
//   protected quote: FarmerQuote = new FarmerQuote();
//   protected wheat_seeds: ShopItem = new ShopItem("minecraft:wheat_seeds", "§l밀 씨앗", 0, 0, [], 0);
//   protected beetroot_seeds: ShopItem = new ShopItem("minecraft:beetroot_seeds", "§l비트 씨앗", 0, 0, [], 9);
//   protected melon_seeds: ShopItem = new ShopItem("minecraft:melon_seeds", "§l수박 씨앗", 0, 0, [], 18);
//   protected pumpkin_seeds: ShopItem = new ShopItem("minecraft:pumpkin_seeds", "§l호박 씨앗", 0, 0, [], 27);
//   protected torchflower_seeds: ShopItem = new ShopItem("minecraft:torchflower_seeds", "§l횃불꽃 씨앗", 0, 0, [], 36);
//   protected wheat: ShopItem = new ShopItem("minecraft:wheat", "§l밀", 0, 0, [], 1);
//   protected beetroot: ShopItem = new ShopItem("minecraft:beetroot", "§l비트", 0, 0, [], 10);
//   protected melon_block: ShopItem = new ShopItem("minecraft:melon_block", "§l수박", 0, 0, [], 19);
//   protected pumpkin: ShopItem = new ShopItem("minecraft:pumpkin", "§l호박", 0, 0, [], 28);
//   protected torchflower: ShopItem = new ShopItem("minecraft:torchflower", "§l횃불꽃", 0, 0, [], 37);
//   protected potato: ShopItem = new ShopItem("minecraft:potato", "§l감자", 0, 0, [], 3);
//   protected poisonous_potato: ShopItem = new ShopItem("minecraft:poisonous_potato", "§l독감자", 0, 0, [], 12);
//   protected cocoa_beans: ShopItem = new ShopItem("minecraft:cocoa_beans", "§l코코아", 0, 0, [], 21);
//   protected carrot: ShopItem = new ShopItem("minecraft:carrot", "§l당근", 0, 0, [], 30);
//   protected nether_wart: ShopItem = new ShopItem("minecraft:nether_wart", "§l네더와트", 0, 0, [], 39);
//   protected sweet_berries: ShopItem = new ShopItem("minecraft:sweet_berries", "§l달콤한 열매", 0, 0, [], 5);
//   protected bamboo: ShopItem = new ShopItem("minecraft:bamboo", "§l대나무", 0, 0, [], 14);
//   protected sugar_cane: ShopItem = new ShopItem("minecraft:sugar_cane", "§l사탕수수", 0, 0, [], 23);
//   protected chorus_flower: ShopItem = new ShopItem("minecraft:chorus_flower", "§l코러스 꽃", 0, 0, [], 32);
//   protected chorus_fruit: ShopItem = new ShopItem("minecraft:chorus_fruit", "§l코러스 열매", 0, 0, [], 41);
//   protected vine: ShopItem = new ShopItem("minecraft:vine", "§l덩굴", 0, 0, [], 7);
//   protected weeping_vines: ShopItem = new ShopItem("minecraft:weeping_vines", "§l흐느끼는 덩굴", 0, 0, [], 16);
//   protected twisting_vines: ShopItem = new ShopItem("minecraft:twisting_vines", "§l뒤틀린 덩굴", 0, 0, [], 25);
//   protected glow_berries: ShopItem = new ShopItem("minecraft:glow_berries", "§l반짝이는 열매", 0, 0, [], 34);
//   protected kelp: ShopItem = new ShopItem("minecraft:kelp", "§l다시마", 0, 0, [], 43);
//   constructor() {
//     super();
//   }
// }
////////////////////////////////////////////////?/////////////////////////////////////////////////
//아래 코드는 위랑은 상관없는 타 유저 스텟창
event_1.events.playerAttack.on((ev) => {
    console.log("");
    const target = ev.victim;
    const player = ev.player;
    if (target instanceof player_1.ServerPlayer) {
        console.log("player");
        const doubleChest = new double_chest_1.HSDoubleChest();
        const menu = new hsmenu_1.HSMenu(player, doubleChest);
        menu.open();
        menu.setTitle(`§e${target.getName()}§f's 프로필`);
        menu.setItem(0, inventory_1.ItemStack.constructWith("minecraft:leather_helmet"));
    }
});
////여까지
function buy_sell(player, item) {
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
}
function quest(player, item, slot) {
    if (item == exports.achievement_quest)
        return false;
    const playerData = PlayerData_1.map_playerData.get(player.getXuid());
    switch (slot) {
        case 0:
            if (playerData.farmerData.get_dayHarvest(farmerData_1.CROPS.wheat) >= 64) {
                playerData.farmerData.quest.add("wheat");
                playerData.add_experience(player, PlayerData_1.ACTIVE.FARMER, 500);
                return true;
            }
            break;
        case 9:
            if (playerData.farmerData.get_dayHarvest(farmerData_1.CROPS.beetroot) >= 64) {
                playerData.farmerData.quest.add("beetroot");
                playerData.add_experience(player, PlayerData_1.ACTIVE.FARMER, 500);
                return true;
            }
            break;
        case 18:
            if (playerData.farmerData.get_dayHarvest(farmerData_1.CROPS.melon_block) >= 64) {
                playerData.farmerData.quest.add("melon_block");
                playerData.add_experience(player, PlayerData_1.ACTIVE.FARMER, 500);
                return true;
            }
            break;
        case 27:
            if (playerData.farmerData.get_dayHarvest(farmerData_1.CROPS.pumpkin) >= 64) {
                playerData.farmerData.quest.add("pumpkin");
                playerData.add_experience(player, PlayerData_1.ACTIVE.FARMER, 500);
                return true;
            }
            break;
        case 36:
            if (playerData.farmerData.get_dayHarvest(farmerData_1.CROPS.torchflower) >= 64) {
                playerData.farmerData.quest.add("torchflower");
                playerData.add_experience(player, PlayerData_1.ACTIVE.FARMER, 500);
                return true;
            }
            break;
    }
    return false;
}
function setItems(items) {
    for (let i = 0; i < 54; i++)
        items[i] = __1.ladder;
    const wheat_seeds = inventory_1.ItemStack.constructWith("minecraft:wheat_seeds");
    wheat_seeds.setCustomName("§l밀 씨앗");
    wheat_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
    items[0] = wheat_seeds;
    const beetroot_seeds = inventory_1.ItemStack.constructWith("minecraft:beetroot_seeds");
    beetroot_seeds.setCustomName("§l비트 씨앗");
    beetroot_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
    items[9] = beetroot_seeds;
    const melon_seeds = inventory_1.ItemStack.constructWith("minecraft:melon_seeds");
    melon_seeds.setCustomName("§l수박 씨앗");
    melon_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
    items[18] = melon_seeds;
    const pumpkin_seeds = inventory_1.ItemStack.constructWith("minecraft:pumpkin_seeds");
    pumpkin_seeds.setCustomName("§l호박 씨앗");
    pumpkin_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
    items[27] = pumpkin_seeds;
    const torchflower_seeds = inventory_1.ItemStack.constructWith("minecraft:torchflower_seeds");
    torchflower_seeds.setCustomName("§l횃불꽃 씨앗");
    torchflower_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
    items[36] = torchflower_seeds;
    const wheat = inventory_1.ItemStack.constructWith("minecraft:wheat");
    wheat.setCustomName("§l밀");
    wheat.setCustomLore(["§b구매: §c구매불가", "§a판매: §f100원"]);
    items[1] = wheat;
    const beetroot = inventory_1.ItemStack.constructWith("minecraft:beetroot");
    beetroot.setCustomName("§l비트");
    beetroot.setCustomLore(["§b구매: §c구매불가", "§a판매: §f100원"]);
    items[10] = beetroot;
    const melon_block = inventory_1.ItemStack.constructWith("minecraft:melon_block");
    melon_block.setCustomName("§l수박");
    melon_block.setCustomLore(["§b구매: §c구매불가", "§a판매: §f80원"]);
    items[19] = melon_block;
    const pumpkin = inventory_1.ItemStack.constructWith("minecraft:pumpkin");
    pumpkin.setCustomName("§l호박");
    pumpkin.setCustomLore(["§b구매: §c구매불가", "§a판매: §f80원"]);
    items[28] = pumpkin;
    const torchflower = inventory_1.ItemStack.constructWith("minecraft:torchflower");
    torchflower.setCustomName("§l횃불꽃");
    torchflower.setCustomLore(["§b구매: §c구매불가", "§a판매: §f100원"]);
    items[37] = torchflower;
    const potato = inventory_1.ItemStack.constructWith("minecraft:potato");
    potato.setCustomName("§l감자");
    potato.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
    items[3] = potato;
    const poisonous_potato = inventory_1.ItemStack.constructWith("minecraft:poisonous_potato");
    poisonous_potato.setCustomName("§l독감자");
    poisonous_potato.setCustomLore(["§b구매: §c구매불가", "§a판매: §f1000원"]);
    items[12] = poisonous_potato;
    const cocoa_beans = inventory_1.ItemStack.constructWith("minecraft:cocoa_beans");
    cocoa_beans.setCustomName("§l코코아");
    cocoa_beans.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
    items[21] = cocoa_beans;
    const carrot = inventory_1.ItemStack.constructWith("minecraft:carrot");
    carrot.setCustomName("§l당근");
    carrot.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
    items[30] = carrot;
    const nether_wart = inventory_1.ItemStack.constructWith("minecraft:nether_wart");
    nether_wart.setCustomName("§l네더와트");
    nether_wart.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
    items[39] = nether_wart;
    const sweet_berries = inventory_1.ItemStack.constructWith("minecraft:sweet_berries");
    sweet_berries.setCustomName("§l달콤한 열매");
    sweet_berries.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
    items[5] = sweet_berries;
    const bamboo = inventory_1.ItemStack.constructWith("minecraft:bamboo");
    bamboo.setCustomName("§l대나무");
    bamboo.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
    items[14] = bamboo;
    const sugar_cane = inventory_1.ItemStack.constructWith("minecraft:sugar_cane");
    sugar_cane.setCustomName("§l사탕수수");
    sugar_cane.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
    items[23] = sugar_cane;
    const chorus_flower = inventory_1.ItemStack.constructWith("minecraft:chorus_flower");
    chorus_flower.setCustomName("§l코러스 꽃");
    chorus_flower.setCustomLore(["§b구매: §f200원", "§a판매: §c판매불가"]);
    items[32] = chorus_flower;
    const chorus_fruit = inventory_1.ItemStack.constructWith("minecraft:chorus_fruit");
    chorus_fruit.setCustomName("§l코러스 열매");
    chorus_fruit.setCustomLore(["§b구매: §c구매불가", "§a판매: §f10원"]);
    items[41] = chorus_fruit;
    const vine = inventory_1.ItemStack.constructWith("minecraft:vine");
    vine.setCustomName("§l덩굴");
    vine.setCustomLore(["§b구매: §f200원", "§a판매: §f30원"]);
    items[7] = vine;
    const weeping_vines = inventory_1.ItemStack.constructWith("minecraft:weeping_vines");
    weeping_vines.setCustomName("§l흐느끼는 덩굴");
    weeping_vines.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
    items[16] = weeping_vines;
    const twisting_vines = inventory_1.ItemStack.constructWith("minecraft:twisting_vines");
    twisting_vines.setCustomName("§l뒤틀린 덩굴");
    twisting_vines.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
    items[25] = twisting_vines;
    // const sweet_berries = ItemStack.constructWith("minecraft:sweet_berries");
    // sweet_berries.setCustomName("§l대나무");
    // sweet_berries.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);//아직없는듯 ( glow_berries)
    items[34] = sweet_berries;
    const kelp = inventory_1.ItemStack.constructWith("minecraft:kelp");
    kelp.setCustomName("§l다시마");
    kelp.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
    items[43] = kelp;
    items[53] = __1.next;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBdUQ7QUFDdkQsa0RBQTREO0FBQzVELHNDQUFvQztBQUNwQyxrREFBd0Q7QUFDeEQsOENBQXVIO0FBQ3ZILDhEQUE0RDtBQUM1RCwyQ0FBc0U7QUFDdEUsd0NBQXFDO0FBRXJDLDBCQUEwQztBQUMxQywrREFBd0U7QUFDeEUsd0NBQTBFO0FBQzFFLDhDQUEwRDtBQUUxRCxnREFBbUQ7QUFFbkQsNENBQThDO0FBRzlDLHFEQUFxRDtBQUNyRCwwRUFBa0U7QUFFbEUsTUFBYSxNQUFPLFNBQVEsZUFBTTtJQUtoQyxlQUFlO0lBQ2YsWUFBWSxNQUFvQixFQUFZLElBQVk7UUFDdEQsTUFBTSxXQUFXLEdBQUcsSUFBSSw0QkFBYSxFQUFFLENBQUM7UUFDeEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUZlLFNBQUksR0FBSixJQUFJLENBQVE7UUFMaEQsV0FBTSxHQUFtQixFQUFFLENBQUMsQ0FBQyxJQUFJO1FBQ2pDLFdBQU0sR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUNqQyxpQkFBWSxHQUFtQixFQUFFLENBQUMsQ0FBQyxJQUFJO1FBQ3ZDLFdBQU0sR0FBbUIsRUFBRSxDQUFDLENBQUMsSUFBSTtRQUt2QyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0QixjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUN6RCxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUUs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