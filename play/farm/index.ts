import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { ServerPlayer } from "bdsx/bds/player";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { airBlock } from "../../utils/items";
import { ACTIVE, map_playerData } from "../../utils/classes/PlayerData";
import { ItemStack } from "bdsx/bds/inventory";
import { CROPS } from "../../utils/classes/PlayerData/farmerData";
import { BlockSource } from "bdsx/bds/block";
import { Spawner } from "bdsx/bds/level";

//종류별,,
events.blockDestroy.on((ev) => {
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
  if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
  return CANCEL;
});

function harvest(player: ServerPlayer, blockPos: BlockPos, itemName: string, data: number) {
  const blockSource = player.getRegion();
  const spawner = player.getLevel().getSpawner();
  blockSource.setBlock(blockPos, airBlock, 0b1000);
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
  const playerData = map_playerData.get(player.getXuid())!;
  playerData.add_experience(player, ACTIVE.FARMER, 5);
  playerData.farmerData.harvest(itemName as CROPS);
}
function seeds_harvest(blockPos: BlockPos, itemName: string, data: number, blockSource: BlockSource, spawner: Spawner) {
  spawner.spawnItem(blockSource, ItemStack.constructWith(`minecraft:${itemName.replace("_crop", "")}${data === 7 ? "" : "_seeds"}`), Vec3.create(blockPos), 1);
}
function stems_harvest(blockPos: BlockPos, itemName: string, data: number, blockSource: BlockSource, spawner: Spawner) {
  spawner.spawnItem(
    blockSource,
    ItemStack.constructWith(`minecraft:${itemName.replace("stem", "seeds")}`, data === 7 || data === 23 || data === 31 || data === 39 || data === 47 ? 2 : 1),
    Vec3.create(blockPos),
    1
  );
}
function block_harvest(blockPos: BlockPos, itemName: string, blockSource: BlockSource, spawner: Spawner) {
  spawner.spawnItem(blockSource, ItemStack.constructWith(`minecraft:${itemName}`), Vec3.create(blockPos), 1);
}
function soil_harvest(blockPos: BlockPos, itemName: string, data: number, blockSource: BlockSource, spawner: Spawner) {
  if (itemName === "potato") {
    spawner.spawnItem(blockSource, ItemStack.constructWith(`minecraft:poisonous_potato`, data === 7 ? 2 : 1), Vec3.create(blockPos), 1);
    return;
  }
  spawner.spawnItem(blockSource, ItemStack.constructWith(`minecraft:${itemName}`, data === 7 ? 2 : 1), Vec3.create(blockPos), 1);
}
function cocoa_harvest(blockPos: BlockPos, itemName: string, data: number, blockSource: BlockSource, spawner: Spawner) {
  spawner.spawnItem(blockSource, ItemStack.constructWith(`minecraft:cocoa_beans`, data === 10 ? 2 : 1), Vec3.create(blockPos), 1);
}
function netherWart_harvest(blockPos: BlockPos, itemName: string, data: number, blockSource: BlockSource, spawner: Spawner) {
  spawner.spawnItem(blockSource, ItemStack.constructWith(`minecraft:${itemName}`, data === 3 ? 2 : 1), Vec3.create(blockPos), 1);
}

events.blockPlace.on((ev) => {
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
      if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
      return CANCEL;
  }
});
