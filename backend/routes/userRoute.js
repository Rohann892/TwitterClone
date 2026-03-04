import express from 'express';
import { BookmarkTweet, follow, getMyProfile, getOtherUser, Login, Logout, Register, unfollow } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuth.js';

const router = express.Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/logout').get(Logout);
router.route('/bookmark/:id').put(isAuthenticated, BookmarkTweet);
router.route('/profile/:id').get(isAuthenticated, getMyProfile);
router.route('/getOtherUser/:id').get(isAuthenticated, getOtherUser);
router.route('/follow/:id').post(isAuthenticated, follow);
router.route('/unfollow/:id').post(isAuthenticated, unfollow);

export default router;