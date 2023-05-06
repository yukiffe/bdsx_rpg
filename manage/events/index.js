"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const database_1 = require("../../utils/database");
const path_1 = require("../../utils/path");
const farmerData_1 = require("../../utils/classes/PlayerData/farmerData");
const PlayerData_1 = require("../../utils/classes/PlayerData");
const blockpos_1 = require("bdsx/bds/blockpos");
const index_1 = require("./../../utils/classes/Level/index");
const woodcutterData_1 = require("../../utils/classes/PlayerData/woodcutterData");
const stockbreederData_1 = require("../../utils/classes/PlayerData/stockbreederData");
const fisherData_1 = require("../../utils/classes/PlayerData/fisherData");
const hunterData_1 = require("../../utils/classes/PlayerData/hunterData");
const index_2 = require("./../../commands/spawn/index");
event_1.events.playerJoin.on((ev) => {
    const pkt = packets_1.TextPacket.allocate();
    pkt.type = packets_1.TextPacket.Types.Chat;
    pkt.message = `§a[+] §e${ev.player.getName()}§f님이 서버에 접속하였습니다.`;
    for (const player of launcher_1.bedrockServer.level.getPlayers()) {
        player.sendNetworkPacket(pkt);
    }
    pkt.dispose();
});
event_1.events.playerLeft.on((ev) => {
    ev.skipMessage = true;
    const pkt = packets_1.TextPacket.allocate();
    pkt.type = packets_1.TextPacket.Types.Chat;
    pkt.message = `§c[-] §e${ev.player.getName()}§f님이 서버와의 연결을 끊었습니다.`;
    for (const player of launcher_1.bedrockServer.level.getPlayers()) {
        player.sendNetworkPacket(pkt);
    }
    pkt.dispose();
});
event_1.events.playerJoin.on((ev) => {
    const player = ev.player;
    if (!database_1.database.exist_file(path_1.path.DATABASE_PLAYER, file_name(player))) {
        const playerData = new PlayerData_1.PlayerData(player);
        database_1.database.upload(path_1.path.DATABASE_PLAYER, file_name(player), playerData);
        player.teleport(blockpos_1.Vec3.create(-1000, 0, 0));
        PlayerData_1.map_playerData.set(player.getXuid(), playerData);
    }
    const json = database_1.database.load(path_1.path.DATABASE_PLAYER, file_name(player));
    const playerData = convertToPlayerData(player, json);
    PlayerData_1.map_playerData.set(player.getXuid(), playerData);
});
//잠시만 비홣성화
event_1.events.networkDisconnected.on((ev) => {
    const player = ev.getActor();
    if (player === null)
        return;
    PlayerData_1.map_playerData.get(player.getXuid()).save();
    PlayerData_1.map_playerData.delete(player.getXuid());
});
const interval = setInterval(() => {
    PlayerData_1.map_playerData.forEach((value, key) => {
        value.save();
    });
}, 64000); //1분마다 모든 플레이어 데이터 저장(데이터저장 안되면 스킾됌)
//서버닫으면 전체 저장
event_1.events.serverClose.on(() => {
    clearInterval(interval);
    PlayerData_1.map_playerData.forEach((value, key) => {
        value.save();
    });
});
function file_name(player) {
    return `${player.getName()}_${player.getXuid()}.json`;
}
//아래코드 Chat GPT
function convertToPlayerData(player, json) {
    const farmerData = new farmerData_1.FarmerData(json._farmerData._map_dayHarvest, json._farmerData._map_totalHarvest, json._farmerData._date, json._farmerData._quest, json._farmerData._achievement, json._farmerData._perks, new index_1.DetailLevelData(json._farmerData._level._level, json._farmerData._level._experience, json._farmerData._level._sum_experience));
    const hunterData = new hunterData_1.HunterData(json._hunterData._map_dayHunting, json._hunterData._map_totalHunting, json._hunterData._date, json._hunterData._quest, json._hunterData._achievement, json._hunterData._perks, new index_1.DetailLevelData(json._hunterData._level._level, json._hunterData._level._experience, json._hunterData._level._sum_experience));
    const fisherData = new fisherData_1.FisherData(json._fisherData._map_dayFishing, json._fisherData._map_totalFishing, json._fisherData._date, json._fisherData._quest, json._fisherData.wheat_achievements, json._fisherData._perks, new index_1.DetailLevelData(json._fisherData._level._level, json._fisherData._level._experience, json._fisherData._level._sum_experience));
    const stockbreederData = new stockbreederData_1.StockbreederData(json._stockbreederData._map_dayStockbreeder, json._stockbreederData._map_totalStockbreeder, json._stockbreederData._date, json._stockbreederData._quest, json._stockbreederData._achievement, json._stockbreederData._perks, new index_1.DetailLevelData(json._stockbreederData._level._level, json._stockbreederData._level._experience, json._stockbreederData._level._sum_experience));
    const woodcutterData = new woodcutterData_1.WoodcutterData(json._woodcutterData._map_dayLogging, json._woodcutterData._map_totalLogging, json._woodcutterData._date, json._woodcutterData._quest, json._woodcutterData._achievement, json._woodcutterData._perks, new index_1.DetailLevelData(json._woodcutterData._level._level, json._woodcutterData._level._experience, json._woodcutterData._level._sum_experience));
    const generalLevelData = new index_1.GeneralLevelData(json._level._level, json._level._experience, json._level._sumExperience);
    const playerData = new PlayerData_1.PlayerData(player, json._tutorial, json._money, json._donate, json._banned, json._lisence, farmerData, hunterData, fisherData, stockbreederData, woodcutterData, generalLevelData);
    return playerData;
}
event_1.events.playerRespawn.on((ev) => {
    index_2.spawn.teleport(ev.player);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFtRTtBQUVuRSxzQ0FBb0M7QUFDcEMsNENBQThDO0FBRTlDLG1EQUFnRDtBQUNoRCwyQ0FBd0M7QUFFeEMsMEVBQThFO0FBQzlFLCtEQUE0RTtBQUM1RSxnREFBeUM7QUFFekMsNkRBQXNGO0FBQ3RGLGtGQUErRTtBQUMvRSxzRkFBbUY7QUFDbkYsMEVBQXVFO0FBQ3ZFLDBFQUF1RTtBQUN2RSx3REFBcUQ7QUFFckQsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtJQUMxQixNQUFNLEdBQUcsR0FBRyxvQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQztJQUNoRSxLQUFLLE1BQU0sTUFBTSxJQUFJLHdCQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ3JELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMvQjtJQUNELEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7SUFDMUIsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdEIsTUFBTSxHQUFHLEdBQUcsb0JBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxHQUFHLENBQUMsSUFBSSxHQUFHLG9CQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNqQyxHQUFHLENBQUMsT0FBTyxHQUFHLFdBQVcsRUFB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VSxHQUFHLElBQUksdUJBQVUsQ0FDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUN2QixJQUFJLHVCQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FDbEksQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUN2QixJQUFJLHVCQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FDbEksQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQ3ZCLElBQUksdUJBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUNsSSxDQUFDO0lBRUYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLG1DQUFnQixDQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLEVBQzNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFDNUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFDN0IsSUFBSSx1QkFBZSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQ3BKLENBQUM7SUFFRixNQUFNLGNBQWMsR0FBRyxJQUFJLCtCQUFjLENBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFDM0IsSUFBSSx1QkFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQzlJLENBQUM7SUFFRixNQUFNLGdCQUFnQixHQUFHLElBQUksd0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV2SCxNQUFNLFVBQVUsR0FBRyxJQUFJLHVCQUFVLENBQy9CLE1BQU0sRUFDTixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxRQUFRLEVBQ2IsVUFBVSxFQUNWLFVBQVUsRUFDVixVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxnQkFBZ0IsQ0FDakIsQ0FBQztJQUVGLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxjQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO0lBQzdCLGFBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDIn0=