import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import CompanySearch from "./CompanySearch";
import "./CompanyList.css";

function CompanyList({ companies }) {
  const [filterCo, setFilterCo] = useState("");

  // creates a filtered company list based on the criteria in the co search bar
  const filter = (cos) => {
    setFilterCo(cos);
  };

  if (filterCo) {
    companies = filterCo;
  }

  return (
    <div className="co-section">
      <div className="co-search-bar m-3 d-flex justify-content-center">
        <CompanySearch filter={filter} />
      </div>

      <div className="co-list-section d-flex justify-content-center co-list">
        <CompanyCard companies={companies} />
      </div>
    </div>
  );
}

export default CompanyList;
