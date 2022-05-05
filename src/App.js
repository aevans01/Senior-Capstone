import { Navigate, Route, Routes } from "react-router-dom";
import ViewPlayer from "./pages/ViewPlayer";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import PageList from "./pages/PageList";
import ViewProfile from "./pages/ViewProfile";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import InsertTournaments from "./pages/InsertTournaments";
import TournamentList from "./pages/TournamentList";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import ViewStats from "./pages/ViewStats";
import PastTournaments from "./pages/PastTournaments";
import TestTournamentCards from "./pages/TestTournamentCards";
import DynamicTestCards from "./pages/DynamicTestCards";
import NotFound from "./pages/NotFound";
import QRCodePage from "./pages/QRCodePage";
import SeasonCreation from "./pages/SeasonCreation";
import CreateTournament from "./pages/CreateTournament";
import EditTournament from "./pages/EditTournament";
import Brackets from "./pages/Brackets";
import AddPlayers from "./pages/AddPlayers";
import { DoubleElimination } from "./pages/DoubleElimination";
import ChangePassword from "./pages/ChangePassword";
import { useEffect, useState } from "react";
import CommunityList from "./pages/CommunityList";
import CreateCommunity from "./pages/CreateCommunity";
import CommunityView from "./pages/CommunityView";
import SeasonTournamentList from "./pages/SeasonTournamentList";
import EditSeasons from "./pages/EditSeasons";
import AdminSeasons from "./pages/AdminSeasons";
import UploadProfilePic from "./pages/UploadProfilePic";

function App() {
  //using this for temporary authentication
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [arr, setArr] = useState([]);
  const [userName, setUserName] = useState(null);

  //this one is a boolean to declare a session on or off
  useEffect(() => {
    const us = localStorage.getItem("user");
    us && JSON.parse(us) ? setUser(true) : setUser(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  //this is the object "user"
  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData === null) {
      setUserData({});
    } else {
      setUserData(userData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", userData);
  }, [userData]);

  //this is the array of user data
  useEffect(() => {
    const ar = localStorage.getItem("arr");
    if (ar === null) {
      setArr(null);
    } else {
      setArr(ar.split(","));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("arr", arr);
  }, [arr]);

  //this is name
  useEffect(() => {
    const na = localStorage.getItem("name");
    if (na === null) {
      setUserName("nothing");
    } else {
      setUserName(na);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("name", userName);
  }, [userName]);

  //function to check session
  function checkState() {
    if (user === true) { //Logged In
      return (
        <>
          <Route path="/Login" element={<Navigate to={"/Home"} />} />

          <Route
            path="/ViewPlayer/:username"
            element={
              <ViewPlayer
                logout={() => setUser(false)}
                setUserData={() => setUserData(null)}
                setArr={() => setArr(null)}
                setUserName={() => setUserName(null)}
                arr={arr}
                
              />
            }
          />
          <Route path="/Register" element={<Navigate to={"/ViewPlayer"} />} />
          <Route path="/InsertTournaments" element={<InsertTournaments />} />
          <Route path="/SeasonCreation" element={<SeasonCreation />} />
          <Route path="/AdminSeasons" element={<AdminSeasons />} />
          <Route path="/ViewProfile" element={<ViewProfile arr={arr} />} />
          <Route path="/QRCodePage" element={<QRCodePage arr={arr} />} />
          <Route path="/ViewStats/:username" element={<ViewStats />} />
          <Route path="/PastTournaments" element={<PastTournaments />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/PastTournaments/:username" element={<PastTournaments />} />
          <Route path="/CreateTournament" element={<CreateTournament />} />
          <Route path="/EditTournament" element={<EditTournament />} />
          <Route path="/CommunityList" element={<CommunityList />} />
          <Route path="/CreateCommunity" element={<CreateCommunity />} />
          <Route path="/CommunityView" element={<CommunityView />} />
          <Route path="/UploadProfilePic" element={<UploadProfilePic/>}/>
          <Route
            path="/SeasonTournamentList"
            element={<SeasonTournamentList />}
          />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/PageList" element={<PageList />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/EditSeasons" element={<EditSeasons />} />
          <Route path="/TournamentList" element={<TournamentList />} />
          <Route path="/CreateTournament" element={<CreateTournament />} />
          <Route path="/EditTournament" element={<EditTournament />} />
          <Route path="/Brackets" element={<Brackets />} />
          <Route path="/AddPlayers" element={<AddPlayers />} />
          <Route
            path="/TestTournamentCards"
            element={<TestTournamentCards />}
          />
          <Route path="/DoubleElimination" element={<DoubleElimination />} />
          <Route path="/DynamicTestCards" element={<DynamicTestCards />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="*" element={<NotFound />} />
        </>
      );
    } else if (user === false) { //Logged out
      return (
        <>
          <Route
            path="/Login"
            element={
              <Login
                authenticate={() => setUser(true)}
                setUserData={(someData) => setUserData(someData)}
                setArr={(someArray) => setArr(someArray)}
                setUserName={(someName) => setUserName(someName)}
              />
            }
          />
          <Route path="/ViewPlayer" element={<Navigate to={"/Login"} />} />
          <Route path="/ViewPlayer/:username" element={<Navigate to={"/Login"} />} />
          {/* <Route path="/ViewPlayer" element={<Navigate to={"/Login"} />} /> */}
          <Route
            path="/InsertTournaments"
            element={<Navigate to={"/Login"} />}
          />
          <Route path="/ViewProfile" element={<Navigate to={"/Login"} />} />
          <Route path="/QRCodePage" element={<Navigate to={"/Login"} />} />

          <Route path="/ViewStats" element={<Navigate to={"/Login"} />} />
          <Route path="/PastTournaments/:username" element={<Navigate to={"/Login"} />} />
          <Route path="/PastTournaments" element={<Navigate to={"/Login"} />} />
          <Route
            path="/CreateTournament"
            element={<Navigate to={"/Login"} />}
          />
          <Route path="/EditTournament" element={<Navigate to={"/Login"} />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />

          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/PageList" element={<PageList />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          <Route path="/TournamentList" element={<Navigate to={"/Login"} />} />
          <Route path="/Brackets" element={<Navigate to={"/Login"} />} />
          <Route path="/AddPlayers" element={<Navigate to={"/Login"} />} />
          <Route
            path="/TestTournamentCards"
            element={<TestTournamentCards />}
          />
          <Route path="/DynamicTestCards" element={<DynamicTestCards />} />
          <Route path="/SeasonCreation" element={<Navigate to={"/Login"} />} />
          <Route path="/ChangePassword" element={<Navigate to={"/Login"} />} />
          <Route path="/DoubleElimination" element={<DoubleElimination />} />
          <Route path="*" element={<NotFound />} />
        </>
      );
    }
  }
  return (
    <div className="app">
      <Layout>
        <Routes>{checkState()}</Routes>
      </Layout>
    </div>
  );
}

export default App;
