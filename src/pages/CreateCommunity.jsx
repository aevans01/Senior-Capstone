import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateCommunity() {
  const navigate = useNavigate();

  //Hooks for all variables passed
  const [name, setName] = useState("");
  const NAME = name;

  const [description, setDescription] = useState("");
  const DESCRIPTION = description;

  function print() {
    console.log(name);
    console.log(description);
  }

  function insert() {
    console.log(name);
    Axios.post("http://localhost:3001/createCommunity", {
      NAME: name,
      DESCRIPTION: description,
    }).then((response) => {
      console.log("Result: ", response);
    });

    navigate("/CommunityList");
  }

  return (
    <div className="registerContainer">
      <div className="registerFormContainer">
        <h2>Create your Community</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Community Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
              placeholder="Enter community name here."
            />
            <br></br>
            <Form.Label>Description</Form.Label>
            <textarea
              onChange={(e) => {
                e.preventDefault();
                setDescription(e.target.value);
              }}
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder="Enter a description here."
            ></textarea>{" "}
            <br></br>
          </Form.Group>
        </Form>
        <Button
          onClick={(e) => insert()}
          className="registerBtn"
          variant="primary"
        >
          Create Community
        </Button>
      </div>
    </div>
  );
}

export default CreateCommunity;
