import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import cardimg from "../assets/login.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
<script src="/path/to/infinite-scroll.pkgd.min.js"></script>;

function CommunityView(props) {
  const [communityID, setCommunityID] = useState("");
  const [value, setValue] = useState("--Select Season--");
  const [community, setCommunities] = useState([]);
  const [seasons, setSeasons] = useState([]);

  //Calls All Communities
  useEffect(() => {
    Axios.get("http://localhost:3001/getCommunities").then((res) => {
      setCommunities(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:3001/getSeasons", {
      COMMUNITYID: communityID,
    }).then((res) => {
      setSeasons(res.data);
    });
  });

  const handleChange = (e) => {
    setValue(e);
  };

  function aFunction(asdf) {
    setCommunityID(asdf);
    console.log(communityID);
  }

  return (
    <>
      <div>
        <div className="loginBanner banner">
          <h1 className="bannerText">Community View</h1>
        </div>
        <br></br>
        <Form>
          <DropdownButton
            className="m-auto float-left"
            title={value}
            onSelect={handleChange}
            drop="bottom"
          >
            {community.map((index, i) => {
              return (
                <Dropdown.Item
                  eventKey={index.NAME}
                  onClick={(e) => aFunction(index.COMMUNITYID)}
                >
                  {index.NAME}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Form>
      </div>
    </>
  );
}

export default CommunityView;
