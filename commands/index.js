"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
const common_1 = require("bdsx/common");
const command_1 = require("bdsx/bds/command");
const spawn_1 = require("./spawn");
const reference_1 = require("./reference");
const tutorial_1 = require("./tutorial");
const basicItem_1 = require("./basicItem");
const gambling_1 = require("./gambling");
require("./spawn");
require("./reference");
require("./help");
require("./basicItem");
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.CommandRequest).on((pk, ni) => {
    const command_token = pk.command.split(" ");
    const player = ni.getActor();
    if (player === null)
        return;
    switch (command_token[0]) {
        case "/도움말":
            return;
        case "/spawn":
        case "/스폰":
        case "/넴주":
        case "/tmvhs":
        case "/lobby":
        case "/로비":
        case "/fhql":
            spawn_1.spawn.teleport(player);
            break;
        case "/추천인":
        case "/cncjsdls":
        case "/referee":
        case "/reference":
            if (command_token.length === 2) {
                reference_1.reference.vote(player, command_token[1].replace('"', ""));
            }
            else {
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
            tutorial_1.tutorial.main(player);
            break;
        case "/기본템":
        case "/rlqhsxpa":
            basicItem_1.basicItem.give(player);
            break;
        case "/도박":
        case "/ehqkr":
        case "/rpaqmffld":
        case "/gambling":
        case "/겜블링":
        case "/ㅎ므ㅠㅣㅑㅜㅎ":
            gambling_1.gambling.money(player);
            break;
        default:
            if (ni.getActor().getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
                return;
            player.sendMessage(`§c존재하지 않는 명령어입니다. §8"/도움말"`);
    }
    if (ni.getActor().getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
        return;
    return common_1.CANCEL;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUF3RDtBQUN4RCxzQ0FBb0M7QUFDcEMsd0NBQXFDO0FBQ3JDLDhDQUEwRDtBQUMxRCxtQ0FBZ0M7QUFDaEMsMkNBQXdDO0FBQ3hDLHlDQUFzQztBQUN0QywyQ0FBd0M7QUFDeEMseUNBQXNDO0FBRXRDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xCLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV2QixjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUNuRSxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsSUFBSSxNQUFNLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDNUIsUUFBUSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDeEIsS0FBSyxNQUFNO1lBQ1QsT0FBTztRQUNULEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssT0FBTztZQUNWLGFBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkIsTUFBTTtRQUNSLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxXQUFXLENBQUM7UUFDakIsS0FBSyxVQUFVLENBQUM7UUFDaEIsS0FBSyxZQUFZO1lBQ2YsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDOUIscUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNwQztZQUNELE1BQU07UUFDUixLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssV0FBVyxDQUFDO1FBQ2pCLEtBQUssWUFBWSxDQUFDO1FBQ2xCLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxNQUFNO1lBQ1QsbUJBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEIsTUFBTTtRQUNSLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxXQUFXO1lBQ2QscUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkIsTUFBTTtRQUNSLEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLFlBQVksQ0FBQztRQUNsQixLQUFLLFdBQVcsQ0FBQztRQUNqQixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssVUFBVTtZQUNiLG1CQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU07UUFDUjtZQUNFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDLHlCQUF5QixFQUFFLEtBQUssZ0NBQXNCLENBQUMsUUFBUTtnQkFBRSxPQUFPO1lBQzNGLE1BQU0sQ0FBQyxXQUFXLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUNwRDtJQUNELElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDLHlCQUF5QixFQUFFLEtBQUssZ0NBQXNCLENBQUMsUUFBUTtRQUFFLE9BQU87SUFDM0YsT0FBTyxlQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUMifQ==