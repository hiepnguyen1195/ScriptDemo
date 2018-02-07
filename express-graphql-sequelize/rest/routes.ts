import * as express from 'express'
import PostRouter from './PostController'

const routerPost = express.Router()

const post = new PostRouter()

routerPost.get('/posts/', post.getPosts)
routerPost.get('/posts/:id', post.getPost)
routerPost.post('/posts/', post.createPost)
routerPost.put('/posts/:id', post.updatePost)
routerPost.delete('/posts/:id', post.deletePost)

export default routerPost
