import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { InventoryContentPacket } from "bdsx/bds/packets";
import { events } from "bdsx/event";

require("./utils");

require("./motd");

require("./commands_remove");
require("./commands");

require("./manage");
require("./play");
require("./transaction");
require("./interval_chat");

let test = false;
events.packetBefore(MinecraftPacketIds.CommandRequest).on((pk, ni) => {
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
      case MinecraftPacketIds.PlayerAuthInput:
      case MinecraftPacketIds.ClientCacheBlobStatus:
      case MinecraftPacketIds.ClientCacheMissResponse:
      case MinecraftPacketIds.LevelChunk:
      case MinecraftPacketIds.MoveActorDelta:

      case MinecraftPacketIds.LevelSoundEvent:
      case MinecraftPacketIds.SetActorData:
      case MinecraftPacketIds.NetworkChunkPublisherUpdate:
      case MinecraftPacketIds.SetTime:
      case MinecraftPacketIds.UpdateAttributes:
      case MinecraftPacketIds.SetActorMotion:

      case MinecraftPacketIds.InventoryContent:
      case MinecraftPacketIds.PlayerHotbar:
      case MinecraftPacketIds.ActorEvent:
        continue;
    }
    events.packetAfter(i).on((pk: any, ni) => {
      if (test) console.log("RECV", pk, new Date());
    });
    events.packetSend(i).on((pk: any, ni) => {
      if (pk.getId() === MinecraftPacketIds.InventoryTransaction) {
        if (test) console.log("RECV", "Inv Tran", new Date());
        return;
      }
      if (test) console.log("SEND", pk.getName(), new Date());
    });
  }
  events.packetBefore(MinecraftPacketIds.ItemStackRequest).on((pk, ni) => {
    if (test) console.log("DROP", pk);
  });
}
