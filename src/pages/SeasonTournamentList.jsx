import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import profile from "../assets/blank-profile-picture.png";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router-dom";
import "../components/layout/ViewPlayer.Module.css";
import Axios from "axios";
import cardimg from "../assets/login.png";

function SeasonTournamentList() {
  const [seasonId, setSeasonId] = useState();
  const [seasons, setSeasons] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    setSeasonId(localStorage.getItem("seasonID"));
    console.log(seasonId);
    Axios.post("http://localhost:3001/tournaments/season", {
      seasonId: localStorage.getItem("seasonID"),
    }).then((res) => {
      setTournaments(res.data);
      console.log(res.data);
    });
  }, []);

  function startTime(dateTimeObj) { 
    const test = dateTimeObj.split(/[- :]/);
    const time = new Date(
      Date.UTC(test[0], test[1] - 1, test[2], test[3], test[4], test[5])
    );
    const hour = test[2].substr(3, 4);
    if (parseInt(hour) - 6 >= 12) {
      return ((test[2].substr(3, 4) - 6) % 12) + ":" + test[3] + " P.M";
    } else {
      return ((test[2].substr(3, 4) - 6) % 12) + ":" + test[3] + " A.M";
    }
  }

  function startDate(dateTimeObj) {
    const test = dateTimeObj.split(/[- :]/);
    const time = new Date(
      Date.UTC(test[0], test[1] - 1, test[2], test[3], test[4], test[5])
    );
    return test[1] + "-" + test[2].substr(0, 2) + "-" + test[0];
  }

  return (
    <div className="seasonTournamentListContainer">
      <h3>Tournaments played for {localStorage.getItem("seasonName")}</h3>
      <div className="row row-cols-1 row-cols-md-3 g-2">
        {tournaments.map((index, i) => {
          return (
            <div className="col">
              <div className="card h-100">
                <Card>
                  <Card.Img src={cardimg} />
                  <Card.Body>
                    <Card.Title className="">{index.NAME}</Card.Title>
                    <Card.Text className="">
                      <h3 style={{ color: "limegreen" }}></h3>
                      <p>Location: {index.LOCATION}</p>
                      <p>Start Time: {startTime(index.STARTTIME)}</p>
                      <p>Start Date: {startDate(index.STARTTIME)}</p>
                      <p></p>
                    </Card.Text>
                    <ButtonGroup vertical>
                      <Button className="" variant="primary">
                        View Bracket
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
  );
}

export default SeasonTournamentList;
