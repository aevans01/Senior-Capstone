import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Axios from "axios";
import Popup from "../components/layout/Popup";

function Brackets() {
  const [players, setPlayers] = useState([]);
  const [top, setTop] = useState([]);
  const [bottom, setBottom] = useState([]);
  const [topID, setTopID] = useState([]);
  const [bottomID, setBottomID] = useState([]);
  const [matches, setMatches] = useState([]);
  const [tournID, setTournID] = useState();
  const [plID, setPlID] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [focusedMatch, setFocusedMatch] = useState("");
  const [focusedTop, setFocusedTop] = useState("");
  const [focusedBottom, setFocusedBottom] = useState("");
  const [focusedTopPlayID, setFocusedTopPlayID] = useState("");
  const [focusedBottomPlayID, setFocusedBottomPlayID] = useState("");
  const [winnerIDs, setWinnerIDs] = useState([]);
  const [winnerNames, setWinnerNames] = useState([]);

  //get the tourney ID
  useEffect(() => {
    setTournID(localStorage.getItem("tourneyID"));
  }, [tournID]);

  function refreshPage() {
    window.location.reload(false);
  }

  //get all the players for this tourney
  useEffect(() => {
    const tournID = localStorage.getItem("tourneyID");

    Axios.post("http://localhost:3001/getTourneyPlayers", {
      TOURNEYID: tournID,
    }).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        players.push(res.data[i].username);
      }
      localStorage.setItem("playerNames", players);
      const pl = players;
      for (let i = 0; i < pl.length; i++) {
        Axios.post("http://localhost:3001/getUserByName", {
          username: pl[i],
        }).then((res) => {
          console.log("res --> ",res.data)
          plID.push(res.data[0].userid);
          localStorage.setItem("playID", plID);
        });
      }

      let ii = localStorage.getItem("playID").split(",");
      if (ii.length !== pl.length) {
        console.log("THEY ARE NOT EQUAL!");
      } else {

        // Note: after this axios call, the ID's WILL NOT come back in order, so below we re-arrange them back to ascending order.
        ii.sort((a, b) => a - b);
        console.log("heres players",pl)
        for (let i = 0; i < pl.length; i++) {
          if (i % 2 === 0) {
            top.push(pl[i]);
            topID.push(ii[i]);
          }
          if (i % 2 === 1) {
            bottom.push(pl[i]);
            bottomID.push(ii[i]);
          }
        }
        
        let quo = ~~(players.length / 2);
        let rem = players.length % 2;
        let tot = quo + rem;
        Axios.post("http://localhost:3001/getMatch", {
          TOURNEYID: tournID,
        }).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            matches.push(res.data[i].MATCHID);
            winnerIDs.push(res.data[i].WINNERID);
            setWinnerIDs(winnerIDs);
          }
          console.log("mom ",res.data);
          console.log("wienerid",winnerIDs);
          localStorage.setItem("matches", matches);
          checkAndCreate(tot);
        });
      }
    });
  }, []);

  function checkAndCreate(tot) {
    if (matches.length <= 0) {
      console.log("matches do not exist yet.");
      const tournID = localStorage.getItem("tourneyID");
      for (let i = 0; i < tot; i++) {
        var theDate = new Date();
        var theTime = `${theDate.getHours()}:${theDate.getMinutes()}:${theDate.getSeconds()}`;
        Axios.post("http://localhost:3001/createMatch", {
          TOURNEYID: tournID,
          time: theTime,
        }).then((res) => {
          console.log("inside create match ",res.data)
          matches.push(res.data.insertId);
          setMatches(matches);
          localStorage.setItem("matches", matches);
          let temp = res.data.insertId;
          console.log("top --> ",topID);
          console.log("bottom --> ",bottomID);
          console.log("temp --> ", temp);
          Axios.post("http://localhost:3001/createBridgeMatch", {
            matchID: temp,
            userID: topID[i],
          }).then((res) => {
          });
          if (bottomID[i] !== undefined) {
            Axios.post("http://localhost:3001/createBridgeMatch", {
              matchID: temp,
              userID: bottomID[i],
            }).then((res) => {
            });
          }
        });
      }
    } else {
      console.log("matches should exist");
      let mm = localStorage.getItem("matches").split(",");
    }
    setMatches(localStorage.getItem("matches").split(","));
    getWinnerNames();
  }

  function printMatch(match, topPl, bottomPl, topID, bottID) {
    console.log("match --> ",match);
    setFocusedMatch(match);
    setFocusedTop(topPl);
    setFocusedBottom(bottomPl);
    setShowPopup(true);
    setFocusedTopPlayID(topID);
    setFocusedBottomPlayID(bottID);
  }

  function updateWinner(winnerName, matchID, playid) {
    console.log("matchid --> ",matchID)
    Axios.post("http://localhost:3001/updateMatchByID", {
      MATCHID: matchID,
      winnerID: playid,
    }).then((res) => {
      console.log(res.data);
    });
  }

  function getWinnerNames() {
    console.log("heres weiners ",winnerIDs);
    for (let i = 0; i < winnerIDs.length; i++) {
      let tem = "";
      if (winnerIDs[i] !== null) {
        tem = winnerIDs[i].toString();
      } else {
        tem = "";
      }
      console.log("tem",tem)
      Axios.post("http://localhost:3001/getUserByID", {
        ID: tem,
      }).then((res) => {
        console.log("res.data",res.data);
        for (let i = 0; i < res.data.length; i++) {
          winnerNames.push(res.data[i].USERNAME);
          setWinnerNames(winnerNames);
        }
        if (res.data.length <= 0) {
          winnerNames.push("No Winner Yet!!!");
          setWinnerNames(winnerNames);
        }
        console.log("here are the names in order: ", winnerNames);
      });
    }
  }

  return (
    <div>
      <ButtonGroup>
        <Button onClick={() => refreshPage()}>Generate</Button>
      </ButtonGroup>
      <p style={{ color: "red" }}>
        ***If you do not see any matches presented, please hit the Generate
        Button TWICE.***
      </p>
      <div className="row row-cols-1 row-cols-md-4 g-3">
        {top.map((index, i) => {
          return (
            <div className="col">
              <div className="card h-10">
                <Card>
                  <Card.Body>
                    <Card.Title className="">
                      Match {i}: ID#: {matches[i]}
                    </Card.Title>
                    {winnerNames === null
                      ? "No winner yet!"
                      : `Winner: ${winnerNames[i]}`}
                    <Card.Text className=""></Card.Text>
                    <ListGroup.Item>{top[i]}</ListGroup.Item>
                    <ListGroup.Item>{bottom[i]}</ListGroup.Item>

                    <br></br>
                    <ButtonGroup vertical>
                    <Button
                        className=""
                        variant="primary"
                        onClick={() => {
                          printMatch(
                            matches[i],
                            top[i],
                            bottom[i],
                            topID[i],
                            bottomID[i]
                          );
                        }}
                      >
                        Update
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
      <Popup trigger={showPopup} setTrigger={setShowPopup}>
                <h3>Winner?</h3>
                <ButtonGroup style={{ paddingTop: "45px" }}>
                  <Button
                    onClick={() => {
                      updateWinner(focusedTop, focusedMatch, focusedTopPlayID);
                    }}
                  >
                    {focusedTop}
                  </Button>
                  <Button
                    onClick={() => {
                      updateWinner(
                        focusedBottom,
                        focusedMatch,
                        focusedBottomPlayID
                      );
                    }}
                  >
                    {focusedBottom}
                  </Button>
                </ButtonGroup>
              </Popup>
    </div>
  );
}

export default Brackets;
