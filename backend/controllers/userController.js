import User from "../models/userSchema.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Tweet from "../models/tweetSchema.js";

export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(401).json({ success: false, message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        })

        return res.status(200).json({ success: true, message: 'Account created successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: 'All fields are requried' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ successs: false, message: 'User does not exists with this emial' })
        }
        const isMatched = await bcryptjs.compare(password, user.password);

        if (!isMatched) {
            return res.status(401).json({
                message: 'Incorrect email or Password',
                success: false,
            })
        }
        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })
        return res.status(200).cookie('token', token, { expiresIn: '1d', httpOnly: true, maxAge: 24 * 60 * 60 * 1000, }).json({
            message: `Welcome back ${user.name}`,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message,
            sucesss: false,
        })
    }
}

export const Logout = async (req, res) => {
    try {
        return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
            message: 'User logged out successfully',
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const BookmarkTweet = async (req, res) => {
    try {
        const loggedUserId = req.userId;
        const tweetId = req.params.id;
        const user = await User.findById(loggedUserId);

        if (!user) {
            return res.status(401).json({ message: 'User not found or not authenticated' });
        }

        const isBookmarked = await user.bookmarks.includes(tweetId);


        if (isBookmarked) {
            await User.findByIdAndUpdate(loggedUserId, { $pull: { bookmarks: tweetId } },
                { new: true },
            );

            return res.status(200).json({ message: 'Tweet removed successfully' });
        }
        else {
            await User.findByIdAndUpdate(loggedUserId,
                { $push: { bookmarks: tweetId } },
                { new: true },
            );
            return res.status(200).json({ message: 'Tweet bookmark successfully' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


export const getMyProfile = async (req, res) => {
    try {
        const id = req.userId;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(401).json({ message: 'User not found', success: false });
        }

        return res.status(201).json({
            user,
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


export const getOtherUser = async (req, res) => {
    try {
        const userId = req.userId;
        const otherUser = await User.find({ _id: { $ne: userId } }).select("-password");
        if (!otherUser) {
            return res.status(401).json({ message: 'otheruser not found' });
        }
        return res.status(200).json({
            otherUser,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}


export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } })
        }
        else {
            return res.status(200).json({
                message: `User already followed to ${user.name}`,
            })
        }

        return res.status(200).json({
            success: true,
            message: `${loggedInUser.name} just follow to ${user.name}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}