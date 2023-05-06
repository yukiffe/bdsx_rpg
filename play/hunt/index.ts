import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { ACTIVE, map_playerData } from "../../utils/classes/PlayerData";

events.entityDie.on((ev) => {
  const player = ev.damageSource.getDamagingEntity();
  if (!(player instanceof ServerPlayer)) return;
  const playerData = map_playerData.get(player.getXuid())!;
  playerData.add_experience(player, ACTIVE.HUNTER, 5);
});

//레벨
