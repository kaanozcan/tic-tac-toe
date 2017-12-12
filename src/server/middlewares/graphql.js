import { graphqlExpress } from 'apollo-server-express';
import schema from "../schema";


export default graphqlExpress((req) => ({
  schema,
  context: {
    session: req.session
  }
}));
