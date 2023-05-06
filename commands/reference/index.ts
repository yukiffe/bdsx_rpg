import { ServerPlayer } from "bdsx/bds/player";
import { bedrockServer } from "bdsx/launcher";

//제작x

export class Reference {
  public vote(player: ServerPlayer, target: string) {
    bedrockServer.serverInstance.getPlayers();
    player.sendMessage("준비중인 기능입니다.");
  }
}
export const reference = new Reference();
