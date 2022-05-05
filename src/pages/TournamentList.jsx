import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import cardimg from "../assets/login.png";
<script src="/path/to/infinite-scroll.pkgd.min.js"></script>;

function TournamentList(props) {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [tourneyImage, setTourneyImage] = useState([]);
  const [tournID, setTournID] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getTourneys").then((res) => {
      console.log(res.data.length);
      setTournaments(res.data);
      localStorage.setItem("tourneyName", res.data.NAME);
      setTournID(res.data.TOURNEYID);
      for (let i = 0; i < res.data.length; i++) {
        tourneyImage.push(res.data[i].IMAGE);
        setTourneyImage(tourneyImage);
      }
      console.log(tourneyImage.lenth);
    });
  }, [tournID]);

  function sendID(tourneyID) {
    Axios.post("http://localhost:3001/sendID", {
      TOURNEYID: tournID,
    }).then((response) => {
      console.log("Result: ", response);
    });
    navigate("/EditTournament");
  }

  function goToBrackets() {
    navigate("/Brackets");
  }

  function goToAddPlayers() {
    navigate("/AddPlayers");
  }

  function test(){
    // console.log(tourneyImage);
    return tourneyImage;
  }

  return (
    <>
      <div>
        <div className="loginBanner banner">
          <h1 className="bannerText">Tournaments</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-5 g-3">
          {tournaments.map((index, i) => {
            return (
              <div className="col">
                <div className="card h-10">
                  <Card>
                    <Card.Img src={tourneyImage[i]} />
                    <Card.Body>
                      <Card.Title className="" style={{ color: "limegreen" }}>
                        {index.NAME}
                      </Card.Title>
                      <Card.Text className=""></Card.Text>
                      <p>Format: {index.FORMAT}</p>
                      <p>Description: {index.DESCRIPTION}</p>
                      <p>Start Date: {new Date(index.STARTTIME).toUTCString()}</p>
                      <p>Max Players: {index.MAXPLAYER}</p>
                      <br></br>
                      <ButtonGroup vertical>
                        <Button
                          className=""
                          variant="primary"
                          onClick={() => {
                            localStorage.setItem("tourneyID", index.TOURNEYID);
                            goToBrackets();
                          }}
                        >
                          View Matches
                        </Button>
                        <Button
                          onClick={() => {
                            sendID(index.TOURNEYID);
                          }}
                          className=""
                          variant="primary"
                        >
                          Edit Tournament
                        </Button>
                        <Button
                          onClick={() => {
                            localStorage.setItem("tourneyID", index.TOURNEYID);
                            goToAddPlayers();
                          }}
                        >
                          Add Players
                        </Button>
                      </ButtonGroup>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TournamentList;
