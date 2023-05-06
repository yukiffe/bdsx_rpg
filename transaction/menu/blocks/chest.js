"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HSChest = void 0;
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const packets_1 = require("bdsx/bds/packets");
const hsblock_1 = require("../hsblock");
class HSChest {
    get blockYOffset() {
        return 3;
    }
    getContainerId(target) {
        return target.nextContainerCounter();
    }
    constructor() {
        this.type = hsblock_1.HSBlock.Type.DoubleChest;
        this.size = hsblock_1.HSBlock.TypeToSize[this.type];
        this.blockPos = new Map();
        this.originalBlockId = new Map();
        const block = block_1.Block.create("minecraft:chest");
        if (block == null)
            throw new Error("Block is invalid.");
        this.block = block;
    }
    place(target) {
        const blockPos = this.initPosition(target);
        const blockId = this.block.getRuntimeId();
        const orgBlkId = target.getRegion().getBlock(blockPos).getRuntimeId();
        this.setBlockId(target, orgBlkId);
        const pk = packets_1.UpdateBlockPacket.allocate();
        pk.destruct();
        hsblock_1.HSBlock.initUpdateBlockPacket(pk, blockPos, 0, blockId, packets_1.UpdateBlockPacket.Flags.NoGraphic);
        target.sendPacket(pk);
        pk.dispose();
    }
    destroy(target) {
        const blockPos = this.getPosition(target);
        const blockPkt = packets_1.UpdateBlockPacket.allocate();
        blockPkt.destruct();
        hsblock_1.HSBlock.initUpdateBlockPacket(blockPkt, blockPos, 0, this.getBlockId(target), packets_1.UpdateBlockPacket.Flags.NoGraphic);
        target.sendPacket(blockPkt);
        blockPkt.dispose();
        const region = target.getRegion();
        const blockEntity = region.getBlockEntity(blockPos);
        if (blockEntity) {
            blockEntity.setChanged();
            blockEntity.updateClientSide(target);
        }
    }
    getPosition(player) {
        return this.blockPos.get(player);
    }
    initPosition(player) {
        const blockPos = blockpos_1.BlockPos.create(0, 0, 0);
        blockPos.set(player.getFeetPos());
        blockPos.y += this.blockYOffset;
        if (blockPos.x < 0)
            blockPos.x--;
        if (blockPos.z < 0)
            blockPos.z--;
        this.blockPos.set(player, blockPos);
        return blockPos;
    }
    getBlockId(player) {
        return this.originalBlockId.get(player);
    }
    setBlockId(player, id) {
        this.originalBlockId.set(player, id);
    }
}
exports.HSChest = HSChest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBdUM7QUFDdkMsZ0RBQTZDO0FBQzdDLDhDQUFxRDtBQUVyRCx3Q0FBcUM7QUFDckMsTUFBYSxPQUFPO0lBSWxCLElBQUksWUFBWTtRQUNkLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFvQjtRQUNqQyxPQUFPLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFLRDtRQWJBLFNBQUksR0FBaUIsaUJBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzlDLFNBQUksR0FBaUIsaUJBQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBU3pDLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUN2QyxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBR3BELE1BQU0sS0FBSyxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM5QyxJQUFJLEtBQUssSUFBSSxJQUFJO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBb0I7UUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFB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