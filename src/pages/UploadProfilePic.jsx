import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import img from "../assets/blank-profile-picture.png";
import Axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FormText } from "react-bootstrap";

function UploadProfilePic() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  function refreshPage() {
    window.location.reload(false);
  }
  const uploadFile = async(e) => {
    setFile(e.targetfiles[0]);
    setFileName(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName",fileName);
    try {
      const res = await Axios.post(
        "http://localhost:3000/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="viewProfileContainer">
      <Card className="profilePic">
        <p>
          <img className="profileImg" src={img} alt="just an empty player" />
        </p>
        <input class="file-upload" type="file" accept="image/*"/>
        <button className=" editBtn removeBtn" variant="primary" onClick={(e) => uploadFile}>
          Upload
        </button>
        <button className="editBtn removeBtn" variant="primary" type="submit">
          Save
        </button>
      </Card>
    </div>
  )
}
export default UploadProfilePic;
