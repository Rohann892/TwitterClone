import React from "react";
import Avatar from "react-avatar";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { AiFillDislike } from "react-icons/ai";

const Tweet = () => {
  return (
    <div className="p-4 border-b border-b-gray-200">
      <div>
        <div className="flex items-start">
          <Avatar name="Wim Mostmans" size="50" round={true} />
          <div className="ml-2 w-full">
            <div className="flex items-center gap-1">
              <h1 className="font-bold">Rohan</h1>
              <p className="text-gray-500 text-sm">@rohann_07</p>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
                laudantium, cumque, dignissimos harum fuga, neque ullam placeat
                error ab omnis aliquid deserunt reiciendis repellendus tenetur
                distinctio? Nesciunt quae debitis maxime.
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <div className="hover:bg-green-200 hover:cursor-pointer rounded-full px-2 py-2">
                  <AiFillLike className="w-6 h-6" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="hover:bg-green-200 hover:cursor-pointer rounded-full px-2 py-2">
                  <FaRegCommentDots className="w-6 h-6" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="hover:bg-green-200 hover:cursor-pointer rounded-full px-2 py-2">
                  <AiFillDislike className="w-6 h-6" />
                </div>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
