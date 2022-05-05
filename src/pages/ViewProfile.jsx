import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import img from "../assets/blank-profile-picture.png";
import Axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, FormText } from "react-bootstrap";
import Popup from "../components/layout/Popup";

function ViewProfile(props) {
  const navigate = useNavigate();
  const aray = props.arr;
  const [editing, setEditing] = useState(true);
  const [uName, setUName] = useState(aray[1]);
  const [fName, setFName] = useState(aray[4]);
  const [lName, setLName] = useState(aray[5]);
  const [mail, setMail] = useState(aray[3]);
  const [ph, setPh] = useState(aray[6]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [temp, setTemp] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const images = new Array();
    images[0] = new Image();
    images[0].src = "randomProfileImages/bowser.jpg";
    images[1] = new Image();
    images[1].src = "randomProfileImages/captainFalcon.jpg";
    images[2] = new Image();
    images[2].src = "randomProfileImages/donkeyKong.jpg";
    images[3] = new Image();
    images[3].src = "randomProfileImages/fox.jpg";
    images[4] = new Image();
    images[4].src = "randomProfileImages/iceClimbers.jpg";
    images[5] = new Image();
    images[5].src = "randomProfileImages/jigglypuff.jpg";
    images[6] = new Image();
    images[6].src = "randomProfileImages/kirby.jpg";
    images[7] = new Image();
    images[7].src = "randomProfileImages/link.jpg";
    images[8] = new Image();
    images[8].src = "randomProfileImages/luigi.jpg";
    images[9] = new Image();
    images[9].src = "randomProfileImages/mario.jpg";
    images[10] = new Image();
    images[10].src = "randomProfileImages/ness.jpg";
    images[11] = new Image();
    images[11].src = "randomProfileImages/peach.jpg";
    images[12] = new Image();
    images[12].src = "randomProfileImages/pikachu.jpg";
    images[13] = new Image();
    images[13].src = "randomProfileImages/samus.jpg";
    images[14] = new Image();
    images[14].src = "randomProfileImages/yoshi.jpg";

  for (let i = 0; i < aray.length; i++) {
    if (aray[i] === "") {
      aray[i] = "no value for this field.";
    }
  }

  useEffect(() => {
    Axios.post("http://localhost:3001/userById",{
      USERID: aray[0]
    }).then((res) => {
      console.log("useEffect res.data ==> ", res.data)
      setProfilePic(res.data[0].PROFILEPIC)
    });
  }, []);
  

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    localStorage.setItem("profileImage",e.target.files[0]);
    localStorage.setItem("profileImageName",e.target.files[0].name);
    console.log(fileName);
  };

  function refreshPage() {
    window.location.reload(false);
  }
  function updateUserInfo() {
    console.log(uName, ", ", fName, ", ", lName, ", ", mail, ", ", ph);
    Axios.post("http://localhost:3001/updateUserData", {
      id: aray[0],
      username: uName,
      firstname: fName,
      lastname: lName,
      email: mail,
      phone: ph,
    }).then((response) => {
      if ((response.data.affectedRows = 1)) {
        console.log("we changed something");
        aray[1] = uName;
        aray[4] = fName;
        aray[5] = lName;
        aray[3] = mail;
        aray[6] = ph;
        localStorage.setItem("arr", aray);
        localStorage.setItem("name", uName);
        refreshPage();
      }
    });
  }

  function allowEdits() {
    if (editing === false) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }

  function settingPopup(){
    setShowPopup(true);
  }

  function profilePicTemp(stuff){
    setTemp(stuff);
  }
  function profileImgPicker(){
    if(temp === ""){
      console.log("temp is blank")
      setProfilePic(profilePic);
    }else{
      console.log("temp is ",temp)
      setProfilePic(temp)
      console.log("profilePic is ", profilePic)
      Axios.post("http://localhost:3001/upload",{
        PROFILEPIC: temp.slice(21),
        userID: aray[0],
      })
      refreshPage();
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="viewProfileContainer">
      <Card className="profilePic">
        <p>
          <img className="profileImg" src={profilePic} alt="just an empty player" />
        </p>
        {/* <input type="file" id="userPhotoInput" name="userPhoto" enctype="multipart/form-data" accept="image/*" onChange={(e) => saveFile(e)}/> */}
        <button className="" variant="primary" onClick={() => settingPopup()} >Select Profile Picture</button>
        
        <button className="editBtn removeBtn" variant="primary" type="submit">
          Remove
        </button>
      </Card>
      <Form id="updateForm">
        <Form.Group className="mb-3 uname" controlId="formBasicUname">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="userName"
            placeholder={aray[1]}
            onChange={(e) => {
              setUName(e.target.value);
            }}
            readOnly={editing}
          />
        </Form.Group>

        <Form.Group className="mb-3 fname" controlId="formBasicFname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            placeholder={aray[4]}
            onChange={(e) => {
              setFName(e.target.value);
            }}
            readOnly={editing}
          />
        </Form.Group>

        <Form.Group className="mb-3 lname" controlId="formBasicLname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            placeholder={aray[5]}
            onChange={(e) => {
              setLName(e.target.value);
            }}
            readOnly={editing}
          />
        </Form.Group>

        <Form.Group className="mb-3 email borderStuff" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder={aray[3]}
            onChange={(e) => {
              setMail(e.target.value);
            }}
            readOnly={editing}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 phone" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="email"
            placeholder={aray[7]}
            onChange={(e) => {
              setPh(e.target.value);
            }}
            readOnly={editing}
          />
          <Form.Text className="text-muted">
            We'll never share your phone number with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 pass" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <br></br>
          <div style={{ display: "flex" }}>
            <p>If you wish to change password, please &nbsp;</p>
            <Link to="/ChangePassword" style={{ color: "#fc2403" }}>
              click here
            </Link>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
      </Form>
      <button
        className="updateBtn"
        variant="primary"
        type="submit"
        onClick={updateUserInfo}
      >
        Save Changes
      </button>
      <button
        className="editBtn"
        variant="primary"
        type="submit"
        onClick={allowEdits}
      >
        Edit Profile
      </button>
      <Popup trigger={showPopup} setTrigger={setShowPopup}>
                <h3>Choose Profile Picture</h3>
                <div className="row row-cols-1 row-cols-md-5 g-3">
          {images.map((index, i) => {
            return (
              <div className="col">
                <div className="card h-10">
                  <Card className="" onClick={() => profilePicTemp(index.src)}>
                    <Card.Img src={index.src} />
                    
                      
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
                
                  <button className="saveButton editBtn " variant="primary" onClick={() => profileImgPicker()}>Save</button>
                
                
              </Popup>
    </div>
  );
}

export default ViewProfile;
