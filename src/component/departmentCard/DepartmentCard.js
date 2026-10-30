import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DepartmentCard.css";

const DepartmentCard = ({ department }) => {
    const navigate = useNavigate();

    return (
        <div className="department-card">
            <div className="department-card-header">
                <div>
                    <h3>{department.name}</h3>
                    <p>{department.members} Members</p>
                </div>
                <button
                    className="view-all-btn"
                    onClick={() =>
                        navigate(
                            `/dashboard/department/${encodeURIComponent(department.name)}`
                        )}>View All
                </button>
            </div>

            <div className="department-employees">
                {department.employees.map((employee, index) => (
                    <div className="department-employee" key={index}>
                        <div className="employee-info">
                            <img src={employee.image} alt={employee.name}/>

                            <div>
                                <h4>{employee.name}</h4>
                                <p>{employee.designation}</p>
                            </div>

                        </div>
                        <ChevronRight size={16} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentCard;