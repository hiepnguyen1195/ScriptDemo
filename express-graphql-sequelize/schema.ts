import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

export default schema