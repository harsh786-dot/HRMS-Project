import React from 'react'
import "./PersonalInformation.css"

const PersonalInformation = ({ form, handleChange }) => {
  return (
    <div className="personal-information">

      <div className="profile-upload">
        <label htmlFor="profile_image">
          {form.profile_image ? (
            <img src={URL.createObjectURL(form.profile_image)}
              alt="Profile Preview" />
          ) : (
            <span>📷</span>
          )} 
        </label>
        <input
          id="profile_image"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            handleChange(
              "profile_image",
              e.target.files?.[0] || null
            )
          }
        />

      </div>

      <div className="personal-form">

        <div className="form-group">
          <input type="text" placeholder="First Name"
          value={form.first_name}
          onChange={(e) => handleChange(
            "first_name", e.target.value
          )} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Last Name"
          value={form.last_name}
          onChange={(e) => handleChange(
            "last_name", e.target.value
          )} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Mobile Number"
          value={form.mobile_number}
          onChange={(e) => handleChange
            ("mobile_number",e.target.value)
          }  />
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email Address"
           value={form.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }/>
        </div>

        <div className="form-group date-input">
          <input type="date"
          value={form.date_of_birth}
            onChange={(e) =>
              handleChange("date_of_birth", e.target.value) }
              placeholder="Date of Birth"/>
        </div>

        <div className="form-group">
          <select  
          value={form.marital_status}
          onChange={(e) => handleChange(
            "marital_status", e.target.value
          )}>
            <option value="">Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div className="form-group">
          <select
          value={form.gender}
          onChange={(e) => handleChange(
            "gender", e.target.value
          )}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <select value={form.nationality}
          onChange={(e) =>handleChange("nationality", e.target.value)}>
            <option value="">Nationality</option>
            <option value="indian">Indian</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group full-width">
          <input type="text" placeholder="Address"
          value={form.address}
          onChange={(e) =>handleChange("address", e.target.value)} />
        </div>

        <div className="form-group">
          <select value={form.city}
            onChange={(e) =>handleChange("city", e.target.value)}>
            <option value="">City</option>
            <option value="indore">Indore</option>
            <option value="bhopal">Bhopal</option>
          </select>
        </div>

        <div className="form-group">
          <select value={form.state}
            onChange={(e) =>handleChange("state", e.target.value)}>
            <option value="">State</option>
            <option value="mp">Madhya Pradesh</option>
            <option value="delhi">Delhi</option>
          </select>
        </div>

        <div className="form-group">
          <input value={form.zip_code}
            onChange={(e) =>handleChange("zip_code", e.target.value)}>
          </input>  
        </div>

      </div>
    </div>
  )
}

export default PersonalInformation
