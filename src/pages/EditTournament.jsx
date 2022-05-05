import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditTournament() {
  //Hooks for all variables passed
  const [tourneyID, setTourneyID] = useState("");
  const TOURNEYID = tourneyID;

  const [name, setName] = useState("");
  const NAME = name;

  const [format, setFormat] = useState("");
  const FORMAT = format;

  const [description, setDescription] = useState("");
  const DESCRIPTION = description;

  const [startDate, setStartDate] = useState(new Date());
  const STARTDATE = startDate;

  const [maxPlayer, setMaxPlayer] = useState("");
  const MAXPLAYER = maxPlayer;

  const [tournaments, setTournaments] = useState([]);

  let flag = false;

  function editTourney() {
    Axios.post("http://localhost:3001/editTourney", {
      TOURNEYID: tourneyID,
      NAME: name,
      FORMAT: format,
      DESCRIPTION: description,
      STARTDATE: startDate.toISOString().slice(0, 19).replace("T", " "),
      MAXPLAYER: maxPlayer,
    }).then((response) => {
      console.log("Result: ", response);
    });
  }

  return (
    <div className="registerContainer">
      <div className="registerFormContainer">
        <h2>Edit Tournament</h2>
        <Form>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tournament ID</Form.Label>
              <Form.Control
                onChange={(e) => {
                  e.preventDefault();
                  setTourneyID(e.target.value);
                }}
                placeholder="Name"
              />
              <br></br>
              <Form.Label>Tournament Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                placeholder="Name"
              />
              <br></br>
              <Form.Label>Tournament Format</Form.Label>
              <Form.Select
                onChange={(e) => {
                  e.preventDefault();
                  setFormat(e.target.value);
                }}
                aria-label="Default select example"
              >
                <option>Please select a Format</option>
                <option value="Single-Elimination">Single-Elimination</option>
                <option value="Double-Elimination">Double-Elimination</option>
                <option value="Round Robin">Round Robin</option>
              </Form.Select>
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
              <Form.Label>Start Date and Time</Form.Label>
              <div
                class="md-form md-outline input-with-post-icon datepicker"
                inline="true"
              >
                <DatePicker
                  class="datetime-picker"
                  wrapperClassName="date_picker full-width"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
              <br></br>
              <Form.Label>Maximum Amount of Players</Form.Label>
              <Form.Control
                onChange={(e) => {
                  e.preventDefault();
                  setMaxPlayer(e.target.value);
                }}
                type="email"
                placeholder="Enter the maximum amount of players allowed. (Leave blank if N/A)"
              />
              <br></br>
            </Form.Group>
          </Form>
          <Button
            onClick={(e) => editTourney()}
            className="registerBtn"
            variant="primary"
          >
            Edit Tournament
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditTournament;
