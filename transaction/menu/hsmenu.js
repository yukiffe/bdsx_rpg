"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HSMenu = exports.ResponseData = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const inventory_1 = require("bdsx/bds/inventory");
const nbt_1 = require("bdsx/bds/nbt");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
const hsblock_1 = require("./hsblock");
class ResponseData {
    isFromMenu() {
        return this.slotInfo.openContainerNetId === 7;
    }
}
exports.ResponseData = ResponseData;
class HSMenu {
    static initInventorySlotPacket(packet, containerId, slot, ItemStack) {
        (0, hsblock_1.InventorySlotPacket$InventorySlotPacket)(packet, containerId, slot, ItemStack);
    }
    assertValidSize(slot) {
        if (slot !== (slot | 0))
            throw Error("slot number must be an integer.");
        if (slot > this.size)
            throw Error("slot number must be less than or equal to the size of the menu.");
    }
    assertMenuNotOpen() {
        if (!this.hasOpen)
            throw Error("Menu is not open for the player.");
    }
    assertDefault() {
        this.assertMenuNotOpen();
    }
    /**
     *
     * @param slot slot n umber
     */
    setItem(slot, item) {
        this.assertValidSize(slot);
        this.slots[slot] = item.clone();
    }
    /**
     *
     * @param slot slot n umber
     * @returns DO NOT DESTRUCT. THEY MUST BE DESTRUCTED BY LIBRARY.
     */
    getItem(slot) {
        this.assertDefault();
        this.assertValidSize(slot);
        return this._extractItem(this.slots[slot]);
    }
    sendItem(slot, item) {
        this.assertDefault();
        this.assertValidSize(slot);
        this.setItem(slot, item);
        this.sendInventory();
    }
    constructor(player, block, slots = {}) {
        this.hasOpen = false;
        this.TriggerActionType = new Set([packets_1.ItemStackRequestActionType.Take, packets_1.ItemStackRequestActionType.Place, packets_1.ItemStackRequestActionType.Drop]);
        this.blockPos = blockpos_1.BlockPos.create(0, 0, 0);
        this.disabled = false;
        this.entity = player;
        this.netId = player.getNetworkIdentifier();
        this.block = block;
        this.size = this.block.size;
        this.blockPos.set(player.getFeetPos());
        this.blockPos.y += this.block.blockYOffset;
        if (this.blockPos.x < 0)
            this.blockPos.x--;
        if (this.blockPos.z < 0)
            this.blockPos.z--;
        this.slots = slots;
        if (this.block.getContainerId)
            this.mContainerId = this.block.getContainerId(this.entity);
        else
            this.mContainerId = this.entity.nextContainerCounter();
        for (const [slot, item] of Object.entries(this.slots)) {
            this.setItem(+slot, this._extractItem(item));
        }
        // events.packetBefore(MinecraftPacketIds.ItemStackRequest).on(
        //   (this.onItemStackRequest = (pk, ni) => {
        //     if (ni.equals(this.netId)) {
        //       const action = pk.getRequestBatch().data.get(0)?.getActions().get(0);
        //       if (this.TriggerActionType.has(action?.type) && action instanceof ItemStackRequestActionTransferBase) {
        //         const item = this.getItem(action.getSrc().slot).clone();
        //         if (item.getCustomName() === "§l") return;
        //         setTimeout(async () => {
        //           const playerData = map_playerData.get(player.getXuid())!;
        //           const answer = await Form.sendTo(player.getNetworkIdentifier(), {
        //             type: "custom_form",
        //             title: item.getCustomName(),
        //             content: [new FormDropdown("아이템 이름", ["구매", "판매"], 0), new FormSlider("개수", 1, 64, 1, 1), new FormLabel("가격")],
        //           });
        //           if (answer === null) return;
        //           const buy_per = item.getCustomLore()[0].replace("§b구매: §f", "").replace("원", "");
        //           const sell_per = item.getCustomLore()[1].replace("§a판매: §f", "").replace("원", "");
        //           switch (answer[0]) {
        //             case 0:
        //               if (buy_per === "§b구매: §a구매불가") {
        //                 player.sendMessage("§c구매 불가 물품입니다.");
        //                 return;
        //               }
        //               let price = +buy_per * answer[1];
        //               if (playerData.money >= price) {
        //                 playerData.money -= price;
        //                 player.addItem(ItemStack.constructWith(item.getName(), answer[1]));
        //                 map_playerData.set(player.getXuid(), playerData);
        //                 player.sendMessage("구매 완료");
        //               } else {
        //                 player.sendMessage("구매실패: 돈부족");
        //               }
        //               player.sendInventory();
        //               break;
        //             case 1:
        //               if (sell_per === "§b판매: §a판매불가") {
        //                 player.sendMessage("§c판매 불가 물품입니다.");
        //                 return;
        //               }
        //               price = +sell_per * answer[1];
        //               const valid_item = player.getCarriedItem();
        //               if (valid_item.getName() === item.getName()) {
        //                 if (valid_item.amount >= answer[1]) {
        //                   if (valid_item.amount === answer[1]) {
        //                     player.setCarriedItem(ItemStack.constructWith("minecraft:air"));
        //                   } else {
        //                     valid_item.setAmount(valid_item.amount - answer[1]);
        //                     player.setCarriedItem(valid_item);
        //                   }
        //                   playerData.money += price;
        //                   player.sendMessage("판매 완료");
        //                 } else {
        //                   player.sendMessage("판매 실패: 물품 부족");
        //                 }
        //               } else {
        //                 player.sendMessage("판매 실패: 팔 물건을 손에 들어주세요");
        //               }
        //               player.sendInventory();
        //               map_playerData.set(player.getXuid(), playerData);
        //               break;
        //           }
        //         }, 1000);
        //         this.close();
        //       }
        //     }
        //   })
        // );
        // events.packetBefore(MinecraftPacketIds.ContainerClose).on(
        //   (this.onContainerClose = (pk, ni) => {
        //     if (ni.equals(this.netId) && !this.isDisabled()) this.close();
        //   })
        // );
        // events.playerLeft.on(
        //   (this.onDisconnect = (event) => {
        //     if (event.player.getNetworkIdentifier().equals(this.netId)) this.destructUI();
        //   })
        // );
    }
    openChest() {
        var _a;
        if (this.hasOpen) {
            throw Error("Already Opened");
        }
        this.hasOpen = true;
        const pk = packets_1.ContainerOpenPacket.allocate();
        pk.containerId = this.mContainerId;
        pk.type = (_a = hsblock_1.HSBlock.TypeToContainerType[this.block.type]) !== null && _a !== void 0 ? _a : inventory_1.ContainerType.Container;
        pk.pos.set(this.blockPos);
        this.entity.sendPacket(pk);
        pk.dispose();
    }
    placeChest() {
        this.block.place(this.entity);
    }
    destroyChest() {
        this.assertDefault();
        this.block.destroy(this.entity);
    }
    destructUI() {
        this.assertDefault();
        for (const [slot, item] of Object.entries(this.slots)) {
            this._destructItem(item);
        }
        this.destroyChest();
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.ItemStackRequest).remove(this.onItemStackRequest);
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.ContainerClose).remove(this.onContainerClose);
        event_1.events.playerLeft.remove(this.onDisconnect);
    }
    open(delay = 50) {
        this.placeChest();
        setTimeout(() => {
            this.openChest();
            this.sendInventory();
        }, delay);
    }
    close() {
        this.assertDefault();
        this.destructUI();
        this.disable();
    }
    sendInventory() {
        this.assertDefault();
        for (const [_slot, _item] of Object.entries(this.slots)) {
            const slot = +_slot;
            const item = this._extractItem(_item);
            const fromSlot = this._extractItem(this.slots[slot]);
            if (!fromSlot.sameItem(item))
                fromSlot.destruct();
            const pk = new packets_1.InventorySlotPacket(true);
            HSMenu.initInventorySlotPacket(pk, this.mContainerId, slot, item);
            this.entity.sendPacket(pk);
            pk.destruct();
        }
    }
    setTitle(title) {
        const pkt = packets_1.BlockActorDataPacket.allocate();
        pkt.pos.set(this.blockPos);
        pkt.data.setAllocated("CustomName", nbt_1.StringTag.allocateWith(title));
        this.entity.sendPacket(pkt);
        pkt.dispose();
    }
    get containerId() {
        return this.mContainerId;
    }
    static Closed() {
        // throw Error("the menu is closed already");
    }
    /**
     *
     * @returns returns false if the instance is disabled already
     */
    disable() {
        if (this.disabled) {
            return false;
        }
        // const properties: PropertyDescriptorMap = {};
        // for (const key of Object.getOwnPropertyNames(this)) {
        //   properties[key] = { get: HSMenu.Closed };
        // }
        // Object.defineProperties(this, properties);
        return (this.disabled = true);
    }
    _extractItem(instance) {
        return instance instanceof inventory_1.ItemStack ? instance : instance[0];
    }
    _destructItem(instance) {
        if (!this._shouldDestruct(instance)) {
            return;
        }
        if (instance instanceof inventory_1.ItemStack) {
            instance.destruct();
        }
        else {
            instance[0].destruct();
        }
    }
    _shouldDestruct(instance) {
        return instance instanceof inventory_1.ItemStack ? true : instance[1].destruct;
    }
    isDisabled() {
        return this.disabled;
    }
}
exports.HSMenu = HSMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNtZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHNtZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQUE2QztBQUM3QyxrREFBMkU7QUFDM0Usc0NBQXlDO0FBRXpDLGtEQUF3RDtBQUN4RCw4Q0FTMEI7QUFHMUIsc0NBQW9DO0FBRXBDLHVDQUE2RTtBQVU3RSxNQUFhLFlBQVk7SUFJdkIsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGO0FBUEQsb0NBT0M7QUFFRCxNQUFhLE1BQU07SUFDUCxNQUFNLENBQUMsdUJBQXVCLENBQUMsTUFBMkIsRUFBRSxXQUFtQixFQUFFLElBQVksRUFBRSxTQUFvQjtRQUMzSCxJQUFBLGlEQUF1QyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFUyxlQUFlLENBQUMsSUFBWTtRQUNwQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJO1lBQUUsTUFBTSxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBQ1MsaUJBQWlCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUFFLE1BQU0sS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNTLGFBQWE7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNEOzs7T0FHRztJQUNILE9BQU8sQ0FBQyxJQUFZLEVBQUUsSUFBZTtRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxD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