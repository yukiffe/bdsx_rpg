"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
require("./utils");
require("./motd");
require("./commands_remove");
require("./commands");
require("./manage");
require("./play");
require("./transaction");
require("./interval_chat");
let test = false;
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.CommandRequest).on((pk, ni) => {
    const command = pk.command;
    const command_token = command.split(" ");
    switch (command_token[0]) {
        case "/change":
            console.log(test);
            test = !test;
            break;
    }
    return;
});
{
    for (let i = 1; i < 164; i++) {
        switch (i) {
            //case MinecraftPacketIds.MovePlayer:
            case packetids_1.MinecraftPacketIds.PlayerAuthInput:
            case packetids_1.MinecraftPacketIds.ClientCacheBlobStatus:
            case packetids_1.MinecraftPacketIds.ClientCacheMissResponse:
            case packetids_1.MinecraftPacketIds.LevelChunk:
            case packetids_1.MinecraftPacketIds.MoveActorDelta:
            case packetids_1.MinecraftPacketIds.LevelSoundEvent:
            case packetids_1.MinecraftPacketIds.SetActorData:
            case packetids_1.MinecraftPacketIds.NetworkChunkPublisherUpdate:
            case packetids_1.MinecraftPacketIds.SetTime:
            case packetids_1.MinecraftPacketIds.UpdateAttributes:
            case packetids_1.MinecraftPacketIds.SetActorMotion:
            case packetids_1.MinecraftPacketIds.InventoryContent:
            case packetids_1.MinecraftPacketIds.PlayerHotbar:
            case packetids_1.MinecraftPacketIds.ActorEvent:
                continue;
        }
        event_1.events.packetAfter(i).on((pk, ni) => {
            if (test)
                console.log("RECV", pk, new Date());
        });
        event_1.events.packetSend(i).on((pk, ni) => {
            if (pk.getId() === packetids_1.MinecraftPacketIds.InventoryTransaction) {
                if (test)
                    console.log("RECV", "Inv Tran", new Date());
                return;
            }
            if (test)
                console.log("SEND", pk.getName(), new Date());
        });
    }
    event_1.events.packetBefore(packetids_1.MinecraftPacketIds.ItemStackRequest).on((pk, ni) => {
        if (test)
            console.log("DROP", pk);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUF3RDtBQUV4RCxzQ0FBb0M7QUFFcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5CLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVsQixPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUM3QixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFdEIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsQixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekIsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFM0IsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLGNBQU0sQ0FBQyxZQUFZLENBQUMsOEJBQWtCLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ25FLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDM0IsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxRQUFRLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN4QixLQUFLLFNBQVM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztZQUNiLE1BQU07S0FDVDtJQUNELE9BQU87QUFDVCxDQUFDLENBQUMsQ0FBQztBQUNIO0lBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixRQUFRLENBQUMsRUFBRTtZQUNULHFDQUFxQztZQUNyQyxLQUFLLDhCQUFrQixDQUFDLGVBQWUsQ0FBQztZQUN4QyxLQUFLLDhCQUFrQixDQUFDLHFCQUFxQixDQUFDO1lBQzlDLEtBQUssOEJBQWtCLENBQUMsdUJBQXVCLENBQUM7WUFDaEQsS0FBSyw4QkFBa0IsQ0FBQyxVQUFVLENBQUM7WUFDbkMsS0FBSyw4QkFBa0IsQ0FBQyxjQUFjLENBQUM7WUFFdkMsS0FBSyw4QkFBa0IsQ0FBQyxlQUFlLENBQUM7WUFDeEMsS0FBSyw4QkFBa0IsQ0FBQyxZQUFZLENBQUM7WUFDckMsS0FBSyw4QkFBa0IsQ0FBQywyQkFBMkIsQ0FBQztZQUNwRCxLQUFLLDhCQUFrQixDQUFDLE9BQU8sQ0FBQztZQUNoQyxLQUFLLDhCQUFrQixDQUFDLGdCQUFnQixDQUFDO1lBQ3pDLEtBQUssOEJBQWtCLENBQUMsY0FBYyxDQUFDO1lBRXZDLEtBQUssOEJBQWtCLENBQUMsZ0JBQWdCLENBQUM7WUFDekMsS0FBSyw4QkFBa0IsQ0FBQyxZQUFZLENBQUM7WUFDckMsS0FBSyw4QkFBa0IsQ0FBQyxVQUFVO2dCQUNoQyxTQUFTO1NBQ1o7UUFDRCxjQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN2QyxJQUFJLElBQUk7Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNILGNBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLDhCQUFrQixDQUFDLG9CQUFvQixFQUFFO2dCQUMxRCxJQUFJLElBQUk7b0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDdEQsT0FBTzthQUNSO1lBQ0QsSUFBSSxJQUFJO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELGNBQU0sQ0FBQyxZQUFZLENBQUMsOEJBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDckUsSUFBSSxJQUFJO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7Q0FDSiJ9