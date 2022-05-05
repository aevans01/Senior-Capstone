import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cardimg from "../assets/login.png";

function TestTournamentCards() {
  return (
    <div class="row row-cols-1 row-cols-md-3 g-2">
      <div class="col">
        <div class="card h-100">
          <Card>
            <Card.Img src={cardimg} />
            <Card.Body>
              <Card.Title className="">Tournament 1</Card.Title>
              <Card.Text className="">
                <p>Location: UAFS</p>
                <p>Time: 7:30 p.m.</p>
                <p>Date: March 1st, 2022</p>
              </Card.Text>
              <ButtonGroup vertical>
                <Button className="" variant="primary">
                  View Bracket
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <Card>
            <Card.Img src={cardimg} />
            <Card.Body>
              <Card.Title className="">Tournament 1</Card.Title>
              <Card.Text className="">
                <p>Location: UAFS</p>
                <p>Time: 7:30 p.m.</p>
                <p>Date: March 1st, 2022</p>
              </Card.Text>
              <ButtonGroup vertical>
                <Button className="" variant="primary">
                  View Bracket
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <Card>
            <Card.Img src={cardimg} />
            <Card.Body>
              <Card.Title className="">Tournament 1</Card.Title>
              <Card.Text className="">
                <p>Location: UAFS</p>
                <p>Time: 7:30 p.m.</p>
                <p>Date: March 1st, 2022</p>
              </Card.Text>
              <ButtonGroup vertical>
                <Button className="" variant="primary">
                  View Bracket
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <Card>
            <Card.Img src={cardimg} />
            <Card.Body>
              <Card.Title className="">Tournament 1</Card.Title>
              <Card.Text className="">
                <p>Location: UAFS</p>
                <p>Time: 7:30 p.m.</p>
                <p>Date: March 1st, 2022</p>
              </Card.Text>
              <ButtonGroup vertical>
                <Button className="" variant="primary">
                  View Bracket
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TestTournamentCards;
