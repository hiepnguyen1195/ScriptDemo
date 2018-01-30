import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8888/graphql'}),
  cache: new InMemoryCache()
});
client.query({ query: gql`{ authors{ firstname id } }` }).then(console.log);
