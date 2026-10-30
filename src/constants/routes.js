import { createBrowserRouter} from "react-router-dom";
import Forgot from "../screens/forgot/Forgot";
import Login from "../screens/login/Login";
import Otp from "../screens/otp/Otp";
import Layout from "../Layout/Layouts/Layouts";
import Dashboard from "../screens/dashboard/Dashboard";
import Employees from "../screens/employee/Employees";
import AddNewEmployee from "../screens/addNewEmployee/AddNewEmployee/AddNewEmployee";
import Holidays from "../screens/holidays/Holidays";
import Jobs from "../screens/jobs/Jobs";
import Departments from "../screens/departments/Departments";
import DepartmentEmployees from "../screens/departmentEmployees/DepartmentEmployees";
import Attendance from "../screens/attendance/Attendance";
import Payroll from "../screens/payroll/Payroll";
import Candidates from "../screens/candidates/Candidates";
import Settings from "../screens/settings/Settings";
import Notifications from "../screens/notifications/Notifications";
import Profile from "../screens/myprofile/Profile";
import Info from "../screens/personal_info/Info";
import Leave from "../screens/leave/Leave";
import ApplyLeave from "../screens/leave/applyLeave/ApplyLeave";
import NewPassword from "../screens/newPassword/NewPassword"

// import ProtectedRoute from "../component/protectedRoute/ProtectedRoute";
// import PublicRoute from "../component/publicRoute/PublicRoute";

const router = createBrowserRouter([
  // {
  //   element: <PublicRoute />,
  //   children: [
      {
    path: "/",
    element: <Login />,
  },

  {
    path: "/forgot",
    element: <Forgot />,
  },

  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/newPassword",
    element: <NewPassword /> ,
  },
// ],
// },
  // {
  //   element: <ProtectedRoute />,
  //   children: [
      {
    path: "/dashboard",
    element: <Layout />,

    children: [{
      index: true,
      element: <Dashboard />,
    },
    {
      path: "employees",
      element: <Employees />,
    },
    {
      path: "addNewEmployee",
      element: <AddNewEmployee />
    },
    {
      path: "departments",
      element: <Departments />,
    },
    {
      path: "department/:departmentName",
      element: <DepartmentEmployees />
    },
    {
      path: "attendance",
      element: <Attendance />,
    },
    {
      path: "payroll",
      element: <Payroll />,
    },
    {
      path: "jobs",
      element: <Jobs />,
    },
    {
      path: "candidates",
      element: <Candidates />,
    },
    {
      path: "leaves",
      element: <Leave />,
    },
    {
      path: "holidays",
      element: <Holidays />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "notifications",
      element: <Notifications />,
    },
    {
      path: "myprofile",
      element: <Profile />,
    },
    {
      path: "personal_info",
      element: <Info />
    },
    {
      path: "applyLeave",
      element: <ApplyLeave />
    },
  ],
},

    // ],
  // },
  // {
  //   path: "*",
  //   element: <Navigate to ="/dashboard" replace />
  // }
]);

export default router;