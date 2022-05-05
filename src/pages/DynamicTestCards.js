import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import cardimg from "../assets/login.png";

function DynamicTestCards() {
  //to play with this, set the number of cards you wish to have inside the const ar Array below.
  // it will generate as many cards as you wish and they look to be sized and spaced appropriately.

  //also, keep in mind this getCurrentDate function isn't really dates, it's just numbers that look like a date currently.
  const ar = Array.from(Array(5).keys());

  function getCurrentDate(separator, ind) {
    let newDate = new Date();
    let date = newDate.getDate() + ind;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${month}${separator}${date}${separator}${year}`;
  }

  //so I used the login banner her, but it doesn't dynamically size... We might need another idea here?

  return (
    <>
      <div className="loginBanner banner">
        <h1 className="bannerText">Dynamically Sized Cards Page</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-2">
        {ar.map((index, i) => {
          return (
            <div className="col">
              <div className="card h-100">
                <Card>
                  <Card.Img src={cardimg} />
                  <Card.Body>
                    <Card.Title className="">Tournament {i + 1}</Card.Title>
                    <Card.Text className=""></Card.Text>
                    <h3 style={{ color: "limegreen" }}>
                      This card's index is: {i + 1}!!!!
                    </h3>
                    <p>Location: UAFS</p>
                    <p>Time: 7:30 p.m.</p>
                    <p>Date: {getCurrentDate("/ ", index)}</p>
                    <p></p>

                    <ButtonGroup vertical>
                      <Button className="" variant="primary">
                        View Bracket
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DynamicTestCards;
