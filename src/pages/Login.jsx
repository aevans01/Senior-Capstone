import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ authenticate, setUserData, setArr, setUserName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [uData, setUData] = useState([]);

  const navigate = useNavigate();

  const login = () => {
    Axios.post("http://localhost:3001/emailLogin", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
        console.log(response.data.message);
      } else {
        //a user was returned from our API call
        setLoginStatus(response.data[0].USERNAME);
        setUData(response.data);
        setUserData(response.data[0]);
        setArr(Object.values(response.data[0]));
        setUserName(response.data[0].USERNAME);
        authenticate();
        refreshPage();
      }
    });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="loginContainer">
      <div className="loginBanner banner">
        <h1 className="bannerText">Login</h1>
      </div>
      <div className="formContainer">
        <h2>Welcome Back!</h2>

        <>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  //this below stops the function from reloading the page
                  setEmail(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  //this below stops the function from reloading the page
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <div className="loginButton"></div>
          </Form>
          <Button
            className="loginBtn"
            variant="primary"
            type="submit"
            onClick={login}
          >
            Login
          </Button>
          <div>
            {uData.map((user, idx) => {
              return (
                <p key={idx}>
                  {user.user_id}, {user.username}, {user.firstName},{" "}
                  {user.lastName}
                </p>
              );
            })}
          </div>
        </>
      </div>
    </div>
  );
}
export default Login;
