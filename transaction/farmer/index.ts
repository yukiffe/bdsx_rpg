import { Player, ServerPlayer } from "bdsx/bds/player";
import { ContainerId, ItemStack } from "bdsx/bds/inventory";
import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { ItemStackRequestActionTransferBase, ItemStackRequestPacket, ItemStackResponsePacket } from "bdsx/bds/packets";
import { HSDoubleChest } from "../menu/blocks/double_chest";
import { ContainerItems, HSMenu, ResponseData } from "../menu/hsmenu";
import { CANCEL } from "bdsx/common";
import { random } from "colors";
import { before, ladder, next } from "..";
import { ACTIVE, map_playerData } from "../../utils/classes/PlayerData";
import { Form, FormDropdown, FormLabel, FormSlider } from "bdsx/bds/form";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { Block, BlockSource } from "bdsx/bds/block";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { Spawner } from "bdsx/bds/level";
import { bedrockServer } from "bdsx/launcher";
import { ItemActor } from "bdsx/bds/actor";
import { DimensionId } from "bdsx/bds/actor";
import { airBlock } from "./../../utils/items/index";
import { CROPS } from "../../utils/classes/PlayerData/farmerData";

export class Farmer extends HSMenu {
  private _items: ContainerItems = {}; //1p
  private _quest: ContainerItems = {}; //2p
  private _achievement: ContainerItems = {}; //3p
  private _perks: ContainerItems = {}; //특전

  constructor(player: ServerPlayer, protected page: number) {
    const doubleChest = new HSDoubleChest();
    super(player, doubleChest);
    setItems(this._items);
    setQuests(this._quest, player);
    setAchievements(this._achievement);
    setPerks(this._perks);

    events.packetBefore(MinecraftPacketIds.ItemStackRequest).on(
      (this.onItemStackRequest = (pk, ni) => {
        if (ni.equals(this.netId)) {
          const action = pk.getRequestBatch().data.get(0)?.getActions().get(0);
          if (this.TriggerActionType.has(action?.type) && action instanceof ItemStackRequestActionTransferBase) {
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
                    const change: boolean = quest(player, item, action.getSrc().slot);
                    if (change) this.setItem(slot, achievement_quest);
                    this.sendInventory();
                    return;
                  case 3:
                    //특전 페이지
                    return;
                }
            }
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
    this.setTitle("§l§e농사 상점");
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
      case 4:
        for (let i = 0; i < 54; i++) this.setItem(i, this._perks[i] as ItemStack);
        break;
      default:
        this.close();
    }
  }
}

export const achievement_quest = ItemStack.constructWith("minecraft:written_book");
achievement_quest.setCustomName("§l§a완료");

function setQuests(quests: ContainerItems, player: ServerPlayer) {
  for (let i = 0; i < 54; i++) quests[i] = ladder;

  const quest = map_playerData.get(player.getXuid())!.farmerData.quest;

  const dayQeust1 = ItemStack.constructWith("minecraft:book");
  dayQeust1.setCustomName("§l일일퀘스트 1");
  dayQeust1.setCustomLore(["§a밀 64개 캐기", "§6보상: 경험치 500xp"]);
  quests[0] = quest.has("wheat") ? achievement_quest : dayQeust1;
  const dayQeust2 = ItemStack.constructWith("minecraft:book");
  dayQeust2.setCustomName("§l일일퀘스트 2");
  dayQeust2.setCustomLore(["§a비트 64개 캐기", "§6보상: 경험치 500xp"]);
  quests[9] = quest.has("beetroot") ? achievement_quest : dayQeust2;
  const dayQeust3 = ItemStack.constructWith("minecraft:book");
  dayQeust3.setCustomName("§l일일퀘스트 3");
  dayQeust3.setCustomLore(["§a수박 64개 캐기", "§6보상: 경험치 500xp"]);
  quests[18] = quest.has("melon_block") ? achievement_quest : dayQeust3;
  const dayQeust4 = ItemStack.constructWith("minecraft:book");
  dayQeust4.setCustomName("§l일일퀘스트 4");
  dayQeust4.setCustomLore(["§a호박 64개 캐기", "§6보상: 경험치 500xp"]);
  quests[27] = quest.has("pumpkin") ? achievement_quest : dayQeust4;
  const dayQeust5 = ItemStack.constructWith("minecraft:book");
  dayQeust5.setCustomName("§l일일퀘스트 5");
  dayQeust5.setCustomLore(["§a횃불꽃 64개 캐기", "§6보상: 경험치 500xp"]);
  quests[36] = quest.has("torchflower") ? achievement_quest : dayQeust5;

  quests[45] = before;
  quests[53] = next;
}

function setAchievements(achievements: ContainerItems) {
  for (let i = 0; i < 54; i++) achievements[i] = ladder;
  const wheat_achievements0 = ItemStack.constructWith("minecraft:book");
  wheat_achievements0.setCustomName("§l밀 농사꾼");
  wheat_achievements0.setCustomLore(["§a밀 64개 캐기", "§6보상: 밀 보너스+1"]);
  achievements[0] = wheat_achievements0;
  const wheat_achievements1 = ItemStack.constructWith("minecraft:book");
  wheat_achievements1.setCustomName("§l밀 농사꾼");
  wheat_achievements1.setCustomLore(["§a밀 4,096개 캐기", "§6보상: 밀 보너스+2"]);
  achievements[1] = wheat_achievements1;
  const wheat_achievements2 = ItemStack.constructWith("minecraft:book");
  wheat_achievements2.setCustomName("§l밀 농사꾼");
  wheat_achievements2.setCustomLore(["§a밀 262,144개 캐기", "§6보상: 밀 보너스+3"]);
  achievements[2] = wheat_achievements2;

  achievements[45] = before;
  achievements[53] = next;
}

function setPerks(perks: ContainerItems) {
  for (let i = 0; i < 54; i++) perks[i] = ladder;
  const reference_perks0 = ItemStack.constructWith("minecraft:book");
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

  perks[45] = before;
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

events.packetBefore(MinecraftPacketIds.PlayerAction).on((pkt, ni) => {
  const player = ni.getActor();
  if (player === null) return;
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
      if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
      const copyPos = BlockPos.construct(blockPos);
      bedrockServer.executeCommand(`structure save sign ${copyPos.x} ${copyPos.y} ${copyPos.z} ${copyPos.x} ${copyPos.y} ${copyPos.z} false memory`);
      player.getDimensionBlockSource().setBlock(blockPos, airBlock);
      setTimeout(() => {
        bedrockServer.executeCommand(`structure load sign ${copyPos.x} ${copyPos.y} ${copyPos.z}`);
      }, 1);
  }
});
//블럭등록
const frames = new Set<string>(); //아이템-포지션 순
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
    bedrockServer.executeCommand(value);
  });
}, 1000);
events.serverClose.on(() => {
  clearInterval(interval);
});
events.playerPickupItem.on((ev) => {
  if ((ev.itemActor as ItemActor).itemStack.getCustomName() === "§l§9모조품입니다.§r") {
    return CANCEL;
  }
});

