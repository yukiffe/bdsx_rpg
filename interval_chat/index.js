"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerMessage = void 0;
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
class Message {
    constructor(entityName, message, aliveNumber = 0) {
        this.entityName = entityName;
        this.message = message;
        this.aliveNumber = aliveNumber;
    }
}
class ServerMessage {
    constructor() {
        this.messages = [];
        this.init();
        this.interval = setInterval(() => {
            let message;
            const date = Date.now();
            while (true) {
                const index = Math.floor(Math.random() * this.messages.length);
                message = this.messages[index];
                if (message.aliveNumber == 0 || message.aliveNumber > date)
                    break;
                this.messages.splice(index, index);
            }
            const pkt = packets_1.TextPacket.allocate();
            pkt.type = packets_1.TextPacket.Types.Chat;
            pkt.message = `<${message.entityName}> ${message.message}`;
            for (const player of launcher_1.bedrockServer.level.getPlayers()) {
                player.sendNetworkPacket(pkt);
            }
            pkt.dispose();
        }, 1000 * 16 * (Math.random() * 10 + 1));
        event_1.events.serverClose.on(() => {
            clearInterval(this.interval);
        });
    }
    init() {
        this.messages.push(new Message("§l§a농부§r", "인생은 흙에서 시작해서 흙으로 돌아가는걸세"));
        this.messages.push(new Message("§l§b어부§r", "물은 답을 알고 있다"));
        this.messages.push(new Message("§l§b어부§r", "싱싱한 생선은 몸에 좋다"));
        this.messages.push(new Message("§l§f토끼§r", "찍찍"));
        this.messages.push(new Message("§l§f소§r", "음머"));
        this.messages.push(new Message("§l§f닭§r", "꼬끼오"));
        this.messages.push(new Message("§l§f양§r", "음메"));
        this.messages.push(new Message("§l§f돼지§r", "꿀꿀"));
        this.messages.push(new Message("§l§5사서§r", "특별한 책이 오늘 들어왔다네"));
        this.messages.push(new Message("§l§7갑옷 대장장이§r", "부상의 위험을 감수하지말고 날 찾아오게나"));
        this.messages.push(new Message("§l§7도구 대장장이§r", "요즘따라 물건이 잘 안팔리는군.."));
        this.messages.push(new Message("§l§0무기 대장장이§r", "오늘따라 순맛이 좋군, 명검이 탄생하겠어"));
        this.messages.push(new Message("§l§c도살업자§r", "고기.."));
    }
    /**
     * @param entityName 이름
     * @param message 메세지
     * @param aliveNumber 생존 타이머, 단위 초
     */
    add_message(entityName, message, aliveNumber = 0) {
        this.messages.push(new Message(entityName, message, aliveNumber === 0 ? 0 : Date.now() + aliveNumber * 1000));
    }
}
exports.ServerMessage = ServerMessage;
const serverMessage = new ServerMessage();
event_1.events.levelWeatherChange.on((ev) => {
    serverMessage.add_message("§l§a농부§r", "비가 와서 농사가 잘 되겠구먼", 60 * 10);
    serverMessage.add_message("§l§1낚시꾼§r", "오늘 낚시는 쉽지않겠어", 60 * 10);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBOEM7QUFDOUMsc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUU5QyxNQUFNLE9BQU87SUFDWCxZQUFtQixVQUFrQixFQUFTLE9BQWUsRUFBUyxjQUFzQixDQUFDO1FBQTFFLGVBQVUsR0FBVixVQUFVLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7SUFBRyxDQUFDO0NBQ2xHO0FBRUQsTUFBYSxhQUFhO0lBR3hCO1FBRlEsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUcvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxPQUFnQixDQUFDO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN4QixPQUFPLElBQUksRUFBRTtnQkFDWCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUk7b0JBQUUsTUFBTTtnQkFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsb0JBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxHQUFHLENBQUMsSUFBSSxHQUFHLG9CQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNqQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0QsS0FBSyxNQUFNLE1BQU0sSUFBSSx3QkFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDckQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLGNBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUN6QixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNPLElBQUk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsZUFBZSxFQUFFLHdCQUF3QixDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSxXQUFXLENBQUMsVUFBa0IsRUFBRSxPQUFlLEVBQUUsY0FBc0IsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hILENBQUM7Q0FDRjtBQWpERCxzQ0FpREM7QUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO0FBRTFDLGNBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtJQUNsQyxhQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbkUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsY0FBYyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUMsQ0FBQyJ9