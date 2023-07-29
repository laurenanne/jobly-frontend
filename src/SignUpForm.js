import React, { useState } from "react";
import { Input, Button, Col, Form, FormGroup, Label } from "reactstrap";
import { useHistory } from "react-router-dom";

function SignUpForm({ signup }) {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const [formErrors, setFormErrors] = useState(null);

  // hanldes submission of new user data, resets state to initial and sends user to home page
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      setFormData(initialState);
      history.push("/");
      setFormErrors(null);
    } else {
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

  return (
    <div className="m-3 d-flex justify-content-center">
      <Col md={6}>
        <h3 className="text-center">Sign Up</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
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
          {formErrors ? (
            <div className="p-2 alert alert-danger">
              {formErrors.map((e) => (
                <p className="mb-0">{e}</p>
              ))}
            </div>
          ) : (
            <div></div>
          )}
          <Button>Submit</Button>
        </Form>
      </Col>
    </div>
  );
}

export default SignUpForm;
