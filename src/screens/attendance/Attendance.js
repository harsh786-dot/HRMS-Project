import { useEffect, useState } from "react";
import "./Attendance.css";
import SearchBox from "../../component/searchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendance } from "../../features/attendanceSlice/AttendanceSlice";

const Attendance = ({showSearch = true}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector((state) => state.attendance);

 useEffect(() => {
      dispatch(fetchAttendance());
      setCurrentPage(1);
    }, [dispatch])
  
    if (loading) return <p>Loading Employees...</p>
    if (error) return <p>Error: {error}</p> 

  const totalPages = Math.ceil(data.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;

  const currentEmployees = (data || []).slice(
  startIndex,
  startIndex + employeesPerPage
);

  return (
    <div className="attendance-container">
      {showSearch && (
        <div className="attendance-header">
          <SearchBox />
        </div>
      )}

      <div className="attendance-table">
        <div className="attendance-row table-header">
          <div>Employee Name</div>
          <div>Designation</div>
          <div>Type</div>
          <div>Check In Time</div>
          <div>Status</div>
        </div>

        {currentEmployees.map((employee, index) => (
          <div className="attendance-row" key={index}>
            <div className="employee-name">
              <img src={employee.profile_image} alt={employee.name}/>
              <span>{employee.employee_name}</span>
            </div>

            <div>{employee.designation}</div>
            <div>{employee.employee_type}</div>
            <div>{employee.check_in}</div>
            <div>
              <span className={ employee.status === "On Time"? "status on-time": "status late"}>
                {employee.status}
              </span>
            </div>
          </div>
        ))}

        <div className="pagination">
          <div className="showing-select">
            <span>Showing</span>
            <select
              value={employeesPerPage}
              onChange={(e) => {
                setEmployeesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          <div className="pagination-info">
            Showing {data.length === 0 ? 0 : startIndex + 1}
            {" "}to{" "}
            {Math.min(startIndex + employeesPerPage, data.length)}
            {" "}out of {data.length} records
          </div>


          <div className="pagination-buttons">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ›
            </button>
          </div>

        </div>
      </div>
      {showSearch}
    </div>
  );
};

export default Attendance;