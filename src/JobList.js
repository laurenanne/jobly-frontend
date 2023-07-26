import React, { useState } from "react";
import JobCard from "./JobCard";
import JobSearch from "./JobSearch";
import "./JobList.css";

function JobList({ jobs, apply }) {
  const [filterJob, setFilterJob] = useState("");

  // creates a filtered job list based on the criteria in the job search bar
  const filter = (j) => {
    setFilterJob(j);
  };

  if (filterJob) {
    jobs = filterJob;
  }

  return (
    <div className="job-section">
      <div className="job-search-bar m-3 d-flex justify-content-center">
        <JobSearch filter={filter} />
      </div>

      <div className="job-list-section d-flex justify-content-center">
        <JobCard jobs={jobs} apply={apply} />
      </div>
    </div>
  );
}

export default JobList;
