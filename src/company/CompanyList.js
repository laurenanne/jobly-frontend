import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import CompanySearch from "./CompanySearch";
import "./CompanyList.css";
import JoblyApi from "./JoblyApi";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [filterCo, setFilterCo] = useState("");

  // upon loading, call API to get a list of all companies
  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    getCompanies();
  }, []);

  // creates a filtered company list based on the criteria in the co search bar
  const filter = (cos) => {
    setFilterCo(cos);
  };

  return (
    <div className="co-section">
      <div className="co-search-bar m-3 d-flex justify-content-center">
        <CompanySearch filter={filter} />
      </div>

      <div className="co-list-section d-flex justify-content-center co-list">
        {filterCo ? (
          <CompanyCard companies={filterCo} />
        ) : (
          <CompanyCard companies={companies} />
        )}
      </div>
    </div>
  );
}

export default CompanyList;
