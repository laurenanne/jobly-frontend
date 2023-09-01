import React, { useState } from "react";
import JoblyApi from "../JoblyApi";
import { InputGroup, Input, Button, Col, Form } from "reactstrap";

function JobSearch({ filter }) {
  const [searchTitle, setSearchTitle] = useState("");

  const handleChange = (evt) => {
    setSearchTitle(evt.target.value);
  };

  //upon submit gets filtered jobs based on job title entered in search bar
  const handleSubmit = (evt) => {
    evt.preventDefault();
    getFilteredJobs(searchTitle);
    setSearchTitle("");
  };

  // calls API to search jobs based on title or partial job title
  async function getFilteredJobs(title) {
    let jobs = await JoblyApi.getFilteredJobs(title);
    if (jobs) {
      filter(jobs);
    } else return null;
  }

  return (
    <Col md={8}>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search Job Title"
            name="co"
            onChange={handleChange}
            value={searchTitle}
          />
          <Button>Search</Button>
        </InputGroup>
      </Form>
    </Col>
  );
}

export default JobSearch;
