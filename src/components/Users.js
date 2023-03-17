import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = (page) => {
    axios
      .get(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/50`
      )
      .then((res) => res.data)
      .then((users) => {
        users.pagination.nextPage !== null &&
          setUsers((prev) => [...prev, ...users.list]);
      })
      .catch((err) => console.log(err));
  };

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
  }, [users]);

  return (
    <>
      {users.map((user) => (
        <UserCard key={user.id} userData={user} />
      ))}
    </>
  );
};

export default Users;
