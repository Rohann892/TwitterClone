import express from 'express';
import { createTweet, deleteTweet, getAllTweet, getFollowingTweets, likeAndDislike } from '../controllers/tweetController.js';
import isAuthenticated from '../middlewares/isAuth.js'

const router = express.Router();

router.route('/create').post(isAuthenticated, createTweet);
router.route('/delete/:id').delete(isAuthenticated, deleteTweet);
router.route('/like/:id').put(isAuthenticated, likeAndDislike);
router.route('/alltweets/:id').get(isAuthenticated, getAllTweet);
router.route('/followingtweets/:id').get(isAuthenticated, getFollowingTweets);

export default router;