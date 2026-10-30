import React, { useState, useEffect } from "react";
import "./Employees.css";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import Button from "../../component/button/Button";
import SearchBox from "../../component/searchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../features/employeeSlice/EmployeesSlice";

const Employees = () => {

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.employees);
  const [showFilter, setShowFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectDepartment, setSelectDepartment] = useState([]);
  const [selectType, setSelectType] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchEmployees());
    setCurrentPage(1);
  }, [dispatch,searchFilter,selectDepartment])

  if (loading) return <p>Loading Employees...</p>
  if (error) return <p>Error: {error}</p>

const filteredEmployees = (data || []).filter((employee) => {
    const search = searchFilter.trim().toLowerCase();

    const employeeName = (
        employee.name ||
        `${employee.first_name || ""} ${employee.last_name || ""}`
    ).toLowerCase();

    const employeeId = String(
        employee.employee_id || employee.employeeId || ""
    ).toLowerCase();

    const searchMatch =
        employeeName.includes(search) ||
        employeeId.includes(search);

    const employeeDepartment = (
        employee.department || ""
    ).trim().toLowerCase();

    const departmentMatch =
        selectDepartment.length === 0 ||
        selectDepartment.some(
            (department) =>
                department.trim().toLowerCase() ===
                employeeDepartment
        );

    const employeeType = (
        employee.employee_type || employee.type || ""
    ).trim().toLowerCase();

    const typeMatch =
        selectType === "" ||
        employeeType === selectType.trim().toLowerCase();

    return searchMatch && departmentMatch && typeMatch;
});

const employeesPerPage = 10;

const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
);

const startIndex = (currentPage - 1) * employeesPerPage;

const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + employeesPerPage
);

  return (
    <div className="employees-page">
      <div className="employees-header">
        <div className="employee-actions">
          
          <div className="search-employee">
            <SearchBox
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
                setCurrentPage(1);
              }}
            />

          </div>

           <div className="addNew-filter-btn">

          <Button
            icon=""
            text="Add New Employee"
            width="220px"
            height="50px"
            backgroundColor="#7152F3"
            border="1px solid #7152F3"
            color="#ffff"
            borderRadius="10px"
            onClick={() => navigate("/dashboard/addNewEmployee")}></Button>

            <Button
              icon=""
              text="Filter"
              width="150px"
              height="50px"
              border="1px solid #A2A1A833"
              color="black"
              borderRadius="10px"
              onClick={() => setShowFilter(true)}></Button>

          </div>

        </div>
      </div>

      <div className="employee-table">
        <div className="employee-row table-heading">
          <span>Employee Name</span>
          <span>Employee ID</span>
          <span>Department</span>
          <span>Designation</span>
          <span>Type</span>
          <span>Status</span>
          <span>Action</span>
 
        </div> 

        {paginatedEmployees.map((employee) => (
          <div className="employee-row"
            key={employee.id}>
            <div className="employee-name">
              <div className="employee-image"> <img src={employee.profile_image} alt="" /></div>
              <span>{employee.name}</span>
            </div>
            <span>{employee.employee_id}</span>
            <span>{employee.department}</span>
            <span>{employee.designation}</span>
            <span>{employee.employee_type}</span>

            <span>
              <span className="permanent">
                {employee.status}
              </span>
            </span>
            <div className="actions">
              <Eye size={20}/>
              <Link to="/dashboard/personal_info" className="eye-link">
                <Edit size={20} />
              </Link>
              <Trash2 size={20}  />

            </div>
          </div>
        ))}
      </div>

      <div className="pagination-container">

        <div className="showing">
          <span>Showing</span>
          <select>
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>

        <div className="showing-text">
          <p>Showing {filteredEmployees.length === 0 ? 0 : startIndex + 1}
            {" "}to{" "}
            {Math.min(
              startIndex + employeesPerPage,
              filteredEmployees.length
            )}
            {" "}out of {filteredEmployees.length} records</p>
        </div>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            ‹
          </button>
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (

            <button
              key={page}
              className={
                currentPage === page
                  ? "page active"
                  : "page"
              }
              onClick={() =>
                setCurrentPage(page)
              }
            >
              {page}
            </button>

          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            ›
          </button>

        </div>
      </div>

      {showFilter && (
        <Filter
          selectDepartment={selectDepartment}
          setSelectDepartment={setSelectDepartment}
          selectType={selectType}
          setSelectType={setSelectType}
          onClose={() => setShowFilter(false)}
        />
      )}

    </div>
  );
};

export default Employees;