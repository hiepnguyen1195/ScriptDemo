import * as express from "express";
import * as bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import schema from './schema';

import routerPost from './rest/routes';

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/', routerPost);

app.use('/graphql', bodyParser.json(), graphqlExpress({ 
  schema: schema
}));

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); 

app.listen(4000, () => console.log('GraphQL Server running on localhost:4000'));