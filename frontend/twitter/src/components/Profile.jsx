import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";

const Profile = () => {
  const { profile, user } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);

  const isFollowing = user?.following.includes(id);
  const dispatch = useDispatch();

  const followingHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/follow/${id}`,
        {
          id: user?._id,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(followingUpdate(id));
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/unfollow/${id}`,
        {
          id: user?._id,
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      dispatch(followingUpdate(id));
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-[50%] border border-gray-200 rounded-md p-1">
      <div>
        <div className="flex items-center gap-2">
          <Link
            to={"/home"}
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <GoArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 Post</p>
          </div>
        </div>
        <img
          src="https://media.licdn.com/dms/image/v2/D5616AQFXtss7ufLiPA/profile-displaybackgroundimage-shrink_350_1400/B56ZrRv6FgIcAY-/0/1764455591811?e=1773273600&v=beta&t=fUCddocKjK7IcrVFuszQb2tPHzqlVdUcs1rmS4uqous"
          alt="profile image"
          className="rounded-lg mt-4"
        />
        <div className="absolute top-36 left-93 border-4 border-white rounded-full">
          <Avatar githubHandle="sitebase" size={150} round="50%" />
        </div>
        <div className="text-right mt-2">
          {profile?._id === user?._id ? (
            <button className="px-4 py-2 border border-gray-200 hover:bg-gray-200/60 hover:cursor-pointer rounded-full text-base">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={isFollowing ? unfollowHandler : followingHandler}
              className={`px-4 py-2 rounded-full text-base ${
                isFollowing
                  ? "bg-gray-200 text-black hover:bg-gray-300"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="m-6 space-y-0.5">
          <h1 className="font-bold text-lg">{profile?.name}</h1>
          <p className="text-gray-500">{profile?.username}</p>
          <p>
            Pre Final year @Jadavpur University | solved 400+ questions on
            leetcode || 2⭐️ Codechef || (994 @ Codeforces) || Front End
            Developer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
