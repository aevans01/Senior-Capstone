import React from "react";
import Card from "../components/ATestCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function SeasonCreation() {
  const navigate = useNavigate();
  const [seasonName, setSeasonName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [commID, setCommID] = useState("");
  const createSeason = () => {
    if (endDate < startDate) {
      console.log("End Date is before Start Date");
    } else {
      Axios.post("http://localhost:3001/createSeason", {
        name: seasonName,
        start: startDate,
        end: endDate,
        community: commID,
      }).then(navigate("../AdminSeasons"));
      
    }
  };
  return (
    <>
      <h1 className="bannerText">Season Creation</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Seaon Name:</Form.Label>
          <Form.Control
            placeholder="Enter Season Name"
            onChange={(e) => {
              setSeasonName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Start Date:</Form.Label>
          <DatePicker
            className="datetime-picker"
            wrapperClassName="date_picker full-width"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM dd, yyyy hh:mm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>End Date:</Form.Label>
          <DatePicker
            className="datetime-picker"
            wrapperClassName="date_picker full-width"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Community ID:</Form.Label>
          <Form.Control
            placeholder="Enter Community ID"
            onChange={(e) => {
              setCommID(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          className="seasonButton m-auto"
          variant="primary"
          type="submit"
          onClick={(e) => createSeason()}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default SeasonCreation;
