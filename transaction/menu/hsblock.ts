import { Block } from "bdsx/bds/block";
import { BlockPos } from "bdsx/bds/blockpos";
import { ContainerId, ContainerType, ItemStack } from "bdsx/bds/inventory";
import { InventorySlotPacket, UpdateBlockPacket } from "bdsx/bds/packets";
import { ServerPlayer } from "bdsx/bds/player";
import { uint32_t, uint8_t } from "bdsx/nativetype";
import { procHacker } from "bdsx/prochacker";

export interface HSBlock {
  place(target: ServerPlayer): void;
  destroy(target: ServerPlayer): void;
  get blockYOffset(): number;

  block: Block;
  size: HSBlock.size;
  type: HSBlock.type;

  getContainerId?(target: ServerPlayer): ContainerId | number;
}

export namespace HSBlock {
  export type size = Size | number;
  export type type = Type | number;
  export enum Size {
    DoubleChest = 54,
  }
  export enum Type {
    DoubleChest,
  }
  export const TypeToSize: Record<type, number> = {
    0: Size.DoubleChest,
  } as const;
  export const TypeToContainerType: Record<type, number> = {
    0: ContainerType.Container,
  } as const;

  export function initUpdateBlockPacket(
    packet: UpdateBlockPacket,
    blockPos: BlockPos,
    layerId: UpdateBlockPacket.DataLayerIds,
    runtimeId: number,
    flag: UpdateBlockPacket.Flags
  ): void {
    UpdateBlockPacket$UpdateBlockPacket(packet, blockPos, layerId, runtimeId, flag);
  }
}
export const InventorySlotPacket$InventorySlotPacket = procHacker.js(
  "??0InventorySlotPacket@@QEAA@W4ContainerID@@IAEBVItemStack@@@Z",
  InventorySlotPacket,
  null,
  InventorySlotPacket,
  uint8_t,
  uint32_t,
  ItemStack
);

export const UpdateBlockPacket$UpdateBlockPacket = procHacker.js(
  "??0UpdateBlockPacket@@QEAA@AEBVBlockPos@@IIE@Z",
  UpdateBlockPacket,
  null,
  UpdateBlockPacket,
  BlockPos,
  uint32_t,
  uint32_t,
  uint8_t
);
