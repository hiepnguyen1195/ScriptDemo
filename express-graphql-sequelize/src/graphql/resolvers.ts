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
            let stt: {}
            return Post.find({
                where: { id: args.id },
            })
            .then((result) => {
                result.destroy()
                return stt = {status: 'success'}
            })
            .catch((err) => stt = {status: 'failed'})
        },
    },
}
export default resolvers
