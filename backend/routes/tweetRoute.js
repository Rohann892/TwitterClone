import express from 'express';
import { createTweet, deleteTweet, likeAndDislike } from '../controllers/tweetController.js';
import isAuthenticated from '../middlewares/isAuth.js'

const router = express.Router();

router.route('/create').post(isAuthenticated, createTweet);
router.route('/delete/:id').delete(isAuthenticated, deleteTweet);
router.route('/like/:id').put(isAuthenticated, likeAndDislike);

export default router;