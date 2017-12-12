import { pubsub } from "../../../utils/pubSub";
import { withFilter } from "graphql-subscriptions";
import { GAME_PROGRESSED } from "server/constants/topics";

export const gameProgressed = {
    subscribe: withFilter(
      () => pubsub.asyncIterator(GAME_PROGRESSED),
      (payload, variables) => { 
        return payload && payload[GAME_PROGRESSED] && payload[GAME_PROGRESSED].id === variables.roomId;
      }
    )
};
