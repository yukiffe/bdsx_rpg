import { ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";

command.register("도움말", "§l§f서버 §b명령어 사용§f에 대한 튜토리얼을 제공합니다.").overload((parmas, origin, output) => {
  const player = origin.getEntity() as ServerPlayer;
  player.sendMessage("§8/기본템 §f- 기본템 ( 튜토리얼 완료 보상 )");
  player.sendMessage("§8/튜토리얼 §f- 튜토리얼 및 서버 설명");
  player.sendMessage("§8/스폰 §f- 스폰 이동");
  player.sendMessage("§8/도박 §f- 현재소지금의 10%의 금액으로 랜덤 도박");
  player.sendMessage("추가중");
}, {});
