import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Friends from "./Friends";
import uuid from "react-uuid";

const User = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [prevUser, setPrevUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
        );
        setUserDetails((prevData) => ({
          ...prevData,
          ...response.data,
        }));
        setPrevUser((prev) => [...prev, response.data]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="user-content">
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <div className="user-details">
          <img className="img" src={userDetails.imageUrl} alt="user-image" />
          <fieldset className="info">
            <legend>Info</legend>
            <b>
              {userDetails.prefix}
              {userDetails.name} {userDetails.lastName}
            </b>
            <p>{userDetails.title}</p>
            <p style={{ marginTop: "50px" }}>
              Email Address: {userDetails.email}
            </p>
            <p>Ip Address: {userDetails.ip}</p>
            <p>Job Area: {userDetails.jobArea}</p>
            <p>Job Type: {userDetails.jobType}</p>
          </fieldset>
          <fieldset className="address">
            <legend>Address</legend>
            <b>
              {userDetails.company.name} {userDetails.company.suffix}
            </b>
            <p>City: {userDetails.address.city}</p>
            <p>Country: {userDetails.address.country}</p>
            <p>State: {userDetails.address.state}</p>
            <p>Street Address: {userDetails.address.streetAddress}</p>
            <p>ZIP: {userDetails.address.zipCode}</p>
          </fieldset>
        </div>
      )}

      <div className="prev-username">
        {prevUser.map((prevUser) => (
          <Link key={uuid()} to={`/user/${prevUser.id}`}>
            {prevUser.prefix}
            {prevUser.name} {prevUser.lastName}
            {"  >  "}
          </Link>
        ))}
      </div>
      <h1 style={{ marginTop: "100px" }}>Frends: </h1>
      <div className="friends">
        <Friends />
      </div>
    </div>
  );
};

export default User;
