"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicItem = exports.BasicItem = void 0;
const PlayerData_1 = require("../../utils/classes/PlayerData");
const inventory_1 = require("bdsx/bds/inventory");
class BasicItem {
    constructor() {
        this.wooden_axe = inventory_1.ItemStack.constructWith("minecraft:wooden_axe");
        this.wooden_hoe = inventory_1.ItemStack.constructWith("minecraft:wooden_hoe");
        this.wooden_pickaxe = inventory_1.ItemStack.constructWith("minecraft:wooden_pickaxe");
        this.wooden_shovel = inventory_1.ItemStack.constructWith("minecraft:wooden_shovel");
        this.wooden_sword = inventory_1.ItemStack.constructWith("minecraft:wooden_sword");
        this.fishing_rod = inventory_1.ItemStack.constructWith("minecraft:fishing_rod");
        this.wheat_seeds = inventory_1.ItemStack.constructWith("minecraft:wheat_seeds", 16);
        this.cooked_beef = inventory_1.ItemStack.constructWith("minecraft:cooked_beef", 32);
    }
    give(player) {
        const playerData = PlayerData_1.map_playerData.get(player.getXuid());
        if (playerData.tutorial === 1) {
            playerData.tutorial = 2;
            player.addItem(this.wooden_axe.clone());
            player.addItem(this.wooden_hoe.clone());
            player.addItem(this.wooden_pickaxe.clone());
            player.addItem(this.wooden_shovel.clone());
            player.addItem(this.wooden_sword.clone());
            player.addItem(this.fishing_rod.clone());
            player.addItem(this.wheat_seeds.clone());
            player.addItem(this.cooked_beef.clone());
            player.sendInventory();
            player.sendMessage("§l§b기본템을 받았습니다.");
            player.sendMessage("§l§a도끼, 괭이, 곡괭이, 삽, 검, 낚싯대, 씨앗*16, 고기*32");
        }
        else if (playerData.tutorial === 0) {
            player.sendMessage(`§l§c튜토리얼을 완료해야 기본템을 받을 수 있습니다. §7/튜토리얼`);
        }
        else {
            player.sendMessage("§l§c기본템은 최초 1회만 받을 수 있습니다.");
        }
        PlayerData_1.map_playerData.set(player.getXuid(), playerData);
    }
}
exports.BasicItem = BasicItem;
exports.basicItem = new BasicItem();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrREFBZ0U7QUFDaEUsa0RBQStDO0FBRS9DLE1BQWEsU0FBUztJQVNwQjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBUyxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxhQUFhLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBUyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVMsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBUyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQ00sSUFBSSxDQUFDLE1BQW9CO1FBQzlCLE1BQU0sVUFBVSxHQUFHLDJCQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBRSxDQUFDO1FBQ3pELElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7WUFDN0IsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsV0FBVyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDaEU7YUFBTSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxXQUFXLENBQUMsd0NBQXdDLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsMkJBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDRjtBQXpDRCw4QkF5Q0M7QUFDWSxRQUFBLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDIn0=