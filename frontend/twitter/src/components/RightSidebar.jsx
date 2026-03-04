import React from "react";
import { IoSearch } from "react-icons/io5";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const { otherUsers } = useSelector((store) => store.user);
  return (
    <div className="w-[30%]">
      <div className="flex flex-col space-y-4">
        <div>
          <div className="w-full border border-gray-200 rounded-full px-4 py-2">
            <div className="flex gap-2">
              <IoSearch className="w-6 h-6" />
              <input
                type="text"
                placeholder="Search"
                className="border-none outline-none font-md text-gray-600"
              />
            </div>
          </div>
        </div>
        <div className="w-full border border-gray-200 rounded-lg px-4 py-2 space-y-3 bg-gray-200/20">
          <h1 className="font-bold">Who to follow</h1>
          <div className="flex flex-col space-y-4">
            {otherUsers?.map((user, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <div className="flex">
                    <Avatar name="Wim Mostmans" size="30" round={true} />
                    <div className="flex flex-col ml-1">
                      <h2 className="font-bold text-sm">{user?.name}</h2>
                      <p className="text-gray-400 text-xs">{`@${user.username}`}</p>
                    </div>
                  </div>
                  <div>
                    <Link to={`/profile/${user?._id}`}>
                      <button className="px-2 py-1 bg-black rounded-full text-white">
                        Profile
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
