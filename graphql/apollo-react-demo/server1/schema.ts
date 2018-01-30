import { makeExecutableSchema } from 'graphql-tools';
import { find, filter } from 'lodash';

let posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

let authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman', pass: '123456' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo', pass: '123456' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov', pass: '123456' },
];

let tokens = [];

const typeDefs = `
type Author {
  id: ID!
  firstName: String
  lastName: String
  pass: String
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
  pass: String
}

input PostInput {
  title: String
  votes: Int
  authorId: Int
}

type Token {
  token: String
  author: Author
}

type Query {
  posts: [Post]
  authors: [Author]
  author(id: Int!): Author
  post(id: Int!): Post
  login(lastname: String!, pass: String!): Author
}

type Mutation {
  updateAuthor (id: Int!, input: AuthorInput!): Author
  createAuthor (input: AuthorInput!): Author
  deleteAuthor(id: Int!): Author
  deletePost(id: Int!): Post
  createPost (input: PostInput!): Post
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
    login(obj: Object, args: any){
      let author = find(authors, { lastName: args.lastName, pass: args.pass });
      if(author){
        return author
      }
    }
  },
  Mutation: {
    createAuthor(obj: object, args:any) {
      let data = Object.keys(args.input).map(key=>args.input[key]);
      console.log(args.input, data);
      let getIdRandom = authors.slice(-1)[0].id + 1;
      let author = {
        id: getIdRandom,
        firstName: data[0],
        lastName: data[1],
        pass: data[2],
      }
      authors.push(author);
      return author;
    },
    createPost(obj: object, args:any) {
      let data = Object.keys(args.input).map(key=>args.input[key]);
      console.log(args.input, data);
      let setId = posts.slice(-1)[0].id + 1 ;
      let post = {
        id: setId,
        title: data[0],
        votes: data[1],
        authorId: data[2],
      }
      posts.push(post);
      return post;
    },
    updateAuthor(obj: object, args:any) {
      let author = find(authors, { id: args.id });
      let data = Object.keys(args.input).map(key=>args.input[key]);
      if (!author) {
        throw new Error(`Couldn't find with id ${args.id}`);
      }
      author.firstName = data[0];
      author.lastName  = data[1];
      author.pass      = data[2];
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
    deletePost(obj: object, args:any){
      let post = find(posts, { id: args.id });
      let deletePost = posts.filter( value =>{
        return value.id !== args.id;
      });
      posts = deletePost;
      return post;
    },
    
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: (post) => find(authors, { id: post.authorId }),
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema
