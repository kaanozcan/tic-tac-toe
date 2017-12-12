import { rooms, canPlay, playForAI,resetGame, checkTieStatus, checkWinStatus } from "server/game";
import { WAITING, PLAYING, RESTARTING } from "lib/constants/gameStatus";
import { GAME_PROGRESSED } from "server/constants/topics";
import { pubsub } from "../../../utils/pubSub";

export const play = (parent, { roomId, x, y }, context) => {
  let entity = rooms.get(roomId);

  if (entity.seats[0].sessionId !== context.session.id) {
    return Promise.reject("Not your turn");
  }

  if (!canPlay(roomId, x, y)) {
    return Promise.reject("Space is full");
  }

  entity.board.spaces[x][y].token = entity.seats[0].token;

  entity.seats.push(entity.seats.shift());

  const hasWon = checkWinStatus(roomId, x, y, entity.board.spaces[x][y].token),
        isTie = checkTieStatus(entity.board.spaces);

  if (hasWon) {
    entity.status = RESTARTING;
    entity.seats[0].isWinner = true;
    entity.seats[0].winningCount++;
  }

  if (!hasWon && isTie) {
    entity.status = RESTARTING;
  }

  if (entity.status === RESTARTING) {
    setTimeout(() => {
      entity = resetGame(roomId);

      pubsub.publish(GAME_PROGRESSED, { [GAME_PROGRESSED]: entity });
    }, 5000);
  }

  pubsub.publish(GAME_PROGRESSED, { [GAME_PROGRESSED]: entity });

  rooms.set(roomId, entity);

  return Promise.resolve(entity);
}
