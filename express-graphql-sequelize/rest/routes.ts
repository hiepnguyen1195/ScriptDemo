import * as express from 'express';
import PostRouter from './PostController';

const routerPost = express.Router();

const post = new PostRouter();

routerPost.get('/post/', post.getPosts);
routerPost.get('/post/:id', post.getPost);
routerPost.post('/post/', post.createPost);
routerPost.put('/post/:id', post.updatePost);
routerPost.delete('/post/:id', post.deletePost);

export default routerPost