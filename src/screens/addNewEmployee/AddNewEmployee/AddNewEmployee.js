import { useState } from "react";
import "./AddNewEmployee.css";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import ProfessionalInformation from "../ProfessionalInformation/ProfessionalInformation";
import Documents from "../Documents/Documents";
import AccountAccess from "../AccountAccess/AccountAccess";
import Button from "../../../component/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../../features/addEmployeeSlice/AddEmployeeSlice";
import { STRINGS } from "../../../constants/strings";

const AddNewEmployee = () => {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(1);
    const { loading, success, error } = useSelector(
        (state) => state.addemployee
    );

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        email: "",
        date_of_birth: "",
        marital_status: "",
        gender: "",
        nationality: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        employee_id: "",
        username: "", 
        employee_type: "",
        department: "",
        designation: "",
        working_days: [],
        joining_date: "",
        office_location: "",
        slack_id: "",
        skype_id: "",
        github_id: "",
        profile_image: null,
        document: null,
        appointment_letter: null,
        salary_slips: null,
        relieving_letter: null,
        experience_letter: null,
    });

    const handleChange = (name, value) => {
        setForm((prev) => ({
            ...prev, [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (value !== null && value !== "") {
                if (key === "working_days") {
                    data.append(key, JSON.stringify(value));
                } else
                    data.append(key, value);
            }
        });
        dispatch(addEmployee(data));
    }


    const tabs = [
        {
            id: 1,
            title: "Personal Information",
        },
        {
            id: 2,
            title: "Professional Information",
        },
        {
            id: 3,
            title: "Documents",
        },
        {
            id: 4,
            title: "Account Access",
        },
    ];

    const renderComponent = () => {
        switch (activeStep) {
            case 1:
                return <PersonalInformation
                    form={form}
                    handleChange={handleChange}
                />;

            case 2:
                return <ProfessionalInformation
                    form={form}
                    handleChange={handleChange}
                />;

            case 3:
                return <Documents
                    form={form}
                    handleChange={handleChange}
                />;

            case 4:
                return <AccountAccess
                    form={form}
                    handleChange={handleChange}
                />;

            default:
                return <PersonalInformation />;
        }
    };

    return (

        
        <div className="add-employee">

            <div className="employee-list">
                <ul>
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            className={activeStep === tab.id ? "active" : ""}
                            onClick={() => setActiveStep(tab.id)}
                        >
                            {tab.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Component */}
            <div className="employee-content">
                {renderComponent()}
            </div>

            {/* Buttons */}
            <div className="employee-buttons">
                <Button
                    onClick={() => setActiveStep(activeStep - 1)}
                    disabled={activeStep === 1}
                    icon=""
                    text={STRINGS.BTN_PREVIOUS}
                    width="110px"
                    height="50px"
                    backgroundColor="white"
                    border="1px solid #A2A1A833"
                    color="#16151C"
                    borderRadius="10px"
                />

                {activeStep < 4 ? (
                    <Button
                        onClick={() => setActiveStep(activeStep + 1)}
                        icon=""
                        text={STRINGS.BTN_NEXT}
                        width="110px"
                        height="50px"
                        backgroundColor="#7152F3"
                        border="1px solid #7152F3"
                        color="#fff"
                        borderRadius="10px"
                    />
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        icon=""
                        text={loading ? "Saving..." : "Add"}
                        width="110px"
                        height="50px"
                        backgroundColor="#7152F3"
                        border="1px solid #7152F3"
                        color="#fff"
                        borderRadius="10px"
                    />
                )}
            </div>
            
<div className="add-employee">

    {success && (
        <p className="success-message">
            {STRINGS.EMPLOYEE_ADD_SUCCESS}
        </p>
    )}

    {error && (
        <p className="error-message">
            {typeof error === "string"
                ? error
                : JSON.stringify(error)}
        </p>
    )}

</div>
        </div>
    );
};

export default AddNewEmployee;