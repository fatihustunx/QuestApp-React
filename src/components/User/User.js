import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "./UserActivity";

function User() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const getUser = () => {
    fetch("/users/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setUser(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {user ? <Avatar avatarId={user.avatarId} /> : ""}
      <UserActivity userId={userId} />
    </div>
  );
}

export default User;
