import React, { useEffect } from "react";
import Card from "../components/ATestCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

function AdminSeason() {
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/seasons").then((res) => {
      setSeasons(res.data);
    });
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  function viewTournaments(seasonID, seasonName) {
    console.log("front end " + seasonID);
    localStorage.setItem("seasonID", seasonID);
    localStorage.setItem("seasonName", seasonName);
    navigate("../SeasonTournamentList");
  }
  function deleteSeason(seasonId) {
    Axios.post("http://localhost:3001/deleteSeason", {
      id: seasonId,
    }).then(refreshPage());
  }
  function editSeason(seasonID) {
    localStorage.setItem("seasonID", seasonID);
    navigate("../EditSeasons");
  }

  return (
    <div className="adminSeasonContainer">
      <Table responsive>
        <thead>
          <tr>
            <th>Season Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Community</th>
            <th>Tournaments</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((index, i) => {
            return (
              <tr>
                <td>{index.SEASONNAME}</td>
                <td>{new Date(index.STARTDATE).toUTCString()}</td>
                <td>{new Date(index.ENDDATE).toUTCString()}</td>
                <td>{index.COMMUNITYID}</td>
                <td>
                  <Button
                    className="m-auto float-left"
                    onClick={(e) =>
                      viewTournaments(index.SEASONID, index.SEASONNAME)
                    }
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    className="m-auto float-left"
                    onClick={(e) => editSeason(index.SEASONID)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    className="m-auto float-left"
                    onClick={(e) => deleteSeason(index.SEASONID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        className="m-auto float-left"
        onClick={(e) => navigate("../SeasonCreation")}
      >
        Create New
      </Button>
    </div>
  );
}

export default AdminSeason;
