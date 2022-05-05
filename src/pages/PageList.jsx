import React from "react";
import { Link } from "react-router-dom";

function PageList() {
  return (
    <div className="pageListContainer">
      <ul>
        <li>
          <Link to="/Login">Login Page</Link>
        </li>
        <li>
          <Link to="/ViewPlayer">View Player Page</Link>
        </li>
        <li>
          <Link to="/ForgotPassword">Forgot Password Page</Link>
        </li>
        <li>
          <Link to="/ViewProfile">View Profile Page</Link>
        </li>
        <li>
          <Link to="/JustATestFile">test123</Link>
        </li>
        <li>
          <Link to="/SecondPage">Another test Page</Link>
        </li>
      </ul>
    </div>
  );
}

export default PageList;
