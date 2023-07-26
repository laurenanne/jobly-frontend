import React from "react";
import { ListGroup } from "reactstrap";
import Job from "./Job.js";

function JobCard({ jobs, apply }) {
  // maps the job list to individual Job Card for every job
  return (
    <ListGroup className="job-list col-md-8">
      {jobs.map((j) => (
        <Job job={j} apply={apply} key={j.id} />
      ))}
    </ListGroup>
  );
}

export default JobCard;
