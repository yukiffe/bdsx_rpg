"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlockPacket$UpdateBlockPacket = exports.InventorySlotPacket$InventorySlotPacket = exports.HSBlock = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const inventory_1 = require("bdsx/bds/inventory");
const packets_1 = require("bdsx/bds/packets");
const nativetype_1 = require("bdsx/nativetype");
const prochacker_1 = require("bdsx/prochacker");
var HSBlock;
(function (HSBlock) {
    let Size;
    (function (Size) {
        Size[Size["DoubleChest"] = 54] = "DoubleChest";
    })(Size = HSBlock.Size || (HSBlock.Size = {}));
    let Type;
    (function (Type) {
        Type[Type["DoubleChest"] = 0] = "DoubleChest";
    })(Type = HSBlock.Type || (HSBlock.Type = {}));
    HSBlock.TypeToSize = {
        0: Size.DoubleChest,
    };
    HSBlock.TypeToContainerType = {
        0: inventory_1.ContainerType.Container,
    };
    function initUpdateBlockPacket(packet, blockPos, layerId, runtimeId, flag) {
        (0, exports.UpdateBlockPacket$UpdateBlockPacket)(packet, blockPos, layerId, runtimeId, flag);
    }
    HSBlock.initUpdateBlockPacket = initUpdateBlockPacket;
})(HSBlock = exports.HSBlock || (exports.HSBlock = {}));
exports.InventorySlotPacket$InventorySlotPacket = prochacker_1.procHacker.js("??0InventorySlotPacket@@QEAA@W4ContainerID@@IAEBVItemStack@@@Z", packets_1.InventorySlotPacket, null, packets_1.InventorySlotPacket, nativetype_1.uint8_t, nativetype_1.uint32_t, inventory_1.ItemStack);
exports.UpdateBlockPacket$UpdateBlockPacket = prochacker_1.procHacker.js("??0UpdateBlockPacket@@QEAA@AEBVBlockPos@@IIE@Z", packets_1.UpdateBlockPacket, null, packets_1.UpdateBlockPacket, blockpos_1.BlockPos, nativetype_1.uint32_t, nativetype_1.uint32_t, nativetype_1.uint8_t);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhzYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQTZDO0FBQzdDLGtEQUEyRTtBQUMzRSw4Q0FBMEU7QUFFMUUsZ0RBQW9EO0FBQ3BELGdEQUE2QztBQWM3QyxJQUFpQixPQUFPLENBeUJ2QjtBQXpCRCxXQUFpQixPQUFPO0lBR3RCLElBQVksSUFFWDtJQUZELFdBQVksSUFBSTtRQUNkLDhDQUFnQixDQUFBO0lBQ2xCLENBQUMsRUFGVyxJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFFZjtJQUNELElBQVksSUFFWDtJQUZELFdBQVksSUFBSTtRQUNkLDZDQUFXLENBQUE7SUFDYixDQUFDLEVBRlcsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBRWY7SUFDWSxrQkFBVSxHQUF5QjtRQUM5QyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVc7S0FDWCxDQUFDO0lBQ0UsMkJBQW1CLEdBQXlCO1FBQ3ZELENBQUMsRUFBRSx5QkFBYSxDQUFDLFNBQVM7S0FDbEIsQ0FBQztJQUVYLFNBQWdCLHFCQUFxQixDQUNuQyxNQUF5QixFQUN6QixRQUFrQixFQUNsQixPQUF1QyxFQUN2QyxTQUFpQixFQUNqQixJQUE2QjtRQUU3QixJQUFBLDJDQUFtQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBUmUsNkJBQXFCLHdCQVFwQyxDQUFBO0FBQ0gsQ0FBQyxFQXpCZ0IsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBeUJ2QjtBQUNZLFFBQUEsdUNBQXVDLEdBQUcsdUJBQVUsQ0FBQyxFQUFFLENBQ2xFLGdFQUFnRSxFQUNoRSw2QkFBbUIsRUFDbkIsSUFBSSxFQUNKLDZCQUFtQixFQUNuQixvQkFBTyxFQUNQLHFCQUFRLEVBQ1IscUJBQVMsQ0FDVixDQUFDO0FBRVcsUUFBQSxtQ0FBbUMsR0FBRyx1QkFBVSxDQUFDLEVBQUUsQ0FDOUQsZ0RBQWdELEVBQ2hELDJCQUFpQixFQUNqQixJQUFJLEVBQ0osMkJBQWlCLEVBQ2pCLG1CQUFRLEVBQ1IscUJBQVEsRUFDUixxQkFBUSxFQUNSLG9CQUFPLENBQ1IsQ0FBQyJ9