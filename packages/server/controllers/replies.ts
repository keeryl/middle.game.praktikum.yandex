import type { Request, Response } from 'express'
import { Reply } from '../models/reply'

export function getAllReplies(_: Request, res: Response) {
  Reply.findAll()
    .then(replies => {
      replies
        ? res.status(200).send(replies)
        : res.status(404).send('Записи не найдены')
    })
    .catch(err => res.status(500).send(err))
}

export function getReply(req: Request, res: Response) {
  const id = Number(req.params.id)
  Reply.findOne({
    where: { id: id },
  })
    .then(reply => {
      reply
        ? res.status(200).send(reply)
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}

export function createReply(req: Request, res: Response) {
  Reply.create(req.body)
    .then(reply => {
      reply
        ? res.status(200).send(reply)
        : res.status(400).send('Запись не создана')
    })
    .catch(err => res.status(500).send(err))
}

export function updateReply(req: Request, res: Response) {
  const id = Number(req.params.id)
  Reply.update(req.body, { where: { id: id } })
    .then(reply => {
      reply
        ? res.status(200).send('OK')
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}

export function deleteReply(req: Request, res: Response) {
  const id = Number(req.params.id)
  Reply.destroy({
    where: { id: id },
  })
    .then(reply => {
      reply
        ? res.status(200).send('OK')
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}
