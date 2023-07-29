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
  const [formErrors, setFormErrors] = useState(null);
  const history = useHistory();

  // handles submission of form data and sets form state to initial data
  // if successful sends the user to the home page/welcome screen
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      setFormData(initialState);
      setFormErrors(null);
      history.push("/");
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

export default LoginForm;
