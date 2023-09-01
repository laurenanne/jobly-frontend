import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JobSearch from "./JobSearch";
import "./JobList.css";
import JoblyApi from "../JoblyApi";

function JobList({ apply }) {
  const [jobs, setJobs] = useState([]);
  const [filterJob, setFilterJob] = useState("");

  // upon loading, call API to get a list of all jobs
  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

  // creates a filtered job list based on the criteria in the job search bar
  const filter = (j) => {
    setFilterJob(j);
  };

  return (
    <div className="job-section">
      <div className="job-search-bar m-3 d-flex justify-content-center">
        <JobSearch filter={filter} />
      </div>

      <div className="job-list-section d-flex justify-content-center">
        {filterJob ? (
          <JobCard jobs={filterJob} apply={apply} />
        ) : (
          <JobCard jobs={jobs} apply={apply} />
        )}
      </div>
    </div>
  );
}

export default JobList;
