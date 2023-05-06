"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorial = exports.Tutorial = void 0;
const actor_1 = require("bdsx/bds/actor");
const blockpos_1 = require("bdsx/bds/blockpos");
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
const PlayerData_1 = require("../../utils/classes/PlayerData");
const spawn_1 = require("../spawn");
class Tutorial {
    constructor() {
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.InventoryTransaction).on((pk, ni) => {
            const transaction = pk.transaction;
            if (transaction === null)
                return;
            const block_pos = transaction.pos;
            const player = ni.getActor();
            if (!player || !block_pos)
                return;
            this.teleport(player, block_pos);
        });
        event_1.events.attackBlock.on((ev) => {
            const block_pos = ev.blockPos;
            const player = ev.player;
            if (!player)
                return;
            this.teleport(player, block_pos);
        });
    }
    main(player) {
        player.teleport(blockpos_1.Vec3.create(-1000, 0, 0), actor_1.DimensionId.Overworld, blockpos_1.Vec3.create(-999, 0, 0));
    }
    teleport(player, block) {
        const blockStr = `@${block.x}@@${block.y}@@${block.z}@`;
        const blockPos = blockpos_1.Vec3.create(block);
        const dimension = actor_1.DimensionId.Overworld;
        blockPos.x += 0.5;
        blockPos.y -= 0.5;
        blockPos.z += 0.5;
        const viewPos = blockpos_1.Vec3.create(blockPos);
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
                const playerData = PlayerData_1.map_playerData.get(player.getXuid());
                if (playerData.tutorial === 0)
                    playerData.tutorial = 1;
                PlayerData_1.map_playerData.set(player.getXuid(), playerData);
                spawn_1.spawn.teleport(player);
                break;
        }
    }
}
exports.Tutorial = Tutorial;
exports.tutorial = new Tutorial();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBNkM7QUFDN0MsZ0RBQW1EO0FBQ25ELGtEQUF3RDtBQUd4RCxzQ0FBb0M7QUFDcEMsK0RBQWdFO0FBQ2hFLG9DQUFpQztBQUVqQyxNQUFhLFFBQVE7SUFDbkI7UUFDRSxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ3pFLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDbkMsSUFBSSxXQUFXLEtBQUssSUFBSTtnQkFBRSxPQUFPO1lBQ2pDLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7WUFDbEMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTO2dCQUFFLE9BQU87WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQzNCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDOUIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNNLElBQUksQ0FBQyxNQUFvQjtRQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDLGVBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLG1CQUFXLENBQUMsU0FBUyxFQUFFLGVBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUNNLFFBQVEsQ0FBQyxNQUFvQixFQUFFLEtBQWU7UUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3hELE1BQU0sUUFBUSxHQUFHLGVBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsTUFBTSxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxTQUFTLENBQUM7UUFDeEMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDbEIsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDbEIsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDbEIsTUFBTSxPQUFPLEdBQUcsZUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxRQUFRLFFBQVEsRUFBRTtZQUNoQixLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLGNBQWM7Z0JBQ2pCLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLE1BQU07WUFDUixLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLGNBQWM7Z0JBQ2pCLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLE1BQU07WUFDUixLQUFLLGNBQWM7Z0JBQ2pCLE1BQU0sVUFBVSxHQUFHLDJCQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBRSxDQUFDO2dCQUN6RCxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssQ0FBQztvQkFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDdkQsMkJBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNqRCxhQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QixNQUFNO1NBQ1Q7SUFDSCxDQUFDO0NBQ0Y7QUFuREQsNEJBbURDO0FBQ1ksUUFBQSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyJ9