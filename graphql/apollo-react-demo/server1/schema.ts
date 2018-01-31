import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './shema/resolvers';
import typeDefs from './shema/typeDefs';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema
