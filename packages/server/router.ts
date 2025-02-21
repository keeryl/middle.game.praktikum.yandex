import express from 'express'
import bodyParser from 'body-parser'
import {
  createTopic,
  getAllTopics,
  getTopic,
  deleteTopic,
  updateTopic,
} from './controllers/topic'
import {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment,
  getAllCommentsByTopicId
} from './controllers/comments'
import {
  getAllReactionsForComment,
  createReactionForComment,
  deleteReactionForComment
} from './controllers/reaction'
import { checkAuth } from './middlewares/checkAuth'
import {
  createReply,
  deleteReply,
  getAllReplies,
  getReply,
  updateReply,
} from './controllers/replies'
import { themesRoutes } from "./routes/themesRouter";


const router = express.Router()
const middlewares = [bodyParser.json(), checkAuth]

router.get(`/api/forum/topics`, ...middlewares, getAllTopics)
router.get(`/api/forum/topics/:id`, ...middlewares, getTopic)
router.get(`/api/forum/comments/`, ...middlewares, getAllComments)
router.get(`/api/forum/comments/bytopicid/:topic_id`, ...middlewares, getAllCommentsByTopicId)
router.get(`/api/forum/comments/:id`, ...middlewares, getComment)
router.get(`/api/forum/replies/`, ...middlewares, getAllReplies)
router.get(`/api/forum/replies/:id`, ...middlewares, getReply)
router.post(`/api/forum/topics`, ...middlewares, createTopic)
router.post(`/api/forum/comments`, ...middlewares, createComment)
router.post(`/api/forum/replies`, ...middlewares, createReply)
router.put(`/api/forum/topics/:id`, ...middlewares, updateTopic)
router.put(`/api/forum/comments/:id`, ...middlewares, updateComment)
router.put(`/api/forum/replies/:id`, ...middlewares, updateReply)
router.delete(`/api/forum/topics/:id`, ...middlewares, deleteTopic)
router.delete(`/api/forum/comments/:id`, ...middlewares, deleteComment)
router.delete(`/api/forum/replies/:id`, ...middlewares, deleteReply)

router.get(`/api/forum/comments/:id/reactions`, ...middlewares, getAllReactionsForComment)
router.post(`/api/forum/comments/:id/reactions`, ...middlewares, createReactionForComment)
router.delete(`/api/forum/comments/:id/reactions`, ...middlewares, deleteReactionForComment)

themesRoutes(router);

export { router }
