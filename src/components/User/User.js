import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "./UserActivity";
import { GetWithAuth } from "../../services/HttpService";

function User() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const getUser = () => {
    GetWithAuth("/users/" + userId)
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
      {user ? (
        <Avatar
          userId={user.id}
          avatarId={user.avatarId}
          userName={user.userName}
        />
      ) : (
        ""
      )}
      {localStorage.getItem("currentUser") == userId ? (
        <UserActivity userId={userId} />
      ) : (
        ""
      )}
    </div>
  );
}

export default User;