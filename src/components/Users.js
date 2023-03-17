import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import axios from "axios";
import useInfiniteScroll from "../hook/useInfiniteScroll";
import uuid from "react-uuid";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page] = useInfiniteScroll(fetchData);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
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
  }

  return (
    <>
      {users.map((user) => (
        <UserCard key={uuid()} userData={user} />
      ))}
    </>
  );
};

export default Users;
