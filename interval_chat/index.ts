import { TextPacket } from "bdsx/bds/packets";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";

class Message {
  constructor(public entityName: string, public message: string, public aliveNumber: number = 0) {}
}

export class ServerMessage {
  private messages: Message[] = [];
  private interval;
  constructor() {
    this.init();
    this.interval = setInterval(() => {
      let message: Message;
      const date = Date.now();
      while (true) {
        const index = Math.floor(Math.random() * this.messages.length);
        message = this.messages[index];
        if (message.aliveNumber == 0 || message.aliveNumber > date) break;
        this.messages.splice(index, index);
      }
      const pkt = TextPacket.allocate();
      pkt.type = TextPacket.Types.Chat;
      pkt.message = `<${message.entityName}> ${message.message}`;
      for (const player of bedrockServer.level.getPlayers()) {
        player.sendNetworkPacket(pkt);
      }
      pkt.dispose();
    }, 1000 * 16 * (Math.random() * 10 + 1));
    events.serverClose.on(() => {
      clearInterval(this.interval);
    });
  }
  private init() {
    this.messages.push(new Message("§l§a농부§r", "인생은 흙에서 시작해서 흙으로 돌아가는걸세"));
    this.messages.push(new Message("§l§a농부§r", "야생동물들이 경작지를 다 엎어서 고민일세"));
    this.messages.push(new Message("§l§b어부§r", "물은 답을 알고 있다"));
    this.messages.push(new Message("§l§b어부§r", "싱싱한 생선은 뭘 해도 맛있지"));
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
  public add_message(entityName: string, message: string, aliveNumber: number = 0) {
    this.messages.push(new Message(entityName, message, aliveNumber === 0 ? 0 : Date.now() + aliveNumber * 1000));
  }
}

const serverMessage = new ServerMessage();

events.levelWeatherChange.on((ev) => {
  serverMessage.add_message("§l§a농부§r", "비가 와서 농사가 잘 되겠구먼", 60 * 10);
  serverMessage.add_message("§l§1낚시꾼§r", "오늘 낚시는 쉽지않겠어", 60 * 10);
});
