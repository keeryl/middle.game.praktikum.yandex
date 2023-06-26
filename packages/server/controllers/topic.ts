import type { Request, Response } from 'express'
import { Topic } from '../models/topic'

export function getAllTopics(_: Request, res: Response) {
  Topic.findAll()
    .then(topics => {
      topics
        ? res.status(200).send(topics)
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}

export function getTopic(req: Request, res: Response) {
  const id = Number(req.params.id)
  Topic.findOne({
    where: { id: id },
  })
    .then(topic => {
      topic
        ? res.status(200).send(topic)
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}

export function createTopic(req: Request, res: Response) {
  Topic.create(req.body)
    .then(topic => {
      topic
        ? res.status(200).send(topic)
        : res.status(400).send('Запись не создана')
    })
    .catch(err => res.status(500).send(err))
}

export function updateTopic(req: Request, res: Response) {
  const id = Number(req.params.id)
  Topic.update(req.body, { where: { id: id } })
    .then(topic => {
      topic
        ? res.status(200).send('OK')
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}

export function deleteTopic(req: Request, res: Response) {
  const id = Number(req.params.id)
  Topic.destroy({
    where: { id: id },
  })
    .then(topic => {
      topic
        ? res.status(200).send('OK')
        : res.status(404).send('Запись не найдена')
    })
    .catch(err => res.status(500).send(err))
}