//아래는 시세+이것저것 만드려다가 중간에 귀찮아져서 버림

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
events.playerAttack.on((ev) => {
  console.log("");
  const target = ev.victim;
  const player = ev.player;
  if (target instanceof ServerPlayer) {
    const doubleChest = new HSDoubleChest();
    const menu = new HSMenu(player, doubleChest);
    menu.open();
    menu.setTitle(`§e${target.getName()}§f's 프로필`);
    menu.setItem(0, ItemStack.constructWith("minecraft:leather_helmet"));
    const stone = ItemStack.constructWith("minecraft:stone");
    stone.setCustomName("친구 추가");
    menu.setItem(1, stone);
  }
});
////여까지, 만들다말음

function buy_sell(player: ServerPlayer, item: ItemStack) {
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
}

function quest(player: ServerPlayer, item: ItemStack, slot: number) {
  if (item == achievement_quest) return false;
  const playerData = map_playerData.get(player.getXuid())!;
  switch (slot) {
    case 0:
      if (playerData.farmerData.get_dayHarvest(CROPS.wheat) >= 64) {
        playerData.farmerData.quest.add("wheat");
        playerData.add_experience(player, ACTIVE.FARMER, 500);
        return true;
      }
      break;
    case 9:
      if (playerData.farmerData.get_dayHarvest(CROPS.beetroot) >= 64) {
        playerData.farmerData.quest.add("beetroot");
        playerData.add_experience(player, ACTIVE.FARMER, 500);
        return true;
      }
      break;
    case 18:
      if (playerData.farmerData.get_dayHarvest(CROPS.melon_block) >= 64) {
        playerData.farmerData.quest.add("melon_block");
        playerData.add_experience(player, ACTIVE.FARMER, 500);
        return true;
      }
      break;
    case 27:
      if (playerData.farmerData.get_dayHarvest(CROPS.pumpkin) >= 64) {
        playerData.farmerData.quest.add("pumpkin");
        playerData.add_experience(player, ACTIVE.FARMER, 500);
        return true;
      }
      break;
    case 36:
      if (playerData.farmerData.get_dayHarvest(CROPS.torchflower) >= 64) {
        playerData.farmerData.quest.add("torchflower");
        playerData.add_experience(player, ACTIVE.FARMER, 500);
        return true;
      }
      break;
  }
  return false;
}

