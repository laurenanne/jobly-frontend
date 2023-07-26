import React, { useState } from "react";
import JoblyApi from "./JoblyApi";
import { InputGroup, Input, Button, Col, Form } from "reactstrap";

function CompanySearch({ filter }) {
  const [searchName, setSearchName] = useState("");

  const handleChange = (evt) => {
    setSearchName(evt.target.value);
  };

  //upon submit gets filtered companies based on name entered in search bar
  const handleSubmit = (evt) => {
    evt.preventDefault();
    getFilteredCompanies(searchName);
    // resets search bar
    setSearchName("");
  };

  // calls API to search company based on name or partial name
  async function getFilteredCompanies(name) {
    let companies = await JoblyApi.getFilteredCompanies(name);
    if (companies) {
      filter(companies);
    } else return null;
  }

  return (
    <Col md={8}>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search Company Name"
            name="co"
            onChange={handleChange}
            value={searchName}
          />
          <Button>Search</Button>
        </InputGroup>
      </Form>
    </Col>
  );
}

export default CompanySearch;
