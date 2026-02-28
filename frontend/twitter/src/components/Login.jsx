import React from "react";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <FaXTwitter className="w-70 h-70" />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-7xl">Happening now</h1>
          </div>
          <h2 className="font-semibold text-3xl my-7">
            {isLogin ? "Sign up" : "Login"}
          </h2>
          <form className="flex flex-col space-y-4 w-[60%]">
            {isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="outline-blue-500 border border-gray-400 px-4 py-2 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="outline-blue-500 border border-gray-400 px-4 py-2 rounded-full"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              className="outline-blue-500 border border-gray-400 px-4 py-2 rounded-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="outline-blue-500 border border-gray-400 px-4 py-2 rounded-full"
            />
            <div className="w-full text-center">
              <button className="w-full bg-[#1d98f0] py-2 rounded-full text-gray-800 text-white">
                {isLogin ? "Create Account" : "Login"}
              </button>
            </div>
          </form>

          <div className="my-2 text-gray-600">
            {isLogin ? "Already have an account" : "Don't have a account"}
            <span
              className="text-blue-600 hover:underline ml-2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Login" : "sign up"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
