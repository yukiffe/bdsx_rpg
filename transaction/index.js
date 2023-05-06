"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ladder = exports.before = exports.next = void 0;
const actor_1 = require("bdsx/bds/actor");
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
const farmer_1 = require("./farmer");
const inventory_1 = require("bdsx/bds/inventory");
const index_1 = require("./blacksmith/index");
const command_1 = require("bdsx/bds/command");
const fisherman_1 = require("./fisherman");
const launcher_1 = require("bdsx/launcher");
const butcher_1 = require("./butcher");
const PlayerData_1 = require("../utils/classes/PlayerData");
const librarian_1 = require("./librarian");
const weaponsmith_1 = require("./weaponsmith");
const armorsmith_1 = require("./armorsmith");
const packetids_1 = require("bdsx/bds/packetids");
exports.next = inventory_1.ItemStack.constructWith("element_10");
exports.next.setCustomName("§l§aNext");
exports.next.setCustomLore(["§l§f다음 페이지로 넘어갑니다."]);
exports.before = inventory_1.ItemStack.constructWith("element_4");
exports.before.setCustomName("§l§aBefore");
exports.before.setCustomLore(["§l§f이전 페이지로 돌아갑니다."]);
exports.ladder = inventory_1.ItemStack.constructWith("minecraft:ladder");
exports.ladder.setCustomName("§l");
require("./farmer");
require("./blacksmith");
require("./fisherman");
require("./butcher");
require("./librarian");
require("./weaponsmith");
require("./armorsmith");
event_1.events.playerAttack.on((ev) => {
    const victim = ev.victim;
    if (ev.player.getCarriedItem().getName() === "minecraft:compass")
        if (ev.player.getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
            return;
    if (victim.getEntityTypeId() === actor_1.ActorType.VillagerV2) {
        villager(ev.player, victim.getNameTag());
        return common_1.CANCEL;
    }
});
event_1.events.playerInteract.on((ev) => {
    const victim = ev.victim;
    if (ev.player.getCarriedItem().getName() === "minecraft:compass")
        if (ev.player.getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
            return;
    if (victim.getEntityTypeId() === actor_1.ActorType.VillagerV2) {
        villager(ev.player, victim.getNameTag());
        return common_1.CANCEL;
    }
});
function villager(player, villagerName) {
    switch (villagerName) {
        case "§l§a농부§r":
            new farmer_1.Farmer(player, 1);
            break;
        case "§l§7도구 대장장이§r":
            new index_1.BlackSmith(player, 1);
            break;
        case "§l§b어부§r":
            new fisherman_1.Fisherman(player, 1);
            break;
        case "§l§c도살업자§r":
            new butcher_1.Butcher(player, 1);
            break;
        case "§l§5사서§r":
            new librarian_1.Librarian(player, 1);
            break;
        case "§l§0무기 대장장이§r":
            new weaponsmith_1.WeaponSmith(player, 1);
            break;
        case "§l§7갑옷 대장장이§r":
            new armorsmith_1.ArmorSmith(player, 1);
            break;
        default:
            player.sendMessage("등록안된주민=>관리자 문의");
    }
}
const interval = setInterval(() => {
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        const playerData = PlayerData_1.map_playerData.get(player.getXuid());
        if (playerData === undefined)
            return;
        player.setFakeScoreboard(`§e${player.getName()}`, [
            `§0`,
            `§l레벨: ${playerData.level.level}§7lv`,
            `§l돈: ${Math.ceil(playerData.money)}원`,
            `§2`,
            `§l농사: ${playerData.farmerData.level.level}§7lv`,
            `§l낚시: ${playerData.fisherData.level.level}§7lv`,
            `§l사냥: ${playerData.hunterData.level.level}§7lv`,
            `§l벌목: ${playerData.woodcutterData.level.level}§7lv`,
            `§l목장: ${playerData.stockbreederData.level.level}§7lv`,
            `§8`,
        ]);
    }
}, 1000);
event_1.events.serverClose.on(() => {
    clearInterval(interval);
});
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on((pkt, ni) => {
    // const player = ni.getActor()!;
    // const name = player.getName();
    // ni.getActor()!.setName("");
    // pkt.message = `${pkt.message}`;
    // setTimeout(() => {
    //   ni.getActor()?.setName(name);
    // }, 1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBMkM7QUFFM0Msd0NBQXFDO0FBQ3JDLHNDQUFvQztBQUNwQyxxQ0FBa0M7QUFDbEMsa0RBQXFFO0FBR3JFLDhDQUFnRDtBQUNoRCw4Q0FBMEQ7QUFDMUQsMkNBQXdDO0FBQ3hDLDRDQUE4QztBQUM5Qyx1Q0FBb0M7QUFDcEMsNERBQTZEO0FBQzdELDJDQUF3QztBQUN4QywrQ0FBNEM7QUFDNUMsNkNBQTBDO0FBQzFDLGtEQUF3RDtBQUUzQyxRQUFBLElBQUksR0FBRyxxQkFBUyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxRCxZQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9CLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7QUFDOUIsUUFBQSxNQUFNLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0QsY0FBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuQyxjQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLFFBQUEsTUFBTSxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDbEUsY0FBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUUzQixPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3hCLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN2QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZCLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6QixPQUFPLENBQUMsY0FBYyxD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