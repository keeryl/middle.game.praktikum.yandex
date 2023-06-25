import type { Request, Response } from 'express';
import { Reaction } from '../models/reaction';


export function getAllReactionsForComment (req: Request, res: Response) {
  const comment_id = Number(req.params.id);

  Reaction.findAll({
    where: { comment_id: comment_id}
  })
    .then(reactions => res.send(reactions))
    .catch(err => console.error(err))
}

export function createReactionForComment (req: Request, res: Response) {
  Reaction.create(req.body)
    .then(reaction => res.send(reaction))
    .catch(err => console.error(err))
}

export function deleteReactionForComment (req: Request, res: Response) {
  const comment_id = Number(req.params.id);

  Reaction.destroy({
    where: { comment_id: comment_id, ...(req.body) }
  })
    .then(reaction => res.send(String(reaction)))
    .catch(err => console.error(err))
}

export function deleteAllReactionsForComment (req: Request, res: Response) {
  const comment_id = Number(req.params.id);
  Reaction.destroy({
    where: { comment_id: comment_id}
  })
    .then(reaction => res.send(String(reaction)))
    .catch(err => console.error(err))
}
