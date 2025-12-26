import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed && feed.length === 0) {
    return <h1 className="flex justify-center my-10">No new users found!</h1>;
  }

  return (
    <div className="flex justify-center my-10">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
