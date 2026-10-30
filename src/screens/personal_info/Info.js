import { useState } from 'react'
import "./Info.css"
import Button from '../../component/button/Button'
import { useNavigate } from 'react-router-dom'
import InfoPersonal from './info_personal/InfoPersonal'
import InfoProfessional from './info_professional/InfoProfessional'
import InfoAccess from './info_access/InfoAccess'
import InfoDocuments from './info_documents/InfoDocuments'
import InfoAttendance from "./info_attendance/InfoAttendance";
import InfoProjects from "./info_projects/InfoProjects";
import InfoLeave from "./info_leave/InfoLeave";
const Info = () => {

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(1);
    const [activeMenu, setActiveMenu] = useState("Profile");

    const leftTabs = [
        { id: 1, title: "Profile" },
        { id: 2, title: "Attendance" },
        { id: 3, title: "Projects" },
        { id: 4, title: "Leave" },
    ];

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
        // Left-side menu ke according component render hoga
        switch (activeMenu) {
            case "Profile":
                switch (activeStep) {
                    case 1:
                        return <InfoPersonal />;
                    case 2:
                        return <InfoProfessional />;
                    case 3:
                        return <InfoDocuments />;
                    case 4:
                        return <InfoAccess />;
                    default:
                        return <InfoPersonal />;
                }

            case "Attendance":
                return <InfoAttendance />;

            case "Projects":
                return <InfoProjects />;

            case "Leave":
                return <InfoLeave />;

            default:
                return <InfoPersonal />;
        }
    };
    return (
        <div className='info-container'>

            <div className='info-row'>
                <div className='info-image'>
                    <div className='info-img'><img src="" alt="" /></div>
                    <div className='info-info'>
                        <h3>Brooklyn Simmons</h3>
                        <p>Project Manager</p>
                        <p>brooklyn.s@example.com</p>
                    </div>
                </div>

                <div className='info'>
                    <Button
                        icon=""
                        text="Edit Profile"
                        width="120px"
                        height="50px"
                        backgroundColor="#7152F3"
                        border="1px solid #7152F3"
                        color="#ffff"
                        borderRadius="10px"
                        onClick={() => navigate("/dashboard/addNewEmployee")}></Button>

                </div>
            </div>
            <div className='left-right'>

                <div className="info-left">
                    <ul>
                        {leftTabs.map((tab) => (
                            <li
                                key={tab.id}
                               className={`info-menu-item ${activeMenu === tab.title ? "active" : ""}`}
                                onClick={() => setActiveMenu(tab.title)}
                            >
                                {tab.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="info-list">
                    {activeMenu === "Profile" && (
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
                    )}

                    <div className="employee-content">
                        {renderComponent()}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Info