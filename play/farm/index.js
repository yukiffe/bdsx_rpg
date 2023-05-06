"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/bds/command");
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
const items_1 = require("../../utils/items");
const PlayerData_1 = require("../../utils/classes/PlayerData");
const inventory_1 = require("bdsx/bds/inventory");
event_1.events.blockDestroy.on((ev) => {
    const player = ev.player;
    const blockPos = ev.blockPos;
    const block = ev.blockSource.getBlock(blockPos);
    const itemName = block.getDescriptionId().replace("tile.", "");
    const data = block.data;
    switch (itemName) {
        case "wheat":
        case "beetroot":
        case "torchflower_crop":
        case "melon_stem":
        case "pumpkin_stem":
        case "pumpkin":
        case "melon_block":
        case "carrots":
        case "potatoes":
        case "cocoa":
        case "nether_wart":
        case "vine":
            harvest(player, blockPos, itemName, data);
            return;
        case "sweet_berry_bush":
        case "bamboo":
        case "sugar_cane":
        case "chorus_flower":
        case "chorus_plant":
        case "weeping_vines":
        case "twisting_vines":
        case "kelp":
        case "reeds":
            return;
    }
    if (player.getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
        return;
    return common_1.CANCEL;
});
function harvest(player, blockPos, itemName, data) {
    const blockSource = player.getRegion();
    const spawner = player.getLevel().getSpawner();
    blockSource.setBlock(blockPos, items_1.airBlock, 0b1000);
    switch (itemName) {
        case "wheat":
        case "beetroot":
        case "torchflower_crop":
            seeds_harvest(blockPos, itemName, data, blockSource, spawner);
            break;
        case "melon_stem":
        case "pumpkin_stem":
            stems_harvest(blockPos, itemName, data, blockSource, spawner);
            break;
        case "pumpkin":
        case "melon_block":
            block_harvest(blockPos, itemName, blockSource, spawner);
            break;
        case "carrots":
        case "potatoes":
            soil_harvest(blockPos, itemName, data, blockSource, spawner);
            break;
        case "cocoa":
            cocoa_harvest(blockPos, itemName, data, blockSource, spawner);
            break;
        case "nether_wart":
            netherWart_harvest(blockPos, itemName, data, blockSource, spawner);
            break;
        case "vine":
            //이것만 일반템으로
            break;
        case "sweet_berry_bush":
        case "bamboo":
        case "sugar_cane":
        case "chorus_flower":
        case "chorus_plant":
        case "weeping_vines":
        case "twisting_vines":
        case "kelp":
            //이것들은 따로 관리할 필요 x, 후원템으로관리
            //베리->사탕수수->대나무 순서
            break;
    }
    const playerData = PlayerData_1.map_playerData.get(player.getXuid());
    playerData.add_experience(player, PlayerData_1.ACTIVE.FARMER, 5);
    playerData.farmerData.harvest(itemName);
}
function seeds_harvest(blockPos, itemName, data, blockSource, spawner) {
    spawner.spawnItem(blockSource, inventory_1.ItemStack.constructWith(`minecraft:${itemName.replace("_crop", "")}${data === 7 ? "" : "_seeds"}`), blockpos_1.Vec3.create(blockPos), 1);
}
function stems_harvest(blockPos, itemName, data, blockSource, spawner) {
    spawner.spawnItem(blockSource, inventory_1.ItemStack.constructWith(`minecraft:${itemName.replace("stem", "seeds")}`, data === 7 || data === 23 || data === 31 || data === 39 || data === 47 ? 2 : 1), blockpos_1.Vec3.create(blockPos), 1);
}
function block_harvest(blockPos, itemName, blockSource, spawner) {
    spawner.spawnItem(blockSource, inventory_1.ItemStack.constructWith(`minecraft:${itemName}`), blockpos_1.Vec3.create(blockPos), 1);
}
function soil_harvest(blockPos, itemName, data, blockSource, spawner) {
    if (itemName === "potato") {
        spawner.spawnItem(blockSource, inventory_1.ItemStack.constructWith(`minecraft:poisonous_potato`, data === 7 ? 2 : 1), blockpos_1.Vec3.create(blockPos), 1);
        return;
    }
    spawner.spawnItem(blockSource, inventory_1.ItemStack.constructWith(`minecraft:${itemName}`, data === 7 ? 2 : 1), blockpos_1.Vec3.create(blockPos), 1);
}
function cocoa_harvest(blockPos, itemName, data, blockSource, spawner) {
    spawner.spawnItem(blockSource, inventory_1.ItemStack.constructWith(`minecraft:cocoa_beans`, data === 10 ? 2 : 1), blockpos_1.Vec3.create(blockPos), 1);
}
function netherWart_harvest(blockPos, itemName, data, blockSource, spawner) {
    spawner.spawnItem(blockSource, inventory_1.ItemStack.constructWith(`minecraft:${itemName}`, data === 3 ? 2 : 1), blockpos_1.Vec3.create(blockPos), 1);
}
event_1.events.blockPlace.on((ev) => {
    const player = ev.player;
    const blockPos = ev.blockPos;
    const itemName = ev.blockSource.getBlock(blockPos).getDescriptionId().replace("tile.", "");
    switch (itemName) {
        case "reeds":
        case "vine":
        case "weeping_vines":
        case "kelp":
        case "chorus_flower":
            break;
        default:
            if (player.getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
                return;
            return common_1.CANCEL;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFtRDtBQUNuRCw4Q0FBMEQ7QUFFMUQsd0NBQXFDO0FBQ3JDLHNDQUFvQztBQUNwQyw2Q0FBNkM7QUFDN0MsK0RBQXdFO0FBQ3hFLGtEQUErQztBQUsvQyxjQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO0lBQzVCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDekIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUM3QixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDeEIsUUFBUSxRQUFRLEVBQUU7UUFDaEIsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLFVBQVUsQ0FBQztRQUNoQixLQUFLLGtCQUFrQixDQUFDO1FBQ3hCLEtBQUssWUFBWSxDQUFDO1FBQ2xCLEtBQUssY0FBYyxDQUFDO1FBQ3BCLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxhQUFhLENBQUM7UUFDbkIsS0FBSyxTQUFTLENBQUM7UUFDZixLQUFLLFVBQVUsQ0FBQztRQUNoQixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssYUFBYSxDQUFDO1FBQ25CLEtBQUssTUFBTTtZQUNULE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQyxPQUFPO1FBQ1QsS0FBSyxrQkFBa0IsQ0FBQztRQUN4QixLQUFLLFFBQVEsQ0FBQztRQUNkLEtB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