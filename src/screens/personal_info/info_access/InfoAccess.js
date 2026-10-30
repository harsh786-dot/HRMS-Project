import React from 'react'
import "./InfoAccess.css"

const personalInfo = [
  { label: "Email Address", value: "brooklyn.s@example.com" },
  { label: "Slack ID", value: "brooklyn_simmons" },
  { label: "Skypa ID", value: "brooklyn_simmons" },
  { label: "Github ID", value: "brooklyn simmons" },
];


const InfoAccess = () => {
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
  )
}

export default InfoAccess
