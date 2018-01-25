import { makeExecutableSchema } from 'graphql-tools';
import { find, filter } from 'lodash';

let posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

let authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const typeDefs = `
type Author {
  id: ID!
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: ID!
  title: String
  author: Author
  votes: Int
}

input AuthorInput {
  firstname: String
  lastname: String
}

type Query {
  posts: [Post]
  authors: [Author]
  author(id: Int!): Author
  post(id: Int!): Post
}

type Mutation {
  updateAuthor (id: Int!, input: AuthorInput!): Author
}

schema {
  query: Query
  mutation: Mutation
}
`;

const resolvers = {
  Query: {
    posts: () => posts,
    authors: () => authors, 
    author(obj: object, args: any) {
      let author = find(authors, { id: args.id });
      console.log(obj, args, author);
      return author;
    },
    post(obj: object, args: any) {
      return find(posts, { id: args.id });
    },
  },
  Mutation: {
    updateAuthor(obj: object, args:any) {
      console.log(args.input);
      let author = find(authors, { id: args.id });
      let data: string[][] = Object.entries(args.input);
      console.log(data);
      if (!author) {
        throw new Error(`Couldn't find with id ${args.id}`);
      }
      author.firstName = data[0][1];
      author.lastName  = data[1][1];
      // console.log(author);
      return author;
    },
  },
  Author: {
    posts(author: any) {
      return filter(posts, { authorId: author.id });
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema
