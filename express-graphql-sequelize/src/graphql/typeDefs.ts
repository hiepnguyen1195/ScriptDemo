const typeDefs = `
    scalar DateTime

    type Post {
        id: ID!
        title: String
        content: String
        createdAt: DateTime
        updatedAt: DateTime
        deletedAt: DateTime
    }
    type Status {
        status: String
    }
    input PostInput{
        title: String!
        content: String
    }
    type RootQuery {
        post(id: ID): Post
        posts: [Post]
    }
    type RootMutation {
        createPost(title: String!, content: String): Post
        updatePost(id: ID!, title: String!, content: String): Post
        deletePost(id: ID!): Status
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`

export default typeDefs
