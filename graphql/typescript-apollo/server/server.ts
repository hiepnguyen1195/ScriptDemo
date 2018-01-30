import * as express from "express";
import * as graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

const graphqlOption = {
    graphiql: true,
    schema: schema,
};

app.use('/graphql', graphqlHTTP(graphqlOption));

app.listen(5000, () => console.log('GraphQL Server running on localhost:5000'));