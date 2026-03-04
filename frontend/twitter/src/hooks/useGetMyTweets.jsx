import axios from "axios";
import { useEffect } from "react";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user);

  const fetchMyTweets = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowingTweets = async () => {
    if (!id) return;
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweets/${user?._id}`,
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(getAllTweets(res.data.tweet));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isActive) {
      fetchMyTweets(id);
    } else {
      getFollowingTweets(id);
    }
  }, [isActive, refresh]);
};

export default useGetMyTweets;
