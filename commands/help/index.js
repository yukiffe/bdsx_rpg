"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
command_1.command.register("도움말", "§l§f서버 §b명령어 사용§f에 대한 튜토리얼을 제공합니다.").overload((parmas, origin, output) => {
    const player = origin.getEntity();
    player.sendMessage("§8/기본템 §f- 기본템 ( 튜토리얼 완료 보상 )");
    player.sendMessage("§8/튜토리얼 §f- 튜토리얼 및 서버 설명");
    player.sendMessage("§8/스폰 §f- 스폰 이동");
    player.sendMessage("§8/도박 §f- 현재소지금의 10%의 금액으로 랜덤 도박");
    player.sendMessage("추가중");
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBDQUF1QztBQUV2QyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsb0NBQW9DLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2hHLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQWtCLENBQUM7SUFDbEQsTUFBTSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sQ0FBQyxXQUFXLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDIn0=