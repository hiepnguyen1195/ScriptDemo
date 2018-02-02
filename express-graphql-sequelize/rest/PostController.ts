import { Router, Request, Response, NextFunction } from 'express';
import * as sequelize from '../models/index';

const Post = sequelize['Post'];

class PostRouter{

  getPosts = (req: Request, res: Response, next: NextFunction): void => {
    Post.findAll()
    .then(posts => res.json(posts))
    .catch(error => {
      res.json({ error });
    });
  }

  getPost = (req: Request, res: Response, next: NextFunction): void => {
    const getId = req.params.id;
    console.log(getId);
    Post.findOne({
      where: { id: getId }
    }).then(posts => {
      res.json(posts);
    }).catch( error => {
      res.status(500).json({ error });
    });
  }

  createPost = (req: Request, res: Response, next: NextFunction): void => {
    if(!req.body.title){
      throw new Error("title is empty");
    }
    Post.create(req.body)
    .then(newPost => {
        res.json(newPost);
      })
    .catch(error => {
      res.status(422).json({ error });
    });
  }

  updatePost = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.id;
      Post.find({
        where: { id: id }
      })
      .then(post => post.update(req.body))
      .then(updatedPost => {
          res.json(updatedPost);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  deletePost = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.id;
    console.log(id);
    Post.destroy({
      where: { id: id },
    }).then(() => {
      res.status(200).end();
    }).catch(error => {
      res.status(500).json({ error });
    });
  }
  
}

export default PostRouter;