import { ScriptMessagePacket, TextPacket } from "bdsx/bds/packets";
import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { message } from "blessed";
import { database } from "../../utils/database";
import { path } from "../../utils/path";
import { Server } from "http";
import { CROPS, FarmerData } from "../../utils/classes/PlayerData/farmerData";
import { PlayerData, map_playerData } from "../../utils/classes/PlayerData";
import { Vec3 } from "bdsx/bds/blockpos";
import { AttributeId } from "bdsx/bds/attribute";
import { DetailLevelData, GeneralLevelData } from "./../../utils/classes/Level/index";
import { WoodcutterData } from "../../utils/classes/PlayerData/woodcutterData";
import { StockbreederData } from "../../utils/classes/PlayerData/stockbreederData";
import { FisherData } from "../../utils/classes/PlayerData/fisherData";
import { HunterData } from "../../utils/classes/PlayerData/hunterData";
import { spawn } from "./../../commands/spawn/index";

events.playerJoin.on((ev) => {
  const pkt = TextPacket.allocate();
  pkt.type = TextPacket.Types.Chat;
  pkt.message = `§a[+] §e${ev.player.getName()}§f님이 서버에 접속하였습니다.`;
  for (const player of bedrockServer.level.getPlayers()) {
    player.sendNetworkPacket(pkt);
  }
  pkt.dispose();
});

events.playerLeft.on((ev) => {
  ev.skipMessage = true;
  const pkt = TextPacket.allocate();
  pkt.type = TextPacket.Types.Chat;
  pkt.message = `§c[-] §e${ev.player.getName()}§f님이 서버와의 연결을 끊었습니다.`;
  for (const player of bedrockServer.level.getPlayers()) {
    player.sendNetworkPacket(pkt);
  }
  pkt.dispose();
});

events.playerJoin.on((ev) => {
  const player = ev.player;
  if (!database.exist_file(path.DATABASE_PLAYER, file_name(player))) {
    const playerData = new PlayerData(player);
    database.upload(path.DATABASE_PLAYER, file_name(player), playerData);
    player.teleport(Vec3.create(-1000, 0, 0));
    map_playerData.set(player.getXuid(), playerData);
  }
  const json = database.load(path.DATABASE_PLAYER, file_name(player));
  const playerData = convertToPlayerData(player, json);
  map_playerData.set(player.getXuid(), playerData);
});
events.networkDisconnected.on((ev) => {
  const player = ev.getActor();
  if (player === null) return;
  map_playerData.get(player.getXuid())!.save();
  map_playerData.delete(player.getXuid());
});
const interval = setInterval(() => {
  map_playerData.forEach((value: PlayerData, key: string) => {
    value.save();
  });
}, 64000);
events.serverClose.on(() => {
  clearInterval(interval);
  map_playerData.forEach((value: PlayerData, key: string) => {
    value.save();
  });
});

function file_name(player: ServerPlayer) {
  return `${player.getName()}_${player.getXuid()}.json`;
}

//아래코드 Chat GPT
//플레이어 개인 데이터베이스
function convertToPlayerData(player: ServerPlayer, json: any) {
  const farmerData = new FarmerData(
    json._farmerData._map_dayHarvest,
    json._farmerData._map_totalHarvest,
    json._farmerData._date,
    json._farmerData._quest,
    json._farmerData._achievement,
    json._farmerData._perks,
    new DetailLevelData(json._farmerData._level._level, json._farmerData._level._experience, json._farmerData._level._sum_experience)
  );

  const hunterData = new HunterData(
    json._hunterData._map_dayHunting,
    json._hunterData._map_totalHunting,
    json._hunterData._date,
    json._hunterData._quest,
    json._hunterData._achievement,
    json._hunterData._perks,
    new DetailLevelData(json._hunterData._level._level, json._hunterData._level._experience, json._hunterData._level._sum_experience)
  );

  const fisherData = new FisherData(
    json._fisherData._map_dayFishing,
    json._fisherData._map_totalFishing,
    json._fisherData._date,
    json._fisherData._quest,
    json._fisherData.wheat_achievements,
    json._fisherData._perks,
    new DetailLevelData(json._fisherData._level._level, json._fisherData._level._experience, json._fisherData._level._sum_experience)
  );

  const stockbreederData = new StockbreederData(
    json._stockbreederData._map_dayStockbreeder,
    json._stockbreederData._map_totalStockbreeder,
    json._stockbreederData._date,
    json._stockbreederData._quest,
    json._stockbreederData._achievement,
    json._stockbreederData._perks,
    new DetailLevelData(json._stockbreederData._level._level, json._stockbreederData._level._experience, json._stockbreederData._level._sum_experience)
  );

  const woodcutterData = new WoodcutterData(
    json._woodcutterData._map_dayLogging,
    json._woodcutterData._map_totalLogging,
    json._woodcutterData._date,
    json._woodcutterData._quest,
    json._woodcutterData._achievement,
    json._woodcutterData._perks,
    new DetailLevelData(json._woodcutterData._level._level, json._woodcutterData._level._experience, json._woodcutterData._level._sum_experience)
  );

  const generalLevelData = new GeneralLevelData(json._level._level, json._level._experience, json._level._sumExperience);

  const playerData = new PlayerData(
    player,
    json._tutorial,
    json._money,
    json._donate,
    json._banned,
    json._lisence,
    farmerData,
    hunterData,
    fisherData,
    stockbreederData,
    woodcutterData,
    generalLevelData
  );

  return playerData;
}

events.playerRespawn.on((ev) => {
  spawn.teleport(ev.player);
});
