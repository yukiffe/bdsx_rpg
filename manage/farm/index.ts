import { Block } from "bdsx/bds/block";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { events } from "bdsx/event";

//토지 보호 (CANCEL 안됌)
events.packetBefore(MinecraftPacketIds.MovePlayer).on((pkt, ni) => {
  const player = ni.getActor()!;
  const dimension = player.getDimensionBlockSource();
  for (let i = 0; i < 4; i++) {
    //높이 4칸(바로아래칸 인식 안될떄있음, 판정 넉넉하계)
    for (let x = -1; x < 2; x++) {
      for (let z = -1; z < 2; z++) {
        //모서리에서 뛰면 안되는경우있음
        const blockPos = BlockPos.create(pkt.pos.x + x, pkt.pos.y - i, pkt.pos.z + z);
        const block = dimension.getBlock(blockPos);
        if (block.getName() === "minecraft:farmland") {
          setTimeout(() => {
            if (dimension.getBlock(blockPos).getName() === "minecraft:dirt") {
              dimension.setBlock(blockPos, Block.create("minecraft:farmland")!);
            }
          }, 100);
        }
      }
    }
  }
});

//아래코드는 퇴비 터치할때 씨앗변경(안씀)

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
