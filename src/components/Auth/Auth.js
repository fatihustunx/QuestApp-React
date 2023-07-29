import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostWithoutAuth } from "../../services/HttpService";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const sendRequest = (path) => {
    PostWithoutAuth("/auth/" + path, {
      userName: username,
      password: password,
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.accessToken);
        localStorage.setItem("refreshKey", result.refreshToken);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      })
      .then((err) => console.log(err));
  };

  const handleButton = (path) => {
    sendRequest(path);
    setUsername("");
    setPassword("");
    navigate(0);
  };

  return (
    <FormControl>
      <InputLabel style={{ top: 20 }}>Username</InputLabel>
      <Input
        style={{ top: 10 }}
        onChange={(i) => handleUsername(i.target.value)}
      />
      <InputLabel style={{ top: 80 }}>Password</InputLabel>
      <Input
        style={{ top: 20 }}
        onChange={(i) => handlePassword(i.target.value)}
      />
      <Button
        variant="contained"
        style={{
          marginTop: 40,
          background: "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
          color: "white",
        }}
        onClick={() => handleButton("register")}
      >
        Register
      </Button>
      <FormHelperText style={{ margin: 30 }}>
        Are you already registered?
      </FormHelperText>
      <Button
        variant="contained"
        style={{
          background: "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
          color: "white",
        }}
        onClick={() => handleButton("login")}
      >
        Login
      </Button>
    </FormControl>
  );
}

export default Auth;
