import Tweet from "../models/tweetSchema.js";
import User from "../models/userSchema.js";

export const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: 'All fiedls are required',
                success: false,
            })
        }
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId: req.userId,
            userDetails: user,
        });

        return res.status(201).json({ message: 'Tweet created Successfully', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false })
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTweet = await Tweet.findByIdAndDelete(id);

        if (!deletedTweet) {
            return res.status(404).json({
                message: 'Tweet not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Tweet deleted successfully',
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


export const likeAndDislike = async (req, res) => {
    try {
        const loggedInUserId = req.userId;
        const tweetId = req.params.id;

        const tweet = await Tweet.findById(tweetId);

        if (!tweet) {
            return res.status(404).json({
                message: "Tweet not found"
            });
        }

        if (tweet.like.includes(loggedInUserId)) {
            await Tweet.findByIdAndUpdate(
                tweetId,
                { $pull: { like: loggedInUserId } },
                { new: true }
            );

            return res.status(200).json({
                message: 'User disliked your tweet'
            });
        } else {
            await Tweet.findByIdAndUpdate(
                tweetId,
                { $push: { like: loggedInUserId } },
                { new: true }
            );

            return res.status(200).json({
                message: 'User liked your tweet'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
};


export const getAllTweet = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTWeets = await Tweet.find({ userId: id });
        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId) => {
            return Tweet.find({ userId: otherUserId })
        }));

        return res.status(200).json({
            tweets: loggedInUserTWeets.concat(...followingUserTweets)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


export const getFollowingTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId) => {
            return Tweet.find({ userId: otherUserId })
        }));

        return res.status(201).json({
            tweet: [].concat(...followingUserTweet)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}