import config from "config";
import { arrayOfSize } from "../utils/arrayUtilities";
import { randomNumber } from "../utils/numberUtilities";
import { WAITING, PLAYING, RESTARTING } from "lib/constants/gameStatus";

const boardSize = parseInt(config.get("game.board.size"));
const tokens = config.get("game.board.tokens").replace(/ /g, "").split(",", 3);

const flattenBoard = (spaces) => {
  return [].concat(...spaces);
}

const walker = (spaces, token, size) => (select) => {
  return arrayOfSize(size, i => i).filter((i) => {
    return select(spaces, i).token === token
  }).length === size;
}

const createEmptyBoard = (size) => {
  return arrayOfSize(size, (x) => arrayOfSize(size, (y) => ({ x, y, token:null }) ))
}

export const rooms = new Map();

export const playForAI = (roomId) => {
  // Recursively play each possible move for each seat +1 for winnings 0 ties -1 lose. Pick the one has most points.
  // calculate iterations beforehand if too long only do half of them. if have time.
  const entity = rooms.get(roomId);
  const spaces = flattenBoard(entity.board.spaces);
  const availableSpaces = spaces.filter(({ token }) => token === null);

  const {
    x,
    y,
    token
  } = availableSpaces[randomNumber(0, availableSpaces.length - 1)];

  entity.board.spaces[x][y].token = entity.seats[0].token;

}

export const canPlay = (roomId, x, y) => {
  const entity = rooms.get(roomId);

  return entity.board.spaces[x][y].token == null;
}

export const checkWinStatus = (roomId, x, y, token) => {
  const spaces = rooms.get(roomId).board.spaces;
  const walk = walker(spaces, token, boardSize);

  const xPlane = walk((spaces, i) => spaces[i][y]),
        yPlane = walk((spaces, i) => spaces[x][i]);

  let diagonalForward = false,
      diagonalReverse = false;

  if (x == y) {
    diagonalForward = walk((spaces, i) => spaces[i][i]);
  }

  if (x + y === boardSize - 1) {
    diagonalReverse = walk((spaces, i) => spaces[boardSize - 1 - i][boardSize - 1 - i]);
  }

  return xPlane || yPlane || diagonalForward || diagonalReverse;
}

export const checkTieStatus = spaces => (
  flattenBoard(spaces)
    .filter(({ token }) => token === null).length === 0
)

export const resetGame = (roomId) => {
  const entity = rooms.get(roomId);

  entity.seats.forEach((seat) => seat.isWinner === false);

  entity.status = PLAYING;
  entity.board.spaces = createEmptyBoard(entity.board.size);

  return entity;
}

export const create = (args) => {
  const seats = args.seats.map((seat, i) => Object.assign({}, { token: tokens[i] }));

  const entity = {
    id: rooms.size,
    status: WAITING,
    board: {
      size: boardSize,
      spaces: createEmptyBoard(boardSize)
    },
    seats,
  };

  rooms.set(entity.id, entity);

  return entity
};
