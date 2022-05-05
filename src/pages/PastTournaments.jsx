import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import cardimg from '../assets/login.png';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

function PastTournaments() {
    const params = useParams();
    const [profile, setProfile] = useState([]);
    const [tourneys, setTourneys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.post(`http://localhost:3001/viewProfile/${params.username}`,{
        }).then((res) => {
          console.log("useEffect res.data ==> ", res.data[0])
          setProfile(res.data[0]);
        });
      }, []); 

    useEffect(() => {
        const aray = localStorage.getItem("arr").split(",");
        console.log("userID -> ", profile.USERID);
        Axios.post("http://localhost:3001/getUsersTournaments",{
            userID: localStorage.getItem("PastTournamentsUserID")
        }).then((res) => {
            setTourneys(res.data);
            console.log("tourneys ", res.data);
        })
    },[])
    

    function sendID(tourneyID) {
        Axios.post("http://localhost:3001/sendID", {
          TOURNEYID: profile.TOURNEYID,
        }).then((response) => {
          console.log("Result: ", response);
        });
        navigate("/EditTournament");
      }


    return (
        <div className="PastTournamentsContainer">
            <div className="banner">
                <h1 className="bannerText">{profile.USERNAME}'s  Tournaments</h1>
            </div>
            <div className="row row-cols-1 row-cols-md-5 g-3">
          {tourneys.map((index, i) => {
            return (
              <div className="col">
                <div className="card h-10">
                  <Card>
                    <Card.Img src={index.IMAGE} />
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
                          onClick={(e) => {navigate("/Brackets")}}
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
                            navigate("/AddPlayers");
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
    )
}

export default PastTournaments;