function setItems(items: ContainerItems) {
  for (let i = 0; i < 54; i++) items[i] = ladder;

  const wheat_seeds = ItemStack.constructWith("minecraft:wheat_seeds");
  wheat_seeds.setCustomName("§l밀 씨앗");
  wheat_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
  items[0] = wheat_seeds;
  const beetroot_seeds = ItemStack.constructWith("minecraft:beetroot_seeds");
  beetroot_seeds.setCustomName("§l비트 씨앗");
  beetroot_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
  items[9] = beetroot_seeds;
  const melon_seeds = ItemStack.constructWith("minecraft:melon_seeds");
  melon_seeds.setCustomName("§l수박 씨앗");
  melon_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
  items[18] = melon_seeds;
  const pumpkin_seeds = ItemStack.constructWith("minecraft:pumpkin_seeds");
  pumpkin_seeds.setCustomName("§l호박 씨앗");
  pumpkin_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
  items[27] = pumpkin_seeds;
  const torchflower_seeds = ItemStack.constructWith("minecraft:torchflower_seeds");
  torchflower_seeds.setCustomName("§l횃불꽃 씨앗");
  torchflower_seeds.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);
  items[36] = torchflower_seeds;

  const wheat = ItemStack.constructWith("minecraft:wheat");
  wheat.setCustomName("§l밀");
  wheat.setCustomLore(["§b구매: §c구매불가", "§a판매: §f100원"]);
  items[1] = wheat;
  const beetroot = ItemStack.constructWith("minecraft:beetroot");
  beetroot.setCustomName("§l비트");
  beetroot.setCustomLore(["§b구매: §c구매불가", "§a판매: §f100원"]);
  items[10] = beetroot;
  const melon_block = ItemStack.constructWith("minecraft:melon_block");
  melon_block.setCustomName("§l수박");
  melon_block.setCustomLore(["§b구매: §c구매불가", "§a판매: §f80원"]);
  items[19] = melon_block;
  const pumpkin = ItemStack.constructWith("minecraft:pumpkin");
  pumpkin.setCustomName("§l호박");
  pumpkin.setCustomLore(["§b구매: §c구매불가", "§a판매: §f80원"]);
  items[28] = pumpkin;
  const torchflower = ItemStack.constructWith("minecraft:torchflower");
  torchflower.setCustomName("§l횃불꽃");
  torchflower.setCustomLore(["§b구매: §c구매불가", "§a판매: §f100원"]);
  items[37] = torchflower;

  const potato = ItemStack.constructWith("minecraft:potato");
  potato.setCustomName("§l감자");
  potato.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
  items[3] = potato;
  const poisonous_potato = ItemStack.constructWith("minecraft:poisonous_potato");
  poisonous_potato.setCustomName("§l독감자");
  poisonous_potato.setCustomLore(["§b구매: §c구매불가", "§a판매: §f1000원"]);
  items[12] = poisonous_potato;
  const cocoa_beans = ItemStack.constructWith("minecraft:cocoa_beans");
  cocoa_beans.setCustomName("§l코코아");
  cocoa_beans.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
  items[21] = cocoa_beans;
  const carrot = ItemStack.constructWith("minecraft:carrot");
  carrot.setCustomName("§l당근");
  carrot.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
  items[30] = carrot;
  const nether_wart = ItemStack.constructWith("minecraft:nether_wart");
  nether_wart.setCustomName("§l네더와트");
  nether_wart.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
  items[39] = nether_wart;

  const sweet_berries = ItemStack.constructWith("minecraft:sweet_berries");
  sweet_berries.setCustomName("§l달콤한 열매");
  sweet_berries.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
  items[5] = sweet_berries;
  const bamboo = ItemStack.constructWith("minecraft:bamboo");
  bamboo.setCustomName("§l대나무");
  bamboo.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
  items[14] = bamboo;
  const sugar_cane = ItemStack.constructWith("minecraft:sugar_cane");
  sugar_cane.setCustomName("§l사탕수수");
  sugar_cane.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
  items[23] = sugar_cane;
  const chorus_flower = ItemStack.constructWith("minecraft:chorus_flower");
  chorus_flower.setCustomName("§l코러스 꽃");
  chorus_flower.setCustomLore(["§b구매: §f200원", "§a판매: §c판매불가"]);
  items[32] = chorus_flower;
  const chorus_fruit = ItemStack.constructWith("minecraft:chorus_fruit");
  chorus_fruit.setCustomName("§l코러스 열매");
  chorus_fruit.setCustomLore(["§b구매: §c구매불가", "§a판매: §f10원"]);
  items[41] = chorus_fruit;

  const vine = ItemStack.constructWith("minecraft:vine");
  vine.setCustomName("§l덩굴");
  vine.setCustomLore(["§b구매: §f200원", "§a판매: §f30원"]);
  items[7] = vine;
  const weeping_vines = ItemStack.constructWith("minecraft:weeping_vines");
  weeping_vines.setCustomName("§l흐느끼는 덩굴");
  weeping_vines.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
  items[16] = weeping_vines;
  const twisting_vines = ItemStack.constructWith("minecraft:twisting_vines");
  twisting_vines.setCustomName("§l뒤틀린 덩굴");
  twisting_vines.setCustomLore(["§b구매: §f200원", "§a판매: §f10원"]);
  items[25] = twisting_vines;
  // const sweet_berries = ItemStack.constructWith("minecraft:sweet_berries");
  // sweet_berries.setCustomName("§l대나무");
  // sweet_berries.setCustomLore(["§b구매: §f20원", "§a판매: §f10원"]);//아직없는듯 ( glow_berries)
  items[34] = sweet_berries;
  const kelp = ItemStack.constructWith("minecraft:kelp");
  kelp.setCustomName("§l다시마");
  kelp.setCustomLore(["§b구매: §f200원", "§a판매: §f100원"]);
  items[43] = kelp;

  items[53] = next;
}
