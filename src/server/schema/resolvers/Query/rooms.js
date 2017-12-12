import { rooms as roomsMap } from "server/game";

export const rooms = (parent, args, context) => Promise.resolve(roomsMap.values());
