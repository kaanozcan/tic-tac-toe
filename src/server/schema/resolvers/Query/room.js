import { rooms } from "server/game";

export const room = (parent, { id }, context) => Promise.resolve(rooms.get(id));
