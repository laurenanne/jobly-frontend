import React, { useEffect, useState } from "react";

import "./CompanyDetail";
import JoblyApi from "../JoblyApi";
import JobCard from "../job/JobCard";

function CompanyDetail({ apply, params }) {
  const id = params.id;

  const [company, setCompany] = useState(null);

  // calls API to get the company detail based on company handle
  useEffect(() => {
    async function getComp(id) {
      let company = await JoblyApi.getCompany(id);
      setCompany(company);
    }
    getComp(id);
  }, [id]);

  // if a company exists load the specific company detail page
  if (!company) {
    return <div>.....LOADING</div>;
  } else {
    return (
      <div>
        <div className="mt-3">
          <h3 className="d-flex justify-content-center">{company.name}</h3>
          <p className="d-flex justify-content-center">{company.description}</p>
        </div>
        <section className="d-flex justify-content-center">
          <JobCard jobs={company.jobs} apply={apply} />
        </section>
      </div>
    );
  }
}
export default CompanyDetail;
