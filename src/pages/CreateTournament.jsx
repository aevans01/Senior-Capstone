import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTournament() {
  const navigate = useNavigate();

  //Hooks for all variables passed
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

  

  const images = new Array();
  images[0] = new Image();
  images[0].src = "tourneyImages/images1.jpg";
  images[1] = new Image();
  images[1].src = "tourneyImages/images2.jpg";
  images[2] = new Image();
  images[2].src = "tourneyImages/images3.jpg";
  images[3] = new Image();
  images[3].src = "tourneyImages/images4.jpg";
  images[4] = new Image();
  images[4].src = "tourneyImages/images5.jpg";
  images[5] = new Image();
  images[5].src = "tourneyImages/images6.jpg";
  images[6] = new Image();
  images[6].src = "tourneyImages/images7.jpg";
  images[7] = new Image();
  images[7].src = "tourneyImages/images8.jpg";
  images[8] = new Image();
  images[8].src = "tourneyImages/images9.jpg";
  images[9] = new Image();
  images[9].src = "tourneyImages/images10.jpg";

  function ChooseImage(){
    var randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex].src + "";
  }
  function print() {
    console.log(name);
    console.log(format);
    console.log(description);
    console.log(startDate.toISOString().slice(0, 19).replace("T", " "));
    console.log(maxPlayer);
  }

      function discordHook() {
        const formattedDate = new Date(startDate).toUTCString();
        Axios.post(
          "https://discord.com/api/webhooks/960752096314007572/F4IUIEcR4rllDZtQDVLy5sojLWrj9hxP_6ClQcNvU60w07wnZ0RoKN4bDcI5Mb0ajCOC",
          {
            content: "",
            embeds: [
              {
                title: "New Tournament Created!",
                fields: [
                  {
                    name: "Tournament Name:",
                    value: name,
                    inline: true,
                  },
                  {
                    name: "Start Date:",
                    value: formattedDate,
                    inline: true,
                  },
                  {
                    name: "Description",
                    value: description,
                    inline: false,
                  },
                ],
              },
            ],
          }
        );
      };

  function insert() {
    const aray = localStorage.getItem("arr").split(",");
    console.log(name);
    let image = ChooseImage();
    console.log(image)
    Axios.post("http://localhost:3001/createTourney", {
      NAME: name,
      FORMAT: format,
      DESCRIPTION: description,
      STARTDATE: startDate.toISOString().slice(0, 19).replace("T", " "),
      MAXPLAYER: maxPlayer,
      IMAGE: image.substring(21)
    }).then((response) => {
      console.log("Result: ", response);
    });
    
    navigate("/TournamentList");
    discordHook();
  }

  return (
    <div className="registerContainer">
      <div className="registerFormContainer">
        <h2>Create a Tournament</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tournament Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
              placeholder="Enter tournament name here."
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
          onClick={(e) => insert()}
          className="registerBtn"
          variant="primary"
        >
          Create Tournament
        </Button>
      </div>
    </div>
  );
}

export default CreateTournament;
