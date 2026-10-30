import "./Dashboard.css";
import Chart from "../../component/employee_data/Chart";
import Calendar from "../../component/employee_data/Calendar";
import Data from "../../component/employee_data/Data";
import Attendance from "../attendance/Attendance";
import { STRINGS } from "../../constants/strings";
import Button from "../../component/button/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <div className="dashboard-data">
          <Data />
          </div>

          <div className="dashboard-chart">
        <Chart />
           </div>

      </div>

      <div className="dashboard-calendar">
        <Calendar />
      </div>

       <div className="dashboard-attendance">
        <div className="dash-attendance-overview">
          <div><h1>{STRINGS.ATTENDANCE_OVERVIEW}</h1></div>
          <div>
            <Button
              icon=""
              text="View all"
              width="100px"
              height="50px"
              border="1px solid #A2A1A833"
              color="black"
              borderRadius="10px"
              onClick={() => navigate("/dashboard/attendance")}
              >
              </Button>
          </div>
        </div>
        <Attendance showSearch={false} />
        </div>
    </div>
  );
};

export default Dashboard;