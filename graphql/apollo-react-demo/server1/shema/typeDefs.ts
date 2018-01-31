const typeDefs = `
type Author {
  id: ID!
  firstName: String
  lastName: String
  pass: String
  posts: [Post]
}

scalar DateTime

type Post {
  id: ID!
  title: String
  author: Author
  votes: Int
  createdAt: DateTime!
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
  id: ID
  token: String
  author: Author
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
  deletePost(id: Int!): Post
  createPost (input: PostInput!): Post
  login(lastname: String!, pass: String!): Token
  signUp(firstname:String!, lastname: String!, pass: String!): Token
}

schema {
  query: Query
  mutation: Mutation
}
`;
export default typeDefs