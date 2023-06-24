import type { Request, Response } from 'express';
import { Comment } from '../models/comment';


export function getAllComments(_: Request, res: Response) {
  Comment.findAll()
    .then(comments => res.send(comments))
    .catch(err => console.error(err))
}

export function getComment (req: Request, res: Response) {
  const id = Number(req.params.id);
  Comment.findOne({
    where: { id: id}
  })
    .then(comment => res.send(comment))
    .catch(err => console.error(err))
}

export function createComment(req: Request, res: Response) {
  Comment.create(req.body)
    .then(comment => res.send(comment))
    .catch(err => console.error(err))
}

export function updateComment(req: Request, res: Response) {
  const id = Number(req.params.id);
  Comment.update(req.body, { where: { id: id}})
    .then(comment => res.send(comment))
    .catch(err => console.error(err))
}

export function deleteComment (req: Request, res: Response) {
  const id = Number(req.params.id);
  Comment.destroy({
    where: { id: id}
  })
    .then(comment => res.send(String(comment)))
    .catch(err => console.error(err))
}

