import React from "react";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        );
        dispatch(getUser(res?.data?.user));
        setEmail("");
        setPassword("");
        if (res.data.success) {
          navigate("/home");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log("Login error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Login failed");
      }
    } else {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          {
            name,
            username,
            email,
            password,
          },
          {
            withCredentials: true,
          },
        );
        setName("");
        setEmail("");
        setPassword("");
        setUserName("");
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(
          "Registration error:",
          error.response?.data || error.message,
        );
        toast.error(error.response?.data?.message || "Registration failed");
      }
    }
  };
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
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form
            onSubmit={submitHandler}
            className="flex flex-col space-y-4 w-[60%]"
          >
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="outline-blue-500 border border-gray-400 px-4 py-2 rounded-full"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  className="outline-blue-500 border border-gray-400 px-4 py-2 rounded-full"
                />
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="outline-blue-500 border border-gray-400 px-4 py-2 rounded-full"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-blue-500 border border-gray-400 px-4 py-2 rounded-full"
            />
            <div className="w-full text-center">
              <button className="w-full bg-[#1d98f0] py-2 rounded-full text-gray-800">
                {isLogin ? "Login" : "Create Account"}
              </button>
            </div>
          </form>

          <div className="my-2 text-gray-600">
            {isLogin ? "Don't have a account" : "Already have a account"}
            <span
              className="text-blue-600 hover:underline ml-2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
