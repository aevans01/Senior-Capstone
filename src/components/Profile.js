import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import img from "../assets/blank-profile-picture.png";

function Profile() {
    return (
        <div className="ViewProfileContainer">
            <div className="profilePic">
                <p>
                    <img className="profileImg" src={img} />
                </p>
                <button className="uploadBtn" variant="primary" type="submit">
                    Upload
                </button>
                <button className="removeBtn" variant="primary" type="submit">
                    Remove
                </button>
            </div>
            <Form>
                <Form.Group className="mb-3 fname" controlId="formBasicFname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="firstName" placeholder="Enter First Name" />
                </Form.Group>

                <Form.Group className="mb-3 lname" controlId="formBasicLname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="lastName" placeholder="Enter Last Name" />
                </Form.Group>

                <Form.Group className="mb-3 email" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 phone" controlId="formBasicPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="email" placeholder="Enter Phone Number" />
                    <Form.Text className="text-muted">
                        We'll never share your phone number with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 pass" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                <button className="updateBtn" variant="primary" type="submit">
                    Update
                </button>
                <button className="editBtn" variant="primary" type="submit">
                    Edit Profile
                </button>
            </Form>
        </div>
    );
}

export default Profile;