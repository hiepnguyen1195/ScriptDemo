import * as sequelize from '../../models/index'

const Post = sequelize[`Post`]

const resolvers =  {
    RootQuery: {
        posts: (obj, args) => {
            return Post.findAll()
        },
        post: (obj, args) => {
            return Post.findById(args.id)
        },
    },
    RootMutation: {
        createPost: (obj, args) => {
            const title: string = args.title
            if (!title) {
                throw new Error('title is empty !')
            }
            return Post.create(args)
        },
        updatePost: (obj, args) => {
            return Post.find({
                where: { id: args.id },
            })
            .then((post) => post.update(args))
        },
        deletePost: (obj, args) => {
            const deletedAt: Date = new Date()
            Post.destroy({
                where: { id: args.id },
            }).catch((e) => e.message)
            return deletedAt
        },
    },
}
export default resolvers
