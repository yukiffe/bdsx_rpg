import { events } from "bdsx/event";

events.blockDestroy.on((ev) => {
  const block = ev.blockSource.getBlock(ev.blockPos);
  ev.player;
});

//채광->아직없음
