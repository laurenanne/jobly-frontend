import React, { useState, useContext } from "react";
import { Card, CardBody, CardTitle, CardText, ListGroupItem } from "reactstrap";
import UserContext from "./UserContext";

function Job({ job, apply }) {
  const user = useContext(UserContext);
  const applications = user.currentUser.applications;

  let initialState = false;

  //checks to see if the job id is in the current user's applicaton list
  // if yes sets the state to true else flase
  applications.includes(job.id)
    ? (initialState = true)
    : (initialState = false);

  const [isApplied, setIsApplied] = useState(initialState);

  // on click of button changes state to applied to true
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const id = evt.target.id;
    apply(id);
    setIsApplied(true);
  };

  // if the state is true the button will be disable and display as Applied
  // otherwise the button will be acitve and display as Apply
  return (
    <ListGroupItem className="m-2 d-inline-block" key={job.id}>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{job.title}</CardTitle>
          <CardText className="mb-0">Salary: {job.salary}</CardText>
          <CardText>Equity: {job.equity}</CardText>
          {isApplied ? (
            <button id={job.id} disabled={true}>
              Applied
            </button>
          ) : (
            <button id={job.id} onClick={handleSubmit}>
              Apply
            </button>
          )}
        </CardBody>
      </Card>
    </ListGroupItem>
  );
}

export default Job;
