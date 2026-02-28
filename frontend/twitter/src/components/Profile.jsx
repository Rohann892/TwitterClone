import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const Profile = () => {
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
            <h1 className="font-bold text-lg">Rohan</h1>
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
          <button className="px-4 py-2 border border-gray-200 hover:bg-gray-200/60 hover:cursor-pointer rounded-full text-base">
            Edit Profile
          </button>
        </div>
        <div className="m-6 space-y-0.5">
          <h1 className="font-bold text-lg">Rohan Lal</h1>
          <p className="text-gray-500">@noob_coder</p>
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
