import { useState } from "react";
import Button from "../../component/button/Button";
import "./Filter.css";

const departmentList = [
    "Design",
    "HR",
    "Sales",
    "BA",
    "Project Manager",
    "Developement",
    "Java",
    "Python",
    "React JS",
    "Account",
    "Node JS",
];

const Filter = ({
    selectDepartment,
    setSelectDepartment,
    selectType,
    setSelectType,
    onClose,
}) => {
    
    const [tempDepartment, setTempDepartment] = useState([
        ...selectDepartment,
    ]);
    const [tempType, setTempType] = useState(selectType);
    const handleDepartmentChange = (department) => {
        setTempDepartment((prev) =>
            prev.includes(department)
                ? prev.filter((item) => item !== department)
                : [...prev, department]
        );
    };

    const handleApply = () => {
        setSelectDepartment(tempDepartment);
        setSelectType(tempType);
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleReset = () => {
        setTempDepartment([]);
        setTempType("");
    };

    return (
        <div className="filter-overlay" onClick={onClose}>
            <div
                className="filter-popup"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="filter-container">
                    <h1>Filter</h1>
                    <div className="filter-title">
                        <h2>Department</h2>
                        <div className="department-container">
                            {departmentList.map((department) => (
                                <label
                                    key={department}
                                    className="department-list"
                                >
                                    <input
                                        type="checkbox"
                                        checked={tempDepartment.includes(
                                            department
                                        )}
                                        onChange={() =>
                                            handleDepartmentChange(
                                                department
                                            )
                                        }
                                    />
                                    <span>{department}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="selec-type">
                        <h2>Select Type</h2>
                    </div>
                    <div className="checkbox-filter">
                        <label className="checkbox-input">
                            <input
                                type="radio"
                                name="employeeType"
                                value="Office"
                                checked={tempType === "Office"}
                                onChange={(e) =>
                                    setTempType(e.target.value)
                                }
                            />
                            <span>Office</span>
                        </label>
                        <label className="checkbox-input">
                            <input
                                type="radio"
                                name="employeeType"
                                value="Remote"
                                checked={tempType === "Remote"}
                                onChange={(e) =>
                                    setTempType(e.target.value)
                                }
                            />
                            <span>Work From Home</span>
                        </label>
                    </div>
                    <div className="filter-btn">
                        <Button
                            icon=""
                            text="Cancel"
                            width="50%"
                            height="50px"
                            backgroundColor="white"
                            border="1px solid #A2A1A833"
                            color="#16151C"
                            borderRadius="10px"
                            onClick={handleCancel}
                        />
                        <Button
                            icon=""
                            text="Reset"
                            width="50%"
                            height="50px"
                            backgroundColor="white"
                            border="1px solid #A2A1A833"
                            color="#16151C"
                            borderRadius="10px"
                            onClick={handleReset}
                        />
                        <Button
                            icon=""
                            text="Apply"
                            width="50%"
                            height="50px"
                            backgroundColor="#7152F3"
                            border="1px solid #7152F3"
                            color="#FFFFFF"
                            borderRadius="10px"
                            onClick={handleApply}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
