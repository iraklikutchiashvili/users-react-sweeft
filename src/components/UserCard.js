import { Link } from "react-router-dom";

const UserCard = (props) => {
  const { name, lastName, prefix, title, imageUrl, id } = props.userData;
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Link to={`/user/${id}`}>
      <div className="user-box" onClick={handleClick}>
        <img className="img" src={imageUrl} alt="user-image" />
        <b>
          {prefix}
          {name} {lastName}
        </b>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default UserCard;
