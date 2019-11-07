import React from "react";
import VacationSummary from "./VacationSummary";

const AllVacations = ({ vacations, checked }) => {
  return (
    <div className="allVac section">
      {vacations &&
        vacations.map(vacation => {
          return (
            <VacationSummary
              vacation={vacation}
              key={vacation.id}
              checked={checked}
            />
          );
        })}
    </div>
  );
};

export default AllVacations;
