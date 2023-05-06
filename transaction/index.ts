import { ActorType } from "bdsx/bds/actor";
import { ServerPlayer } from "bdsx/bds/player";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { Farmer } from "./farmer";
import { Item, ItemDescriptor, ItemStack } from "bdsx/bds/inventory";
import { form } from "blessed";
import { Form, FormButton, FormDropdown, FormInput, FormLabel, FormSlider, FormStepSlider, FormToggle } from "bdsx/bds/form";
import { BlackSmith } from "./blacksmith/index";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { Fisherman } from "./fisherman";
import { bedrockServer } from "bdsx/launcher";
import { Butcher } from "./butcher";
import { map_playerData } from "../utils/classes/PlayerData";
import { Librarian } from "./librarian";
import { WeaponSmith } from "./weaponsmith";
import { ArmorSmith } from "./armorsmith";
import { MinecraftPacketIds } from "bdsx/bds/packetids";

export const next = ItemStack.constructWith("element_10");
next.setCustomName("§l§aNext");
next.setCustomLore(["§l§f다음 페이지로 넘어갑니다."]);
export const before = ItemStack.constructWith("element_4");
before.setCustomName("§l§aBefore");
before.setCustomLore(["§l§f이전 페이지로 돌아갑니다."]);
export const ladder = ItemStack.constructWith("minecraft:ladder");
ladder.setCustomName("§l");

require("./farmer");
require("./blacksmith");
require("./fisherman");
require("./butcher");
require("./librarian");
require("./weaponsmith");
require("./armorsmith");

events.playerAttack.on((ev) => {
  const victim = ev.victim;
  if ((ev.player as ServerPlayer).getCarriedItem().getName() === "minecraft:compass") if (ev.player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
  if (victim.getEntityTypeId() === ActorType.VillagerV2) {
    villager(ev.player, victim.getNameTag());
    return CANCEL;
  }
});
events.playerInteract.on((ev) => {
  const victim = ev.victim;
  if ((ev.player as ServerPlayer).getCarriedItem().getName() === "minecraft:compass") if (ev.player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
  if (victim.getEntityTypeId() === ActorType.VillagerV2) {
    villager(ev.player, victim.getNameTag());
    return CANCEL;
  }
});

function villager(player: ServerPlayer, villagerName: string) {
  switch (villagerName) {
    case "§l§a농부§r":
      new Farmer(player, 1);
      break;
    case "§l§7도구 대장장이§r":
      new BlackSmith(player, 1);
      break;
    case "§l§b어부§r":
      new Fisherman(player, 1);
      break;
    case "§l§c도살업자§r":
      new Butcher(player, 1);
      break;
    case "§l§5사서§r":
      new Librarian(player, 1);
      break;
    case "§l§0무기 대장장이§r":
      new WeaponSmith(player, 1);
      break;
    case "§l§7갑옷 대장장이§r":
      new ArmorSmith(player, 1);
      break;
    default:
      player.sendMessage("등록안된주민=>관리자 문의");
  }
}

const interval = setInterval(() => {
  for (const player of bedrockServer.serverInstance.getPlayers()) {
    const playerData = map_playerData.get(player.getXuid());
    if (playerData === undefined) return;
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

events.serverClose.on(() => {
  clearInterval(interval);
});

events.packetBefore(MinecraftPacketIds.Text).on((pkt, ni) => {
  // const player = ni.getActor()!;
  // const name = player.getName();
  // ni.getActor()!.setName("");
  // pkt.message = `${pkt.message}`;
  // setTimeout(() => {
  //   ni.getActor()?.setName(name);
  // }, 1);
});
