import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Col, Form, FormGroup, Label } from "reactstrap";
import "./LoginForm.css";

function LoginForm({ login }) {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  // handles submission of form data and sets form state to initial data
  // if successful sends the user to the home page/welcome screen
  const handleSubmit = (evt) => {
    evt.preventDefault();
    login(formData);

    setFormData(initialState);
    history.push("/");
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className="login m-3 d-flex justify-content-center">
      <Col md={6}>
        <h3 className="text-center">Log In</h3>
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
              autoComplete="on"
              onChange={handleChange}
              value={formData.password}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Col>
    </div>
  );
}

export default LoginForm;
