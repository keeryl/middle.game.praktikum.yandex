import type { Request, Response } from 'express'
import { Comment } from '../models/comment'

export function getAllComments(_: Request, res: Response) {
  Comment.findAll()
    .then(comments => {
      comments
        ? res.status(200).send(comments)
        : res.status(404).send('Записи не найдены')
    })
    .catch(err => res.status(500).send(err))
}

export function getComment(req: Request, res: Response) {
  const id = Number(req.params.id)
  Comment.findOne({
    where: { id: id },
  })
    .then(comment => {
      comment
        ? res.status(200).send(comment)
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}

export function createComment(req: Request, res: Response) {
  Comment.create(req.body)
    .then(comment => {
      comment
        ? res.status(200).send(comment)
        : res.status(400).send('Запись не создана')
    })
    .catch(err => res.status(500).send(err))
}

export function updateComment(req: Request, res: Response) {
  const id = Number(req.params.id)
  Comment.update(req.body, { where: { id: id } })
    .then(comment => {
      comment
        ? res.status(200).send('OK')
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}

export function deleteComment(req: Request, res: Response) {
  const id = Number(req.params.id)
  Comment.destroy({
    where: { id: id },
  })
    .then(comment => {
      comment
        ? res.status(200).send('OK')
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}
