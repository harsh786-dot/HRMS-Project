import "./ProfessionalInformation.css"

const PrefessionalInformation = ({ form, handleChange }) => {
  return (
     <div className="personal-information">
      <div className="personal-form">

        <div className="form-group">
          <input type="text" placeholder="Employee ID"
          value={form.employee_id}
            onChange={(e) =>handleChange("employee_id", e.target.value)} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="User Name"
          value={form.username}
            onChange={(e) =>handleChange("username", e.target.value)} />
        </div>

        <div className="form-group">
          <select value={form.employee_type}
            onChange={(e) =>handleChange("employee_type", e.target.value)}>
            <option value="">Select Employee Type</option>
            <option value="Office">Office</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email Address"
          value={form.email}
            onChange={(e) =>handleChange("email", e.target.value)} />
        </div>

        <div className="form-group">
          <select value={form.department}
            onChange={(e) =>handleChange("department", e.target.value)}>
            <option value="">Select Department</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
          </select>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Enter Designation" 
          value={form.designation}
            onChange={(e) =>handleChange("designation", e.target.value)} />
        </div>

        <div className="form-group">
          <select value={form.working_days}
            onChange={(e) =>handleChange("working_days", e.target.value)}>
            <option value="">Select Working Days</option>
            <option value="">5 Days</option>
            <option value="">6 Days</option>
          </select>
        </div>

        <div className="form-group date-input">
          <input type="date" placeholder="Select Joining Date"
          value={form.joining_date}
            onChange={(e) =>handleChange("joining_date", e.target.value)} />
        </div>

        <div className="form-group">
          <select
            value={form.office_location}
            onChange={(e) => handleChange("office_location", e.target.value)}
          >
            <option value="">Select Office Location</option>
            <option value="Indore">Indore</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Pune">Pune</option>
          </select>
        </div>

      </div>
    </div>
  )
}

export default PrefessionalInformation
