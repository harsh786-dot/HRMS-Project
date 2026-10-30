import { useState } from "react";
import "./Leave.css";
import LeaveBalance from "./leaveBalance/LeaveBalance";
import LeaveApplication from "./leaveApplication/LeaveApplication";
import LeaveLedger from "./leaveLedger/LeaveLedger";
import { useNavigate } from "react-router-dom";
import ApplyLeave from "./applyLeave/ApplyLeave";


const upperTabs = [
  {
    id: 1,
    title: "Leave Balance",
  },
  {
    id: 2,
    title: "Leave Applications",
  },
  {
    id: 3,
    title: "Leave Ledger",
  },
];


const Leave = () => {
  const [activeStep, setActiveStep] = useState(1);
    const [showApplyLeave, setShowApplyLeave] = useState(false);

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeStep) {
      case 1:
        return <LeaveBalance />;

      case 2:
        return <LeaveApplication />;

      case 3:
        return <LeaveLedger />;

      default:
        return <LeaveBalance />;
    }
  };

  return (
    <div className="leave-container">
      {/* Employee Profile */}
      <div className="leave-profile">
        <div className="profile-uploads">
          <div className="profile-leave">📷</div>

          <div className="leave-profile-data">
            <h3>Pradeep Veragi</h3>
            <h4>Phone No. :</h4>
            <h4>Email :</h4>
            <h4>Employee Id :</h4>
          </div>
        </div>
      </div>

      {/* Apply Leave Button */}
      <div className="leave-btn">
        <button
          // onClick={() => alert("Apply Leave clicked")}
          onClick={() =>  navigate("/dashboard/applyleave")}
        >
          Apply Leave
        </button>
      </div>

      {/* Leave Tabs */}
      <div className="leave-lists">
        <ul>
          {upperTabs.map((tab) => (
            <li
              key={tab.id}
              className={
                activeStep === tab.id ? "active" : ""
              }
              onClick={() => setActiveStep(tab.id)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Dynamic Tab Content */}
      <div className="leave-content">
        {renderComponent()}
      </div>

      {showApplyLeave && (
        <ApplyLeave
          onClose={() => setShowApplyLeave(false)}
        />
      )}
    </div>

  );
};

export default Leave;
