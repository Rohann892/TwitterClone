import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useGetOtherUser from "../hooks/useGetOtherUser";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  useGetOtherUser(user?._id);
  useGetMyTweets(user?._id);
  return (
    <div className="flex justify-between w-[90%] mx-auto gap-4">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
};

export default Home;
