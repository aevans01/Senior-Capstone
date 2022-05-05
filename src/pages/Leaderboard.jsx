import React from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useEffect, useState } from "react";
import Axios from "axios";

function Leaderboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState([]);
  const [elo, setElo] = useState([]);
  const [img, setImg] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/leaderboardUsers").then((res) => {
      setUsers(res.data);
    });
  }, []);
  useEffect(() => {
    let tempElo = [];
    let tempUser = [];
    let tempImg = [];
    Axios.get("http://localhost:3001/leaderboardUsersTop3").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        tempUser.push(res.data[i].USERNAME);
        tempElo.push(res.data[i].ELO);
        tempImg.push(res.data[i].PROFILEPIC);
      }
      setUsername(tempUser);
      setElo(tempElo);
      setImg(tempImg);
    });
  }, []);

  return (
    <div className="featured">
      <div className="banner">
        <h1 className="bannerText">Leaderboards</h1>
      </div>
      <div className="featuredli">
        <h1>Featured Players:</h1>
        <div className="card-group">
          <Card className="" style={{marginRight: "0.75rem" }}>
            <Card.Img src={img[0]} />
            <Card.Body>
              <Card.Title className="">{username[0]}</Card.Title>
              <Card.Text className="">Rank: 1st</Card.Text>
              <p>ELO Rating: {elo[0]}</p>
              <ButtonGroup vertical>
                
              <Button className="float-none m-auto" variant="primary" onClick={(e) => navigate(`/ViewPlayer/${username[0]}`)}>
                  View Profile
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: "13rem", marginRight: "0.75rem" }}>
            <Card.Img src={img[1]} />
            <Card.Body>
              <Card.Title className="">{username[1]}</Card.Title>
              <Card.Text className="">Rank: 2nd</Card.Text>
              <p>ELO Rating: {elo[1]}</p>
              <ButtonGroup vertical>
              <Button className="float-none m-auto" variant="primary" onClick={(e) => navigate(`/ViewPlayer/${username[1]}`)}>
                  View Profile
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: "13rem", marginRight: "0.75rem" }}>
            <Card.Img src={img[2]} />
            <Card.Body>
              <Card.Title className="">{username[2]}</Card.Title>
              <Card.Text className="">Rank: 3rd</Card.Text>
              <p>ELO Rating: {elo[2]}</p>
              <ButtonGroup vertical>
              <Button className="float-none m-auto" variant="primary" onClick={(e) => navigate(`/ViewPlayer/${username[2]}`)}>
                  View Profile
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
      <h1>Lifetime Standings</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Placement</th>
            <th>Username</th>
            <th>ELO Rating</th>
          </tr>
        </thead>
        <tbody>
          {users.map((index, i) => {
            return (
              <>
                <tr>
                  <td>{i + 4}th</td>
                  <td>{index.USERNAME}</td>
                  <td>{index.ELO}</td>
                  <td><Button className="float-none m-auto" variant="primary" onClick={(e) => navigate(`/ViewPlayer/${index.USERNAME}`)}>
                  View Profile
                </Button></td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Leaderboard;
