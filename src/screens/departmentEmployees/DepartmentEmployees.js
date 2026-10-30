import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../component/button/Button";
import Filter from "../employee/Filter";
import { Eye, Pencil, Trash2, } from "lucide-react";
import "./DepartmentEmployees.css";
import SearchBox from "../../component/searchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../features/employeeSlice/EmployeesSlice";

const DepartmentEmployees = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.employees);
    const { departmentName } = useParams();
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectDepartment, setSelectDepartment] = useState([]);
    const [selectType, setSelectType] = useState("");

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    if (loading) return <p>Loading Employees...</p>
    if (error) return <p>Error: {error}</p>

    const normalizeDepartment = (value = "") =>
        String(value).toLowerCase().trim().replace(/[\s_-]+/g, "");

    console.log("Selected Department:", departmentName);
    console.log(
    "API Departments:",
    [...new Set(data.map((employee) => employee.department))]
);

    const employees = (Array.isArray(data) ? data : []).filter(
        (employee) =>
            normalizeDepartment(employee.department) ===
            normalizeDepartment(departmentName)
    );


    const filteredEmployees = employees.filter((employee) => {
        const name =
            employee.name ||
            employee.full_name ||
            `${employee.first_name || ""} ${employee.last_name || ""}`.trim();

        return name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="department-employees-container">

            <div className="department-list-top">

                <div className="department-list-search">

                    <SearchBox
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />

                </div>


                <div className="department-actions">

                    <Button
                        icon=""
                        text="Add New Employee"
                        width="220px"
                        height="50px"
                        backgroundColor="#7152F3"
                        border="1px solid #7152F3"
                        color="#ffff"
                        borderRadius="10px"
                        onClick={() =>
                            navigate("/dashboard/addNewEmployee")
                        }
                    />


                    <Button
                        icon=""
                        text="Filter"
                        width="150px"
                        height="50px"
                        backgroundColor="#7152F3"
                        border="1px solid #7152F3"
                        color="#ffff"
                        borderRadius="10px"
                        onClick={() =>
                            setShowFilter(true)
                        }
                    />

                </div>

            </div>


            {/* Table */}

            <div className="department-table">

                <div className="department-table-row department-table-header">

                    <div>Employee ID</div>

                    <div>Employee Name</div>

                    <div>Designation</div>

                    <div>Type</div>

                    <div>Status</div>

                    <div>Action</div>

                </div>


                {filteredEmployees.map((employee) => (

                    <div
                        className="department-table-row"
                        key={employee.id}
                    >

                        <div>
                            {employee.employee_id}
                        </div>


                        <div className="employee-name-cell">

                            <img
                                src={employee.profile_image}
                                alt={employee.name}
                            />

                            <span>
                                {employee.name}
                            </span>

                        </div>


                        <div>
                            {employee.designation}
                        </div>


                        <div>
                            {employee.employee_type}
                        </div>


                        <div>

                            <span className="employee-status">
                                {employee.status}
                            </span>

                        </div>


                        <div className="employee-actions">

                            <Eye size={16} />

                            <Pencil size={16} />

                            <Trash2 size={16} />

                        </div>

                    </div>

                ))}


                <div className="department-table-footer">

                    <div className="showing">

                        <span>
                            Showing
                        </span>

                        <select>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                        </select>

                    </div>


                    <div className="record-text">

                        Showing 1 to {filteredEmployees.length}
                        {" "}out of {employees.length} records

                    </div>


                    <div className="pagination">

                        <button>‹</button>

                        <button className="active-page">
                            1
                        </button>

                        <button>2</button>

                        <button>3</button>

                        <button>4</button>

                        <button>›</button>

                    </div>

                </div>

            </div>


            {/* Filter Popup */}

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

export default DepartmentEmployees;