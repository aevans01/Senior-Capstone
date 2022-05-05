import { useEffect, useState } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

function EditSeasons() {
  const [seasonId, setSeasonId] = useState(1234);
  const [season, setSeason] = useState([]);
  const [seasonName, setSeasonName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [commID, setCommID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setSeasonId(localStorage.getItem("seasonID"));
    Axios.post(`http://localhost:3001/editSeason/${seasonId}`).then((res) => {
      setSeason(res.data);
    });
  }, [seasonId]);

  useEffect(() => {
    if (seasonName == null) {
      setSeasonName(null);
    } else setSeasonName(seasonName);
  }, []);

  function date(dateTimeObj) {
    const test = dateTimeObj.split(/[- :]/);
    const time = new Date(
      Date.UTC(test[0], test[1] - 1, test[2], test[3], test[4], test[5])
    );
    return test[1] + "-" + test[2].substr(0, 2) + "-" + test[0];
  }

  function updateSeason() {
    Axios.post("http://localhost:3001/updateSeason", {
      id: seasonId,
      name: seasonName,
      start: startDate,
      end: endDate,
      community: commID,
    }).then(navigate("../AdminSeasons"), window.location.reload(false));
  }
  return (
    <div>
      {season.map((index, i) => {
        return (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Seaon Name:</Form.Label>
              <Form.Control
                placeholder={index.SEASONNAME}
                onChange={(e) => {
                  setSeasonName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                placeholder={date(index.STARTDATE)}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                placeholder={date(index.ENDDATE)}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Community ID:</Form.Label>
              <Form.Control
                placeholder={index.COMMUNITYID}
                onChange={(e) => {
                  setCommID(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              className="seasonButton m-auto"
              variant="primary"
              type="submit"
              onClick={(e) => updateSeason()}
            >
              Submit
            </Button>
          </Form>
        );
      })}
    </div>
  );
}

export default EditSeasons;
