import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import cardimg from "../assets/login.png";
<script src="/path/to/infinite-scroll.pkgd.min.js"></script>;

function CommunityList(props) {
  const navigate = useNavigate();

  //Creates Array of Communities
  const [community, setCommunities] = useState([]);

  //Calls All Communities
  useEffect(() => {
    Axios.get("http://localhost:3001/getCommunities").then((res) => {
      setCommunities(res.data);
    });
  }, []);

  function viewCommunity() {}

  function create() {
    navigate("/CreateCommunity");
  }

  return (
    <>
      <div>
        <div className="loginBanner banner">
          <h1 className="bannerText">Communities</h1>
        </div>
        <div className="row row-cols-1 row-cols-md-5 g-3">
          {community.map((index, i) => {
            return (
              <div className="col">
                <div className="card h-10">
                  <Card>
                    <Card.Img src={cardimg} />
                    <Card.Body>
                      <Card.Title className="">{index.NAME}</Card.Title>
                      <br></br>
                      <Card.Text className="">
                        <h3 style={{ color: "limegreen" }}> </h3>
                        <p>{index.DESCRIPTION}</p>
                        <p>
                          <Link
                            to={{
                              pathname: "/CommunityView",
                              state: { id: index.COMMUNITYID },
                            }}
                          >
                            View Community
                          </Link>
                        </p>
                        <p></p>
                      </Card.Text>
                      <br></br>
                      <ButtonGroup vertical>
                        <Button
                          onClick={(e) => {
                            viewCommunity(index.COMMUNITYID);
                          }}
                          className=""
                          variant="primary"
                        >
                          View Community
                        </Button>
                      </ButtonGroup>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          onClick={(e) => {
            create();
          }}
          className=""
          variant="primary"
        >
          Create Your Community
        </Button>
      </div>
    </>
  );
}

export default CommunityList;
