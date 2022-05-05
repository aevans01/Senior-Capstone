import React from "react";
import bg from "../assets/homeBG.png";
import Button from "react-bootstrap/button";
import TournamentList from "./TournamentList";

function Home() {
  return (
    <div className="homeContainer">
      <div className="header">
        <img className="bg" src={bg} alt="just something" />
        <div className="bg-text">
          <h1 className="welcome">Welcome to Smash Tournament Brackets</h1>
          <p className="intro">
            With SMTB you will be able to Create A Real Gaming Community where
            users can create teams, fight matches and manage tournaments. What
            are you waiting for? Start today!
          </p>
        </div>
      </div>
      <div className="upcoming">
        <h1>Upcoming Tournaments:</h1>
        <TournamentList />
        <a href="/TournamentList">
          <Button className="moreTournies">See More...</Button>
        </a>
      </div>
    </div>
  );
}

export default Home;
