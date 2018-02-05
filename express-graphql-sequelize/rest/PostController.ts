import { Request, Response } from 'express'
import * as sequelize from '../models/index'

const Post = sequelize[`Post`]

class PostRouter {

  public getPosts = (req: Request, res: Response): void => {
    Post.findAll()
    .then((posts) => res.json(posts))
    .catch((error) => {
      res.json({ error })
    })
  }

  public getPost = (req: Request, res: Response): void => {
    const getId = req.params.id
    Post.findOne({
      where: { id: getId },
    })
    .then((posts) => {
      if (!posts) {
        res.status(500).json({ Error: 'Post not found!' })
      }
      res.json(posts)
    })
    .catch( (error) => {
      res.status(500).json({ error })
    })
  }

  public createPost = (req: Request, res: Response): void => {
    if (JSON.stringify(req.body) === '{}') {
      return res.status(400).json({ Error: 'Create request body is empty' })
    }
    Post.create(req.body)
    .then((newPost) => {
        res.status(201).json(newPost)
      })
    .catch((error) => {
      res.status(422).json({ error })
    })
  }

  public updatePost = (req: Request, res: Response): void => {
    const getId = req.params.id
    Post.find({
      where: { id: getId },
    })
    .then((post) => post.update(req.body))
    .then((updatedPost) => res.json(updatedPost))
    .catch((error) => {
      res.status(500).json({ error: 'update failed' })
    })
  }

  public deletePost = (req: Request, res: Response): void => {
    const getId = req.params.id
    Post.destroy({
      where: { id: getId },
    })
    .then((result) => {
      res.json('Deleted successfully')
    })
    .catch((err) => {
      res.status(500).json({ error: 'delete failed' })
    })
  }
}

export default PostRouter
