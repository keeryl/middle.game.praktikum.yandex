import type { Request, Response } from 'express';
import { Topic } from '../models/topic';


export function getAllTopics (_: Request, res: Response) {
  Topic.findAll()
    .then(topics => res.send(topics))
    .catch(err => console.error(err))
}

export function getTopic (req: Request, res: Response) {
  const id = Number(req.params.id);
  Topic.findOne({
    where: { id: id}
  })
    .then(topic => res.send(topic))
    .catch(err => console.error(err))
}

export function createTopic (req: Request, res: Response) {
  Topic.create(req.body)
    .then(topic => res.send(topic))
    .catch(err => console.error(err))
}

export function updateTopic (req: Request, res: Response) {
  const id = Number(req.params.id);
  Topic.update(req.body, { where: { id: id}})
    .then(topic => res.send(topic))
    .catch(err => console.error(err))
}

export function deleteTopic (req: Request, res: Response) {
  const id = Number(req.params.id);
  Topic.destroy({
    where: { id: id}
  })
    .then(topic => res.send(String(topic)))
    .catch(err => console.error(err))
}

