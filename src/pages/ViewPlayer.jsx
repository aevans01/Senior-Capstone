import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import "../components/layout/ViewPlayer.Module.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState, useEffect } from "react";
import Axios from "axios";
import cardimg from "../assets/login.png";

function ViewPlayer(props) {
  const navigate = useNavigate();
  const lOut = () => {
    props.logout();
    props.setUserData(null);
    props.setArr(null);
    props.setUserName(null);
    navigate("/");
    refreshPage();
  };
  const [seasonID, setSeasonID] = useState("");
  const [value, setValue] = useState("--Select Season--");
  const [seasons, setSeasons] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const user = props.arr[0];
  const array = localStorage.getItem("arr").split(",");
  const [profilePic, setProfilePic] = useState("");
  const params = useParams();
  const [profile, setProfile] = useState([]);
  

  useEffect(() => {
    Axios.get("http://localhost:3001/seasons").then((res) => {
      setSeasons(res.data);
    });
    console.log("username passed ==> ",params.username);
  }, []);

  useEffect(() => {
    console.log("params => ",params.username);
    Axios.post(`http://localhost:3001/viewProfile/${params.username}`,{
    }).then((res) => {
      console.log("useEffect res.data ==> ", res.data)
      setProfile(res.data[0]);
      localStorage.setItem("PastTournamentsUserID",res.data[0].USERID)
    });
  }, []);
  

  function test(seasonID) {
    Axios.post("http://localhost:3001/tournaments/seasons", {
      userId: profile.USERID,
      seasonId: seasonID,
    }).then((res) => {
      setTournaments(res.data);
    });
  }

  function startDate(dateTimeObj) {
    const test = dateTimeObj.split(/[- :]/);
    const time = new Date(
      Date.UTC(test[0], test[1] - 1, test[2], test[3], test[4], test[5])
    );
    return test[1] + "-" + test[2].substr(0, 2) + "-" + test[0];
  }
  function aFunction(asdf) {
    test(asdf);
    setSeasonID(asdf);
    console.log(seasonID);
  }
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
  const handleChange = (e) => {
    setValue(e);
  };
  function header(){
    if(value === "--Select Season--"){
      return;
    }else{
      return `Tournaments Played For ${value}`
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }
  
  const userName = props.arr[1];

  return (
    <div className="viewPlayerContainer">
      <div className="playerContainer">
        <Card border="dark" style={{ width: "22rem" }}>
          <Card.Img src={profile.PROFILEPIC} />
          <Card.Body>
            <Card.Title className="text-center">{profile.USERNAME}</Card.Title>
            <Card.Text className="text-center">Elo: {profile.ELO}</Card.Text>
            <ButtonGroup vertical>
              <Button
                onClick={(e) => navigate(`/ViewStats/${profile.USERNAME}`)}
                className="viewStats"
                variant="primary"
              >
                View Stats
              </Button>
              <Button
                onClick={(e) => navigate(`/PastTournaments/${profile.USERNAME}`)}
                className="tournaments"
                variant="primary"
              >
                Tournaments
              </Button>
              <Button onClick={lOut}>Logout</Button>
              <DropdownButton
                className="seasonButton"
                title={value}
                onSelect={handleChange}
                drop="bottom"
              >
                {seasons.map((index, i) => {
                  return (
                    <Dropdown.Item
                      eventKey={index.SEASONNAME}
                      onClick={() => aFunction(index.SEASONID)}
                    >
                      {index.SEASONNAME}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </div>
      <div className="seasonTournamentsContainer">
        <h3>{header()}</h3>
        <div className="row row-cols-1 row-cols-md-3 g-2">
          {tournaments.map((index, i) => {
            return (
              <div className="col">
                  <Card className="card">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewPlayer;
