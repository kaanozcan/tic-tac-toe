import { rooms, playForAI } from "server/game";
import { pubsub } from "../../../utils/pubSub";
import { PLAYING } from "lib/constants/gameStatus";
import { GAME_PROGRESSED } from "server/constants/topics";

const filterOutAI = (seats) => seats.filter(({ isAI }) => !isAI);
const isRoomFull = (seats) => seats.filter(({ sessionId }) => sessionId).length === filterOutAI(seats).length;

export const join = (parent, { roomId }, { session: { id }}) => {
  const entity = rooms.get(roomId);

  if (entity.seats.filter(({ sessionId }) => sessionId === id).length > 0) {
    return Promise.reject("Already joined");
  }

  if (isRoomFull(entity.seats)) {
    return Promise.reject("Room Full");
  }

  entity.seats[0].sessionId = id;

  entity.seats.push(entity.seats.shift());

  if (isRoomFull(entity.seats)) {
    entity.status = PLAYING;
  }

  pubsub.publish(GAME_PROGRESSED, { [GAME_PROGRESSED]: entity });

  return Promise.resolve(entity);
}
