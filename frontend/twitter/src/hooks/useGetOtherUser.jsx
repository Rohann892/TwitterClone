import axios from "axios";
import { useEffect } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useGetOtherUser = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    const fetchOtherUsers = async () => {
      const res = await axios.get(`${USER_API_END_POINT}/getOtherUser/${id}`, {
        withCredentials: true,
      });
      dispatch(getOtherUsers(res?.data?.otherUser));
    };
    fetchOtherUsers();
  }, [id]);
};

export default useGetOtherUser;
