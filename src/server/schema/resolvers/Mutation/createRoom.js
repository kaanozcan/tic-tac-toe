import config from "config";
import uuid from "uuid/v1";
import { shuffle } from "../../../utils/arrayUtilities";

import { get, create } from "server/game";

const boardSize = config.get("game.board.size");
const tokens = config.get("game.board.tokens").replace(/ /g, "").split(",", 3);

export const createRoom = (parent, args, context) => {
  const entity = create(args);

  return Promise.resolve(entity);
}
