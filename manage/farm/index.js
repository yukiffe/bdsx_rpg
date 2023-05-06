"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
//토지 보호
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.MovePlayer).on((pkt, ni) => {
    const player = ni.getActor();
    const dimension = player.getDimensionBlockSource();
    for (let i = 0; i < 4; i++) {
        for (let x = -1; x < 2; x++) {
            for (let z = -1; z < 2; z++) {
                const blockPos = blockpos_1.BlockPos.create(pkt.pos.x + x, pkt.pos.y - i, pkt.pos.z + z);
                const block = dimension.getBlock(blockPos);
                if (block.getName() === "minecraft:farmland") {
                    setTimeout(() => {
                        if (dimension.getBlock(blockPos).getName() === "minecraft:dirt") {
                            dimension.setBlock(blockPos, block_1.Block.create("minecraft:farmland"));
                        }
                    }, 100);
                }
            }
        }
    }
});
// import { ItemStack } from "bdsx/bds/inventory";
// import { events } from "bdsx/event";
// events.blockDestructionStart.on((ev) => {
//   if (ev.player.getDimensionBlockSource().getBlock(ev.blockPos).getDescriptionId() === "tile.composter") {
//     const item = ev.player.getCarriedItem();
//     if (item.getName() === "minecraft:wheat") {
//       if (item.amount >= 2) {
//         item.setAmount(item.amount - 1);
//         ev.player.setCarriedItem(item);
//       } else {
//         ev.player.setCarriedItem(ItemStack.constructWith("minecraft:air"));
//       }
//       const wheat_seeds = ItemStack.constructWith("minecraft:wheat_seeds");
//       wheat_seeds.amount = 3 + Math.floor(Math.random() * 3);
//       ev.player.addItem(wheat_seeds);
//       ev.player.sendInventory();
//     } else if (item.getName() === "minecraft:pumpkin_seeds") {
//       if (item.amount >= 2) {
//         item.setAmount(item.amount - 1);
//         ev.player.setCarriedItem(item);
//       } else {
//         ev.player.setCarriedItem(ItemStack.constructWith("minecraft:air"));
//       }
//       const wheat_seeds = ItemStack.constructWith("minecraft:pumpkin_seeds");
//       wheat_seeds.amount = 1 + Math.floor(Math.random() * 2);
//       ev.player.addItem(wheat_seeds);
//       ev.player.sendInventory();
//     } else if (item.getName() === "minecraft:melon_seeds") {
//       if (item.amount >= 2) {
//         item.setAmount(item.amount - 1);
//         ev.player.setCarriedItem(item);
//       } else {
//         ev.player.setCarriedItem(ItemStack.constructWith("minecraft:air"));
//       }
//       const wheat_seeds = ItemStack.constructWith("minecraft:melon_seeds");
//       wheat_seeds.amount = 1 + Math.floor(Math.random() * 2);
//       ev.player.addItem(wheat_seeds);
//       ev.player.sendInventory();
//     } else if (item.getName() === "minecraft:melon_block") {
//       if (item.amount >= 2) {
//         item.setAmount(item.amount - 1);
//         ev.player.setCarriedItem(item);
//       } else {
//         ev.player.setCarriedItem(ItemStack.constructWith("minecraft:air"));
//       }
//       const wheat_seeds = ItemStack.constructWith("minecraft:melon_block");
//       ev.player.addItem(wheat_seeds);
//       ev.player.sendInventory();
//     }
//   }
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxnREFBbUQ7QUFDbkQsa0RBQXdEO0FBQ3hELHNDQUFvQztBQUVwQyxPQUFPO0FBQ1AsY0FBTSxDQUFDLFlBQVksQ0FBQyw4QkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUU7SUFDaEUsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDO0lBQzlCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ25ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsTUFBTSxRQUFRLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUUsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssb0JBQW9CLEVBQUU7b0JBQzVDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ2QsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLGdCQUFnQixFQUFFOzRCQUMvRCxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxhQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFFLENBQUMsQ0FBQzt5QkFDbkU7b0JBQ0gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNUO2FBQ0Y7U0FDRjtLQUNGO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxrREFBa0Q7QUFDbEQsdUNBQXVDO0FBRXZDLDRDQUE0QztBQUM1Qyw2R0FBNkc7QUFDN0csK0NBQStDO0FBQy9DLGtEQUFrRDtBQUNsRCxnQ0FBZ0M7QUFDaEMsMkNBQTJDO0FBQzNDLDBDQUEwQztBQUMxQyxpQkFBaUI7QUFDakIsOEVBQThFO0FBQzlFLFVBQVU7QUFDViw4RUFBOEU7QUFDOUUsZ0VBQWdFO0FBQ2hFLHdDQUF3QztBQUN4QyxtQ0FBbUM7QUFDbkMsaUVBQWlFO0FBQ2pFLGdDQUFnQztBQUNoQywyQ0FBMkM7QUFDM0MsMENBQTBDO0FBQzFDLGlCQUFpQjtBQUNqQiw4RUFBOEU7QUFDOUUsVUFBVTtBQUNWLGdGQUFnRjtBQUNoRixnRUFBZ0U7QUFDaEUsd0NBQXdDO0FBQ3hDLG1DQUFtQztBQUNuQywrREFBK0Q7QUFDL0QsZ0NBQWdDO0FBQ2hDLDJDQUEyQztBQUMzQywwQ0FBMEM7QUFDMUMsaUJBQWlCO0FBQ2pCLDhFQUE4RTtBQUM5RSxVQUFVO0FBQ1YsOEVBQThFO0FBQzlFLGdFQUFnRTtBQUNoRSx3Q0FBd0M7QUFDeEMsbUNBQW1DO0FBQ25DLCtEQUErRDtBQUMvRCxnQ0FBZ0M7QUFDaEMsMkNBQTJDO0FBQzNDLDBDQUEwQztBQUMxQyxpQkFBaUI7QUFDakIsOEVBQThFO0FBQzlFLFVBQVU7QUFDViw4RUFBOEU7QUFDOUUsd0NBQXdDO0FBQ3hDLG1DQUFtQztBQUNuQyxRQUFRO0FBQ1IsTUFBTTtBQUNOLE1BQU0ifQ==