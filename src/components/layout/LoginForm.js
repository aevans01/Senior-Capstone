// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";

// function LoginForm(authenticate) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginStatus, setLoginStatus] = useState("");

//   const navigate = useNavigate();

//   const login = () => {
//     Axios.post("http://localhost:3001/emailLogin", {
//       email: email,
//       password: password,
//     }).then((response) => {
//       if (response.data.message) {
//         setLoginStatus(response.data.message);
//         console.log(response.data.message);
//       } else {
//         //a user was returned from our API call
//         setLoginStatus(response.data[0].username);
//         authenticate();
//         navigate("ViewPlayer");
//       }
//     });
//   };

//   return (
//     <>
//       <Form>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//           </Form.Text>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
//         <div className="loginButton"></div>
//       </Form>
//       <Button
//         className="loginBtn"
//         variant="primary"
//         type="submit"
//         onClick={login}
//       >
//         Login
//       </Button>
//       <div>{loginStatus}</div>
//     </>
//   );
// }

// export default LoginForm;
