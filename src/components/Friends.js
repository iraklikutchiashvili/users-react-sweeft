import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard";
import uuid from "react-uuid";
import useInfiniteScroll from "../hook/useInfiniteScroll";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [page] = useInfiniteScroll(fetchData);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/30`
      );
      response.data.pagination.nextPage !== null &&
        setFriends((prev) => [...prev, ...response.data.list]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {friends.map((friend) => {
        return <UserCard key={uuid()} userData={friend} />;
      })}
    </>
  );
};

export default Friends;
