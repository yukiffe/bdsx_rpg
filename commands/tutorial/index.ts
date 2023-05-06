import { DimensionId } from "bdsx/bds/actor";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { ServerPlayer } from "bdsx/bds/player";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { map_playerData } from "../../utils/classes/PlayerData";
import { spawn } from "../spawn";

export class Tutorial {
  constructor() {
    //표지판 클릭 감지용
    events.packetBefore(MinecraftPacketIds.InventoryTransaction).on((pk, ni) => {
      const transaction = pk.transaction;
      if (transaction === null) return;
      const block_pos = transaction.pos;
      const player = ni.getActor();
      if (!player || !block_pos) return;
      this.teleport(player, block_pos);
    });
    //블럭(표지판) 클릭 감지용
    //모바일 유저 전용
    events.attackBlock.on((ev) => {
      const block_pos = ev.blockPos;
      const player = ev.player;
      if (!player) return;
      this.teleport(player, block_pos);
    });
  }
  // /튜토리얼 명령어시 아래코드
  public main(player: ServerPlayer) {
    player.teleport(Vec3.create(-1000, 0, 0), DimensionId.Overworld, Vec3.create(-999, 0, 0));
  }

  //아래는 표지판 클릭시 teleport기능
  public teleport(player: ServerPlayer, block: BlockPos) {
    const blockStr = `@${block.x}@@${block.y}@@${block.z}@`;
    const blockPos = Vec3.create(block);
    const dimension = DimensionId.Overworld;
    blockPos.x += 0.5;
    blockPos.y -= 0.5;
    blockPos.z += 0.5;
    const viewPos = Vec3.create(blockPos);
    switch (blockStr) {
      case "@-999@@1@@0@":
      case "@-995@@1@@0@":
      case "@-991@@1@@0@":
        blockPos.x += 2;
        viewPos.x += 3;
        player.teleport(blockPos, dimension, viewPos);
        break;
      case "@-997@@1@@0@":
      case "@-993@@1@@0@":
      case "@-989@@1@@0@":
        blockPos.x -= 2;
        viewPos.x -= 3;
        player.teleport(blockPos, dimension, viewPos);
        break;
      case "@-987@@1@@0@":
        const playerData = map_playerData.get(player.getXuid())!;
        if (playerData.tutorial === 0) playerData.tutorial = 1;
        map_playerData.set(player.getXuid(), playerData);
        spawn.teleport(player);
        break;
    }
  }
}
export const tutorial = new Tutorial();
