import React from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";

const CreatePost = () => {
  return (
    <div className="w-50%">
      <div className=" border-b border-b-gray-200">
        <div className="flex items-center justify-evenly border-b border-b-gray-200">
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center p-4 rounded-md">
            <h2 className="font-medium text-gray-700 text-lg">For you</h2>
          </div>
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center p-4 rounded-md">
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
            <button className="bg-[#1d98f0] px-4 py-2 border-none rounded-full text-white text-right">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
