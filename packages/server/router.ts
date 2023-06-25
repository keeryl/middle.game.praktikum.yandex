import express from "express";
import bodyParser from "body-parser";
import { createTopic, getAllTopics, getTopic, deleteTopic, updateTopic } from './controllers/topic';
import { getAllReactionsForComment, createReactionForComment, deleteReactionForComment } from './controllers/reaction';
import { checkAuth } from './middlewares/checkAuth';

const router = express.Router();
const middlewares = [
    bodyParser.json(),
    checkAuth
];

router.post(`/api/forum/topics`, ...middlewares, createTopic);
router.get(`/api/forum/topics`, ...middlewares, getAllTopics);
router.get(`/api/forum/topics/:id`, ...middlewares, getTopic);
router.put(`/api/forum/topics/:id`, ...middlewares, updateTopic);
router.delete(`/api/forum/topics/:id`, ...middlewares, deleteTopic);

router.get(`/api/forum/comments/:id/reactions`, ...middlewares, getAllReactionsForComment);
router.post(`/api/forum/comments/:id/reactions`, ...middlewares, createReactionForComment);
router.delete('/api/forum/comments/:id/reactions', ...middlewares, deleteReactionForComment);

export { router };
