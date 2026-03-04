import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { IoBookmarksSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
import { getAllTweets } from "../redux/tweetSlice";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHadler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        dispatch(getUser(null));
        dispatch(getOtherUsers([]));
        dispatch(getMyProfile(null));
        dispatch(getAllTweets([]));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.log(error);
    }
  };
  return (
    <div className="w-[20%]">
      <div className="flex flex-col items-start bg-gray-100/70 rounded-md p-2">
        <div>
          <FaXTwitter className="w-8 h-8" />
        </div>
        <div className="flex flex-col my-4">
          <Link
            to={"/home"}
            className="flex my-2 px-4 py-2 hover:bg-gray-200/60 hover:cursor-pointer rounded-full"
          >
            <IoMdHome className="w-6 h-6" />
            <h2 className="font-bold text-lg ml-4">Home</h2>
          </Link>
          <div className="flex my-2 px-4 py-2 hover:bg-gray-200/40 hover:cursor-pointer rounded-full">
            <IoSearch className="w-6 h-6" />
            <h2 className="font-bold text-lg ml-4">Search</h2>
          </div>
          <div className="flex my-2 px-4 py-2 hover:bg-gray-200/40 hover:cursor-pointer rounded-full">
            <IoNotificationsOutline className="w-6 h-6" />
            <h2 className="font-bold text-lg ml-4">Notification</h2>
          </div>
          <div className="flex my-2 px-4 py-2 hover:bg-gray-200/40 hover:cursor-pointer rounded-full">
            <MdOutlineMessage className="w-6 h-6" />
            <h2 className="font-bold text-lg ml-4">Message</h2>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className="flex my-2 px-4 py-2 hover:bg-gray-200/40 hover:cursor-pointer rounded-full"
          >
            <CgProfile className="w-6 h-6" />
            <h2 className="font-bold text-lg ml-4">Profile</h2>
          </Link>
          <div className="flex my-2 px-4 py-2 hover:bg-gray-200/40 hover:cursor-pointer rounded-full">
            <IoBookmarksSharp className="w-6 h-6" />
            <h2 className="font-bold text-lg ml-4">Bookmarks</h2>
          </div>
          <div
            onClick={logOutHadler}
            className="flex my-2 px-4 py-2 hover:bg-gray-200/40 hover:cursor-pointer rounded-full"
          >
            <MdLogout className="w-6 h-6" />
            <h2 className="font-bold text-lg ml-4">Logout</h2>
          </div>
        </div>
        <button className="w-full bg-blue-700/70 px-6 py-2 rounded-full font-medium text-white hover:bg-blue-700/80 hover:cursor-pointer border-none">
          Post
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
