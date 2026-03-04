import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";
import { FaDartLang } from "react-icons/fa6";

const CreatePost = () => {
  const { user } = useSelector((store) => store.user);
  const [description, setDescription] = useState();
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user._id },
        {
          withCredentials: true,
        },
      );
      dispatch(getAllTweets(res.data.tweets));
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
        setDescription("");
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHanlder = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-50%">
      <div className=" border-b border-b-gray-200">
        <div className="flex items-center justify-evenly border-b border-b-gray-200">
          <div
            onClick={forYouHandler}
            className={`${isActive ? "border-b-2 border-blue-500" : ""} cursor-pointer hover:bg-gray-200 w-full text-center p-4 rounded-md`}
          >
            <h2 className="font-medium text-gray-700 text-lg">For you</h2>
          </div>

          <div
            onClick={followingHanlder}
            className={`${!isActive ? "border-b-2 border-blue-500" : ""} cursor-pointer hover:bg-gray-200 w-full text-center p-4 rounded-md`}
          >
            <h2 className="font-medium text-gray-700 text-lg">Following</h2>
          </div>
        </div>
        <div className="m-4">
          <div className="flex items-center gap-2 py-4">
            <div>
              <Avatar name="Wim Mostmans" size="50" round={true} />
            </div>
            <div className="w-full border border-gray-200 px-2 py-3 rounded-lg">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full outline-none border-gray-100 rounded-lg text-2xl ml-3"
                type="text"
                placeholder="What is happening?"
              />
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <div>
              <CiImageOn className="w-8 h-8" />
            </div>
            <button
              onClick={submitHandler}
              className="bg-[#1d98f0] px-4 py-2 border-none rounded-full text-white text-right"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
