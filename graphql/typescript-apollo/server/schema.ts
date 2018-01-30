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
  createAuthor (input: AuthorInput!): Author
  deleteAuthor(id: Int!): Author
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
      console.log(args, author);
      return author;
    },
    post(obj: object, args: any) {
      return find(posts, { id: args.id });
    },
  },
  Mutation: {
    createAuthor(obj: object, args:any) {
      let data = Object.keys(args.input).map(key=>args.input[key]);
      console.log(args.input, data);
      let getIdRandom = authors.length + 1;
      let author = {
        id: getIdRandom,
        firstName: data[0],
        lastName: data[1]
      }
      authors.push(author);
      return author;
    },
    updateAuthor(obj: object, args:any) {
      let author = find(authors, { id: args.id });
      let data = Object.keys(args.input).map(key=>args.input[key]);
      if (!author) {
        throw new Error(`Couldn't find with id ${args.id}`);
      }
      author.firstName = data[0];
      author.lastName  = data[1];
      console.log(author);
      return author;
    },
    deleteAuthor(obj: object, args:any){
      let author = find(authors, { id: args.id });
      let deleteAuthor = authors.filter( value =>{
        return value.id !== args.id;
      });
      authors = deleteAuthor;
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
