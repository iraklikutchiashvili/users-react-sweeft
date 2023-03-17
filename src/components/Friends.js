import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard";
import uuid from "react-uuid";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/30`
        );
        setFriends((prev) => [...prev, ...response.data.list]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight + 1;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [friends]);

  return (
    <>
      {friends.map((friend) => {
        return <UserCard key={uuid()} userData={friend} />;
      })}
    </>
  );
};

export default Friends;
