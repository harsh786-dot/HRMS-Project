import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../features/employeeSlice/EmployeesSlice";
import loginReducer from "../features/loginSlice/LoginSlice";
import forgotPasswordReducer from "../features/forgotSlice/ForgotSlice"
import notificationReducer from "../features/notificationSlice/NotificationSlice"
import holidayReducer from "../features/holidaySlice/HolidaySlice"
import otpVerifyReducer from "../features/otpSlice//OtpSlice"
import newPasswordReducer from "../features/newPassSlice/NewPassSlice";
import addEmployeeReducer from "../features/addEmployeeSlice/AddEmployeeSlice";
import filterReducer from "../features/filterSlice/FilterSlice";
import attendanceReducer from "../features/attendanceSlice/AttendanceSlice";
import payRollReducer from "../features/payRollSlice/PayRollSlice";
import summaryReducer from "../features/summarySlice/SummarySlice";
import attendanceOverviewReducer from "../features/attendanceOverviewSlice/AttendanceOverviewSlice";
import candidateReducer from "../features/candidateSlice/CandidateSlice";
import registerReducer from "../features/registerSlice/RegisterSlice";
import departmentReducer from "../features/departmentSlice/DepartmentSlice";
import chatReducer from "../features/chatSlice/ChatSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    notification: notificationReducer,
    holidays: holidayReducer,
    otpVerify: otpVerifyReducer,
    newPassword: newPasswordReducer,
    addemployee: addEmployeeReducer,
    filter: filterReducer,
    attendance: attendanceReducer,
    payRoll: payRollReducer,
    summary: summaryReducer,
    attendanceOverview: attendanceOverviewReducer,
    candidate: candidateReducer,
    register: registerReducer,
    department: departmentReducer,
    chat: chatReducer,
  }, 
});
