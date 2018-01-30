import * as express from "express";
import * as graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
const cors = require('cors');

const graphqlOption = {
    graphiql: true,
    schema: schema,
};

app.use(cors());

app.use('/graphql', graphqlHTTP(graphqlOption));

app.listen(4000, () => console.log('GraphQL Server running on localhost:4000'));