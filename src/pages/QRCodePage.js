import React, { useState, useEffect } from "react";
//import QRCode from "qrcode";
import Card from "react-bootstrap/Card";

function QRCodePage(props) {
  //creating a little temp data set to hold what's being passed in the QR Code:
  const origarr = props.arr;
  const arr = [];
  for (let i = 0; i < origarr.length; i++) {
    arr[i] = origarr[i];
  }
  //removing some data because we don't want that data displayed.
  arr.splice(3, 1);

  //a hook to display the QR Code into an image.
  const [imgURL, setImgURL] = useState("");

  //on page load, do this:
  useEffect(() => {
    var QRCode = require("qrcode");
    try {
      QRCode.toDataURL(arr + ",", function (err, url) {
        setImgURL(url);
      });
    } catch (err) {
      console.error(err);
    }
  }, [arr]);

  return (
    <div style={{ marginBottom: "8%" }}>
      <div className="loginBanner banner" style={{ marginBottom: "2%" }}>
        <h1 className="bannerText">{arr[1]} QR Code:</h1>
      </div>
      <Card
        style={{
          height: "200px",
          width: "200px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "7%",
        }}
      >
        <Card.Img src={imgURL} />
      </Card>
    </div>
  );
}

export default QRCodePage;
