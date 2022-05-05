import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddPlayers() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [userIDs, setUserIDs] = useState([]);
  const [user, setUser] = useState("");
  const [tourneyPlayers, setTourneyPlayers] = useState([]);
  const [groupPlayerIDs, setGroupPlayerIDs] = useState([]);
  const [playerID, setPlayerID] = useState();
  const [mat, setMat] = useState([]);
  let u = [];

  useEffect(() => {
    if (users == null) {
      console.log("users is null");
      setUsers(null);
      setUserIDs([]);
    } else {
      getAll();
    }
  }, []);

  function grabUser(us) {
    setUser(us);
  }

  const getAll = () => {
    setUsers([]);
    Axios.post("http://localhost:3001/getAllUsers", {}).then((response) => {
      if (response.data.message) {
        console.log("there was an issue with get all");
        console.log(response.data.message);
      } else {
        //returned all users, from our API call hopefully
        for (let i = 0; i < response.data.length; i++) {
          setUsers((old) => [...old, response.data[i].USERNAME]);
          if (!userIDs.includes(response.data[i].USERID)) {
            setUserIDs((old) => [...old, response.data[i].USERID]);
          }
          console.log("RESPONSE HERE!!!", response.data);
        }
      }
    });
  };

  const checkChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  if (input.length > 0) {
    u = users.filter((i) => {
      const toLower = i.toLowerCase().match(input);
      //setUser(toLower);
      return toLower;
    });
  }

  useEffect(() => {
    if (user === "") {
      setUser("");
    } else {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (playerID === null) {
      setPlayerID(null);
    } else {
      setPlayerID(playerID);
    }
  }, [playerID]);

  function addedToTournamentAlert(){
    const tourneyName = localStorage.getItem("tourneyName");
    for(let i = 0; i < tourneyPlayers.length; i++){
      var tourneyPlayerNames =+ (tourneyPlayers[i] + ", ");
    }
        Axios.post(
          "https://discord.com/api/webhooks/968936092344668200/WyfUgudEK27bSiCkMD_TFkPqKGAKQ3jen-F1xtMcSrmwibdCcrSqHMrlZ2PwduObEAMo",
          
          {
            content: "",
            embeds: [
              {
                title: `New Player(s) added to ${tourneyName}!`,
                // fields: [
                //   {
                //     name: "Users: ",
                //     value: tourneyPlayerNames,
                //     inline: true,
                //   },
//                ],
              },
            ],
          }
        );
  }
  function displayUser() {
    if (user === "") {
      return null;
    } else {
      return { user };
    }
  }

  function finishedAddingUsers() {
    localStorage.setItem("tourneyPlayers", groupPlayerIDs);
    const tourID = localStorage.getItem("tourneyID");

    for (let i = 0; i < groupPlayerIDs.length; i++) {
      Axios.post("http://localhost:3001/createBridgeTourney", {
        TOURNEYID: tourID,
        groupPlayerID: groupPlayerIDs[i],
      }).then((response) => {
        if (response.data.sqlMessage === undefined) {
          console.log("insert worked for ID: ", groupPlayerIDs[i]);

          Axios.post("http://localhost:3001/getMatch", {
            TOURNEYID: tourID,
          }).then((res) => {
            console.log("here are matches: ", res.data);
            for (let i = 0; i < res.data.length; i++) {
              mat.push(res.data[i].MATCHID);
            }
            console.log("inside: ", mat);
            for (let i = 0; i < mat.length; i++) {
              Axios.post("http://localhost:3001/deleteBridgeMatches", {
                MATCHID: mat[i],
              }).then((res) => {
                console.log(res);
                console.log("deleted bridge matches from previous");
                if (i === mat.length - 1) {
                  console.log(
                    "we should be done, but here is the i count: ",
                    i,
                    " and we are now attempting to delet the matches using the tourney ID: ",
                    tourID
                  );
                  Axios.post("http://localhost:3001/deleteMatches", {
                    TOURNEYID: tourID,
                  }).then((res) => {
                    console.log(res);
                    console.log("deleted matches from ", tourID);
                  });
                }
              });
            }
          });
        } else {
          console.log(response.data.sqlMessage);
        }
      });
    }
    addedToTournamentAlert();
    setTourneyPlayers([]);
    setGroupPlayerIDs([]);
    navigate("/TournamentList");
  }

  function addUserToList(user, playerID) {
    if (user !== "") {
      if (!tourneyPlayers.includes(user)) {
        tourneyPlayers.push(user);
        groupPlayerIDs.push(playerID);
      } else {
        console.log("Player is already in the list");
      }
    } else {
      console.log("user was blank in ADD");
    }
    console.log("group IDs ",groupPlayerIDs)
  }

  //pay close attention to the remove of the ID's list here, as I don't think it will work like I want...
  function removeUserFromList(user, playerID) {
    let inde = tourneyPlayers.indexOf(user);
    console.log("inde is: ", inde);
    if (inde !== -1) {
      tourneyPlayers.splice(inde, 1);
      groupPlayerIDs.splice(inde, 1);
    }
  }

  function grabIdByIndex(index) {
    setPlayerID(userIDs[index]);
  }

  return (
    <>
      <Container>
        <Row>
          <Col className="block-example border border-primary">
            <h1>All users: </h1>
            <ul>
              {users.map((us, index) => {
                return (
                  <li
                    key={index}
                    data-id={us}
                    onClick={(e) => {
                      grabUser(e.target.getAttribute("data-id"));
                      grabIdByIndex(index);
                    }}
                  >
                    {us}
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col className="block-example border border-primary">
            <h1>Users added to the Tournament: </h1>
            <ul>
              {tourneyPlayers.map((us, index) => {
                return (
                  <li
                    key={index}
                    data-id={us}
                    onClick={(e) => {
                      grabUser(e.target.getAttribute("data-id"));
                    }}
                  >
                    {us}
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>

      {/* <h1>Don't see your player name listed above? Try searching here: </h1>
      <input
        type="text"
        placeholder="Player Search"
        onChange={checkChange}
        value={input}
      /> */}
      {u.map((user, index) => {
        return (
          <div key={index}>
            <div
              data-id={user}
              onClick={(e) => {
                grabUser(e.target.getAttribute("data-id"));
              }}
            >
              {user}
            </div>
          </div>
        );
      })}
      <br></br>
      <ButtonGroup style={{ marginTop: 80 }}>
        <Button
          style={{ marginLeft: 10 }}
          onClick={() => {
            addUserToList(user, playerID);
            setUser("");
            setInput("");
          }}
        >
          Add
        </Button>
        <Button
          onClick={() => {
            removeUserFromList(user, playerID);
            setUser("");
            setInput("");
          }}
        >
          Remove
        </Button>
        <Button
          onClick={() => {
            finishedAddingUsers();
          }}
        >
          Finished
        </Button>
      </ButtonGroup>
      <h1>{user ? `${user} has been selected` : ""}</h1>
    </>
  );
}

export default AddPlayers;
