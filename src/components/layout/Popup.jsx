import react from "react";
import { Button } from "react-bootstrap";
import "./Popup.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Popup(props) {
  return props.trigger ? (
    <>
      <div className="popup">
        <div className="popup-inner">
          <ButtonGroup>
            <Button
              style={{ float: "right" }}
              onClick={() => props.setTrigger(false)}
            >
              Close
            </Button>
          </ButtonGroup>
          {props.children}
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default Popup;
