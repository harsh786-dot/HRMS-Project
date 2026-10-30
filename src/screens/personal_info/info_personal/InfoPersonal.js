
import React from "react";
import "./InfoPersonal.css";

const personalInfo = [
  { label: "First Name", value: "Brooklyn" },
  { label: "Last Name", value: "Simmons" },
  { label: "Mobile Number", value: "(702) 555-0122" },
  { label: "Email Address", value: "brooklyn.s@example.com" },
  { label: "Date of Birth", value: "July 14, 1995" },
  { label: "Marital Status", value: "Married" },
  { label: "Gender", value: "Female" },
  { label: "Nationality", value: "America" },
  { label: "Address", value: "2464 Royal Ln. Mesa, New Jersey" },
  { label: "City", value: "California" },
  { label: "State", value: "United State" },
  { label: "Zip Code", value: "35624" },
];

const InfoPersonal = () => {
  return (
    <div className="info-personal-container">
      <div className="info-personal-form">
        {personalInfo.map((item) => (
          <div className="info-personal-group" key={item.label}>
            <label>{item.label}</label>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoPersonal;
