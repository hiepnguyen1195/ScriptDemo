import { Request, Response } from 'express'
import * as sequelize from '../models/index'

const Posts = sequelize[`Post`]

class PostRouter {

  public getPosts = (req: Request, res: Response): void => {
    Posts.findAll()
    .then((posts) => res.json(posts))
    .catch((error) => {
      res.json({ error })
    })
  }

  public getPost = (req: Request, res: Response): void => {
    const getId = req.params.id
    Posts.findOne({
      where: { id: getId },
    })
    .then((posts) => {
      if (!posts) {
        return res.status(404).json({ error: 'Post not found!' })
      }
      res.json(posts)
    })
    .catch( (error) => {
      res.status(404).json({ error: 'Post not found!' })
    })
  }

  public createPost = (req: Request, res: Response): void => {
    if (JSON.stringify(req.body) === '{}') {
      return res.status(400).json({ Error: 'Create request body is empty' })
    }
    Posts.create(req.body)
    .then((newPost) => {
        res.status(201).json(newPost)
      })
    .catch((error) => {
      res.status(500).json({ error })
    })
  }

  public updatePost = (req: Request, res: Response): void => {
    const getId = req.params.id
    Posts.find({
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
    Posts.find({
      where: { id: getId },
    })
    .then((result) => {
      result.destroy()
      res.json( {message: 'Deleted successfully'})
    })
    .catch((err) => {
      res.status(500).json({ error: 'delete failed' })
    })
  }
}

export default PostRouter
