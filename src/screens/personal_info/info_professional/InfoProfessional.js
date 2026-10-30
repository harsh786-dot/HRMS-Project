import React from 'react'
import "./InfoProfessional.css";

const professionalInfo = [
  { label: "Employee ID", value: "879912390" },
  { label: "User Name", value: "brooklyn_simmons" },
  { label: "Employee Type", value: "Office" },
  { label: "Email Address", value: "brooklyn.s@example.com" },
  { label: "Department", value: "Project Manager" },
  { label: "Designation", value: "Project Manager" },
  { label: "Working Days", value: "5 Days" },
  { label: "Joining Date", value: "July 10,2022" },
  { label: "Office", value: "2464 Royal Ln. Mesa, New Jersey" },
];

const InfoProfessional = () => {
  return (
    <div className="info-personal-container">
      <div className="info-personal-form">
        {professionalInfo.map((item) => (
          <div className="info-personal-group" key={item.label}>
            <label>{item.label}</label>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoProfessional
