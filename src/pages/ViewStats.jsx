import { Button } from "react-bootstrap";
import profile from "../assets/blank-profile-picture.png";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import "../components/layout/ViewPlayer.Module.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState, useEffect } from "react";
import Axios from "axios";
import cardimg from "../assets/login.png";
import { getActiveElement } from "@testing-library/user-event/dist/utils";
import Table from "react-bootstrap/Table";

function ViewStats() {

  const [profile, setProfile] = useState([]);
  const params = useParams();

  useEffect(() => {
    console.log("params => ",params.username);
    Axios.post(`http://localhost:3001/viewProfile/${params.username}`,{
    }).then((res) => {
      console.log("useEffect res.data ==> ", res.data)
      setProfile(res.data[0]);
    });
  }, []);


  return (
    <div className="viewStatsContainer">
      <div className="banner">
        <h1 className="bannerText">{profile.USERNAME}'s Stats</h1>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th># of Wins</th>
            <th># of Losses</th>
            <th>W/L Ratio</th>
            <th># of Tournaments Played</th>
            <th>ELO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{profile.WINS}</td>
            <td>{profile.LOSSES}</td>
            <td>{profile.WLR+"%"}</td>
            <td>{profile.TOURNEYSPLAYED}</td>
            <td>{profile.ELO}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ViewStats;
