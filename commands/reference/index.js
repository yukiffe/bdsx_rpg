"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reference = exports.Reference = void 0;
const launcher_1 = require("bdsx/launcher");
class Reference {
    vote(player, target) {
        launcher_1.bedrockServer.serverInstance.getPlayers(); //플레이어 있으면 메세지 보내주고 없으면 그냥 두자
        //대충 파일 설정, 플레이어 있으면 그대로 업승며 ㄴ파일 찾아서
        //
        player.sendMessage("준비중인 기능입니다.");
    }
}
exports.Reference = Reference;
exports.reference = new Reference();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw0Q0FBOEM7QUFFOUMsTUFBYSxTQUFTO0lBQ2IsSUFBSSxDQUFDLE1BQW9CLEVBQUUsTUFBYztRQUM5Qyx3QkFBYSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtRQUN4RSxvQ0FBb0M7UUFDcEMsRUFBRTtRQUNGLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNGO0FBUEQsOEJBT0M7QUFDWSxRQUFBLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDIn0=