"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("bdsx/bds/player");
const event_1 = require("bdsx/event");
const PlayerData_1 = require("../../utils/classes/PlayerData");
event_1.events.entityDie.on((ev) => {
    const player = ev.damageSource.getDamagingEntity();
    if (!(player instanceof player_1.ServerPlayer))
        return;
    const playerData = PlayerData_1.map_playerData.get(player.getXuid());
    playerData.add_experience(player, PlayerData_1.ACTIVE.HUNTER, 5);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUErQztBQUMvQyxzQ0FBb0M7QUFDcEMsK0RBQXdFO0FBRXhFLGNBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7SUFDekIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ25ELElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxxQkFBWSxDQUFDO1FBQUUsT0FBTztJQUM5QyxNQUFNLFVBQVUsR0FBRywyQkFBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUUsQ0FBQztJQUN6RCxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxtQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUMsQ0FBQyJ9