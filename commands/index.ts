import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { events } from "bdsx/event";
import { CANCEL } from "bdsx/common";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { spawn } from "./spawn";
import { reference } from "./reference";
import { tutorial } from "./tutorial";
import { basicItem } from "./basicItem";
import { gambling } from "./gambling";

//class위주로 동작, 각 파일마다 변수를 둠(개인적규칙)
require("./spawn");
require("./reference");
require("./help");
require("./basicItem");

//기본명령어도움창이 너무 더러워서 이걸로함
//굳이 만들기도 귀찮
events.packetBefore(MinecraftPacketIds.CommandRequest).on((pk, ni) => {
  const command_token = pk.command.split(" ");
  const player = ni.getActor();
  if (player === null) return;
  switch (command_token[0]) {
    case "/도움말":
      return;
    //편의성을 위해서 여러개 오타포함
    case "/spawn":
    case "/스폰":
    case "/넴주":
    case "/tmvhs":
    case "/lobby":
    case "/로비":
    case "/fhql":
      spawn.teleport(player);
      break;
    case "/추천인":
    case "/cncjsdls":
    case "/referee":
    case "/reference":
      if (command_token.length === 2) {
        reference.vote(player, command_token[1].replace('"', ""));
      } else {
        player.sendMessage(`§c/추천인 <닉네임>`);
      }
      break;
    case "/튜토리얼":
    case "/tutorial":
    case "/xbxhfldjf":
    case "/셔새갸미":
    case "/tuto":
    case "/셔새":
    case "/튜토":
    case "xbxh":
      tutorial.main(player);
      break;
    case "/기본템":
    case "/rlqhsxpa":
      basicItem.give(player);
      break;
    case "/도박":
    case "/ehqkr":
    case "/rpaqmffld":
    case "/gambling":
    case "/겜블링":
    case "/ㅎ므ㅠㅣㅑㅜㅎ":
      gambling.money(player);
      break;
    default:
      if (ni.getActor()!.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
      player.sendMessage(`§c존재하지 않는 명령어입니다. §8"/도움말"`);
  }
  if (ni.getActor()!.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
  return CANCEL;
});
