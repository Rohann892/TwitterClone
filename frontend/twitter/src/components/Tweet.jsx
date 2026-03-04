import React from "react";
import Avatar from "react-avatar";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";

const Tweet = ({ tweet }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const isLiked = tweet?.like?.includes(user?._id);

  const likeDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${TWEET_API_END_POINT}/delete/${tweet?._id}`,
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="p-4 border-b border-b-gray-200">
      <div>
        <div className="flex items-start">
          <Avatar name="Wim Mostmans" size="50" round={true} />
          <div className="ml-2 w-full">
            <div className="flex items-center gap-1">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm">{`@${tweet?.userDetails[0]?.username}`}</p>
            </div>
            <div>
              <p>{tweet.description}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <div
                  onClick={() => likeDislikeHandler(tweet?._id)}
                  className="hover:bg-green-200 hover:cursor-pointer rounded-full px-2 py-2"
                >
                  {isLiked ? (
                    <AiFillLike className="w-6 h-6 text-blue-500" />
                  ) : (
                    <AiOutlineLike className="w-6 h-6" />
                  )}
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="hover:bg-green-200 hover:cursor-pointer rounded-full px-2 py-2">
                  <FaRegCommentDots className="w-6 h-6" />
                </div>
                <p>0</p>
              </div>
              {user?._id === tweet?.userId ? (
                <div
                  onClick={handleDelete}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <div className="hover:bg-green-200 rounded-full px-2 py-2">
                    <MdDeleteOutline className="w-6 h-6" />
                  </div>
                </div>
              ) : null}
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="hover:bg-green-200 hover:cursor-pointer rounded-full px-2 py-2">
                  <CiBookmark className="w-6 h-6" />
                </div>
                <p>{tweet?.userDetails[0]?.bookmarks.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
