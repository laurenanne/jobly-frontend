import React, { useState, useContext } from "react";
import { Input, Button, Col, Form, FormGroup, Label } from "reactstrap";
import "./Profile.css";
import UserContext from "./UserContext";

function Profile({ edit }) {
  const [message, setMessage] = useState("");
  const user = useContext(UserContext).currentUser;

  // sets intitial state to the current user's name and email
  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(null);

  // handles the submission to edit the user's name and email
  // success message if changes completed successfully
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await edit(formData, user.username);
    if (result.success) {
      setFormErrors("");
      setMessage("Your profile has been updated");
    } else {
      setMessage("");
      setFormErrors(result.err);
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  //shows the username but the field is disabled since that field can't be altered
  return (
    <div className="m-3 d-flex justify-content-center">
      <Col md={6}>
        <h3 className="text-center">Profile</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              defaultValue={user.username}
              disabled={true}
            />
          </FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
          <FormGroup>
            <Label for="lasttName">Last Name</Label>
            <Input
              od="lastName"
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        {message ? (
          <div className="mt-3 alert alert-success">{message}</div>
        ) : (
          ""
        )}
        {formErrors ? (
          <div className="p-2 alert alert-danger">
            {formErrors.map((e) => (
              <p className="mb-0">{e}</p>
            ))}
          </div>
        ) : (
          ""
        )}
      </Col>
    </div>
  );
}

export default Profile;
