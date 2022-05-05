import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MainNavigation.css";
import { Nav, Navbar, Container, NavDropdown, Form } from "react-bootstrap";
import logo from "../../assets/SMTB.PNG";
import profile from "../../assets/blank-profile-picture.png";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function MainNavigation() {
  const [u, setU] = useState("");
  const [isLogged, setIsLogged] = useState(null);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const na = localStorage.getItem("name");
    if (na === "null") {
      setU("");
      setIsLogged(false);
    } else {
      setU(na);
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    const arr = localStorage.getItem("arr")
    const aray = arr.split(",");
    console.log("userid ==> ", aray[0]);
    Axios.post("http://localhost:3001/userById",{
      USERID: aray[0]
    }).then((res) => {
      console.log("useEffect res.data ==> ", res.data)
      setProfilePic(res.data[0].PROFILEPIC)
    });
  }, []);

  function LoggingOut() {
    console.log("ok so this works....");
    localStorage.setItem("name", null);
    localStorage.setItem("arr", null);
    localStorage.setItem("user", false);
    localStorage.setItem("userData", null);
    refreshPage();
    navigate("/");
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <Navbar
        className="navbar"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/Home">
            <img className="logo" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <NavDropdown title="Tournaments" id="collasible-nav-dropdown">
                {isLogged ? (
                  <>
                    <NavDropdown.Item href="/TournamentList">
                      View Tournaments
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/CreateTournament">
                      Create A Tournament
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/PastTournaments">
                      View Past Tournaments
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="/TournamentList">
                      View Tournaments
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/PastTournaments">
                      View Past Tournaments
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              <Nav.Link href="/Leaderboard">Leaderboards</Nav.Link>
              <NavDropdown title="Communities" id="collasible-nav-dropdown">
                {isLogged ? (
                  <>
                    <NavDropdown.Item href="/CommunityList">
                      View Communities
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/CreateCommunity">
                      Create A Communities
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="/CommunityList">
                      View Communities
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              {/* <NavDropdown title="Pages" id="collasible-nav-dropdown">
                {isLogged ? (
                  <>
                    <NavDropdown.Item href="/ViewPlayer">
                      View Player
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/ViewProfile">
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/ViewStats">
                      View Stats
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/CreateTournament">
                      Create A Tournament
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/TournamentList">
                      Tournament List
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/PastTournaments">
                      Past Tournaments
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/Register">
                      Register
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/ForgotPassword">
                      Forgot Password
                    </NavDropdown.Item>
                  </>
                )} 
              </NavDropdown>*/}
              <Container>
                <Form>
                  {/* <div className = "searchBar">
                  <Form.Control className="bar" placeholder="Search" />
                  <button type="button" className="btn btn-warning">
                    <svg width="15px" height="15px">
                      <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                    </svg>
                    </button>
                  </div> */}
                </Form>
              </Container>
            </Nav>
            <NavDropdown title={u} id="collasible-nav-dropdown">
              {isLogged ? (
                <>
                  <NavDropdown.Item href="/ViewProfile">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href= {`/ViewPlayer/${u}`}>Player Profile</NavDropdown.Item>

                  <NavDropdown.Item href="/QRCodePage">
                    My QR Code
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={LoggingOut}>
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
              )}
            </NavDropdown>
            <img className="profile" src={profilePic} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavigation;
