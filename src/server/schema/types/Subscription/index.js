import { GAME_PROGRESSED } from "server/constants/topics";

export const Subscription = `
 type Subscription {
   ${GAME_PROGRESSED}(roomId: Int): Room
 }
`;
